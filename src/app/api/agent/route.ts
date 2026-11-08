import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { products, categories, productBySlug } from "@/data/products";
import { company, pages } from "@/data/site";
import { localAnswer, pageSuggestions, type AgentAnswer } from "@/lib/agent-local";
import { KB_PROMPT, kbDocs, searchKb, speakable } from "@/lib/kb";
import { MASCOT } from "@/lib/mascot";

const AnswerSchema = z.object({
  reply: z.string(),
  mood: z.enum(["happy", "explaining", "excited", "sorry"]),
  route: z.string().nullable(),
  product: z.string().nullable(),
  sources: z.array(z.string()),
  suggestions: z.array(z.string()),
});

const RequestSchema = z.object({
  message: z.string().min(1).max(600),
  pathname: z.string().max(200).default("/"),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
    .max(12)
    .default([]),
});

// Slugs and routes the model may navigate to; the facts themselves come from the KB.
const CATALOG = products
  .map((p) => `${p.slug} — ${p.name} (${categories[p.category].label}; packs ${p.packs.map((x) => x.size).join(", ")})`)
  .join("\n");

// Built once so the prompt prefix stays byte-identical and cacheable.
const SYSTEM = `You are ${MASCOT.name}, the cartoon SIPES technician who lives on the SIPES paints website (Egypt, part of the UBMC group). You wear the red SIPES cap, red polo and navy overalls. Visitors talk to you by voice or text and you answer out loud, then take them to the right page.

Personality: warm, practical, a little playful, like an experienced painter at the counter. Speak in first person as ${MASCOT.name}. Never say you are an AI model or mention documents, files or a knowledge base; say "as far as I know" or "I'd check with the branch" instead.

How to answer:
- Reply in 1–3 short spoken sentences in the visitor's language (Arabic in, Egyptian-friendly Arabic out). No markdown, no lists, no URLs: your reply is read aloud.
- Ground every fact in the KNOWLEDGE BASE below. If it isn't covered (drying time, coverage, stock, price), say so honestly and point to the data sheet, a SIPES branch or the hotline ${company.hotline}.
- Do NOT quote prices. If asked, send the visitor to an authorized SIPES branch or the hotline ${company.hotline}.
- Some knowledge-base documents are internal (a prototype scope, brand guidelines). Use them for context and tone only; never present planned or proposed features as things that exist today.
- Exterior paints are not heat insulation; SIPES points insulation questions to PerBuild.
- "mood": happy for greetings and simple help, explaining for product or technical answers, excited when recommending something that fits well, sorry when you can't help or the info isn't known.
- "product": a slug from the PRODUCT SLUGS list when the answer is about one product, else null. "route": "/sipes/product/<slug>" for that product, "/sipes/calculator?product=<slug>" for quantities, a route from PAGES, or null if no navigation helps.
- "sources": up to 3 short labels of what you relied on, e.g. "SIPES KB › Si-Tone Silk". Empty for small talk.
- "suggestions": 2–3 short follow-up questions the visitor might tap next, in their language.

PAGES:
${pages.map((p) => `${p.route} — ${p.label}: ${p.summary}`).join("\n")}

PRODUCT SLUGS:
${CATALOG}

KNOWLEDGE BASE:
${KB_PROMPT}`;

const allowedRoutes = new Set(pages.map((p) => p.route.split("?")[0]));

function sanitize(a: z.infer<typeof AnswerSchema>, pathname: string): AgentAnswer {
  const product = a.product && productBySlug(a.product) ? a.product : null;
  let route = a.route;
  if (route) {
    const p = route.split("?")[0];
    const productRoute = p.startsWith("/sipes/product/") && productBySlug(p.slice("/sipes/product/".length));
    if (!productRoute && !allowedRoutes.has(p)) route = product ? `/sipes/product/${product}` : null;
  }
  return {
    reply: a.reply,
    mood: a.mood,
    route,
    product,
    sources: a.sources.slice(0, 3),
    suggestions: a.suggestions.length ? a.suggestions.slice(0, 3) : pageSuggestions(pathname),
    source: "claude",
  };
}

/** No model available: product engine first, then a keyword search of the KB. */
function offlineAnswer(message: string, pathname: string): AgentAnswer {
  const local = localAnswer(message, { pathname });
  if (!local.weak) return local;
  const hits = searchKb(message);
  if (!hits.length) return local.unmatched ? { ...local, mood: "sorry" } : local;
  const top = hits[0];
  return {
    reply: speakable(top.text),
    mood: "explaining",
    route: local.unmatched ? null : local.route,
    product: null,
    sources: hits.map((h) => `${h.doc} › ${h.heading}`),
    suggestions: local.suggestions,
    source: "kb",
  };
}

let client: Anthropic | null = null;

export async function POST(req: Request) {
  const parsed = RequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Send a message between 1 and 600 characters." }, { status: 400 });
  }
  const { message, pathname, history } = parsed.data;
  const fallback = () => Response.json(offlineAnswer(message, pathname));

  if (!process.env.ANTHROPIC_API_KEY) return fallback();

  client ??= new Anthropic();
  try {
    const response = await client.messages.parse({
      model: process.env.ANTHROPIC_MODEL ?? "claude-opus-5-5",
      max_tokens: 4000,
      system: SYSTEM,
      cache_control: { type: "ephemeral" },
      output_config: { effort: "low", format: zodOutputFormat(AnswerSchema) },
      messages: [...history, { role: "user", content: `[Visitor is on ${pathname}]\n${message}` }],
    });
    if (response.stop_reason === "refusal" || !response.parsed_output) return fallback();
    return Response.json(sanitize(response.parsed_output, pathname));
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      console.error(`Claude request failed (${err.status}): ${err.message}`);
    } else {
      console.error("Claude request failed", err);
    }
    return fallback();
  }
}

/** Quick health check: which KB files are loaded. */
export function GET() {
  return Response.json({
    mascot: MASCOT.name,
    model: process.env.ANTHROPIC_API_KEY ? (process.env.ANTHROPIC_MODEL ?? "claude-opus-5-5") : null,
    kb: kbDocs.map((d) => ({ file: d.file, title: d.title, chars: d.body.length })),
  });
}
