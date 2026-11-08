// Knowledge base loader. Reads every Markdown file in /KB at the project root,
// so adding or editing a file there changes what the mascot knows on the next
// server start. Server-only: it touches the filesystem.
import fs from "node:fs";
import path from "node:path";

export interface KbDoc {
  file: string;
  title: string;
  body: string;
}

export interface KbSection {
  doc: string;
  /** Internal documents (plans, brand guides) rank below customer-facing facts. */
  weight: number;
  heading: string;
  text: string;
  tokens: Map<string, number>;
  length: number;
}

const KB_DIR = path.join(process.cwd(), "KB");
const INTERNAL = /scope|guideline|prototype/i;

const STOP = new Set(
  "a an and are as at be by can do does for from has have how i in is it its me my of on or our so that the their this to was what when where which who why will with you your about into than then there these they them".split(
    " ",
  ),
);

// Light stemming so "industries" finds "industry" and "coatings" finds "coating".
const stem = (t: string) =>
  t.length <= 4
    ? t
    : t
        .replace(/ies$/, "y")
        .replace(/(ing|ed)$/, "")
        .replace(/([^s])s$/, "$1");

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ]+/g, " ")
    .split(" ")
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);

const cleanHeading = (h: string) => h.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*`]/g, "").trim();

function loadDocs(): KbDoc[] {
  let files: string[];
  try {
    files = fs.readdirSync(KB_DIR).filter((f) => f.toLowerCase().endsWith(".md")).sort();
  } catch {
    console.warn(`Knowledge base folder not found at ${KB_DIR}`);
    return [];
  }
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(KB_DIR, file), "utf8").replace(/^﻿/, "");
    const body = raw.replace(/^---[\s\S]*?\n---\s*\n/, ""); // drop YAML front matter
    const title = body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? file.replace(/\.md$/i, "");
    return { file, title, body };
  });
}

function splitSections(docs: KbDoc[]): KbSection[] {
  const out: KbSection[] = [];
  for (const d of docs) {
    const trail: string[] = [];
    let heading = d.title;
    let buf: string[] = [];
    const flush = () => {
      const text = buf.join("\n").trim();
      if (text.length > 40) {
        const tokens = new Map<string, number>();
        const all = tokenize(`${heading} ${heading} ${text}`);
        for (const t of all) tokens.set(t, (tokens.get(t) ?? 0) + 1);
        out.push({ doc: d.title, weight: INTERNAL.test(d.file) ? 0.45 : 1, heading, text, tokens, length: all.length });
      }
      buf = [];
    };
    for (const line of d.body.split(/\r?\n/)) {
      const m = line.match(/^(#{1,4})\s+(.+)$/);
      if (m) {
        flush();
        const level = m[1].length;
        trail.length = Math.max(0, level - 1);
        trail[level - 1] = cleanHeading(m[2]);
        // Skip the H1 (it's the document title) when labelling a section.
        heading = trail.slice(1).filter(Boolean).slice(-2).join(" › ") || d.title;
      } else {
        buf.push(line);
      }
    }
    flush();
  }
  return out;
}

export const kbDocs: KbDoc[] = loadDocs();
const sections = splitSections(kbDocs);
const avgLen = sections.reduce((n, s) => n + s.length, 0) / Math.max(1, sections.length);
const df = new Map<string, number>();
for (const s of sections) for (const t of s.tokens.keys()) df.set(t, (df.get(t) ?? 0) + 1);

/** The whole knowledge base as one prompt block, built once so it caches. */
export const KB_PROMPT = kbDocs
  .map((d) => `<document file="${d.file}" title="${d.title}">\n${d.body.trim()}\n</document>`)
  .join("\n\n");

/** BM25 ranking over KB sections, used when no model is configured. */
export function searchKb(query: string, limit = 3) {
  const q = [...new Set(tokenize(query))];
  if (!q.length) return [];
  const N = sections.length;
  return sections
    .map((s) => {
      let score = 0;
      let hit = 0;
      for (const t of q) {
        const tf = s.tokens.get(t);
        if (!tf) continue;
        hit++;
        const idf = Math.log(1 + (N - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));
        score += (idf * tf * 2.2) / (tf + 1.2 * (0.25 + 0.75 * (s.length / avgLen)));
      }
      // A section has to cover at least half of what was asked to count.
      return { s, score: hit / q.length >= 0.5 ? score * s.weight : 0 };
    })
    .filter((x) => x.score > 2.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.s);
}

/** Turn a Markdown section into two or three plain spoken sentences. */
export function speakable(md: string, maxSentences = 3) {
  const plain = md
    .split(/\r?\n/)
    .filter((l) => !/^\s*\|?\s*:?-{3,}/.test(l)) // table separators
    .map((l) =>
      l
        .replace(/^\s*[-*>]\s+/, "")
        .replace(/^\s*\d+\.\s+/, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`#]/g, "")
        .replace(/\s*\|\s*/g, " — ")
        .replace(/^ — | — $/g, "")
        .trim(),
    )
    .filter(Boolean)
    .map((l) => (/[.!?:]$/.test(l) ? l : `${l}.`))
    .join(" ")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/([:;])\./g, "$1")
    .replace(/\s+/g, " ");
  const sentences = plain.match(/[^.!?]+[.!?]+/g) ?? [plain];
  return sentences.slice(0, maxSentences).map((x) => x.trim()).join(" ");
}

/** For FAQ-style sections ("**Q:** … A: …"), pick the answer whose question best matches. */
export function bestAnswer(md: string, query: string): string | null {
  const pairs = [...md.matchAll(/\*\*Q:\s*([\s\S]*?)\*\*\s*\n?\s*A:\s*([\s\S]*?)(?=\n\s*\*\*Q:|$)/g)];
  if (!pairs.length) return null;
  const q = new Set(tokenize(query));
  let best: string | null = null;
  let bestScore = 0;
  for (const [, question, answer] of pairs) {
    const score = tokenize(question).filter((t) => q.has(t)).length;
    if (score > bestScore) {
      bestScore = score;
      best = answer;
    }
  }
  return best ? speakable(best) : null;
}
