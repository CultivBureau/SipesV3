// Deterministic intent engine. Runs when no Claude key is configured,
// and as the fallback whenever the model call fails.

import { products, productBySlug, type Product } from "@/data/products";
import { company, faqs, projects } from "@/data/site";
import { brandBySlug, group, type BrandSlug } from "@/data/ubmc";

export interface AgentAnswer {
  reply: string;
  route: string | null;
  product: string | null;
  suggestions: string[];
  source: "claude" | "local" | "kb";
  /** Drives the mascot's pose and animation while it answers. */
  mood?: "happy" | "explaining" | "excited" | "sorry";
  /** Knowledge-base sections the reply drew on, shown under the answer. */
  sources?: string[];
  /** True when the local engine found nothing. */
  unmatched?: boolean;
  /** A generic answer the knowledge base may beat; the server searches the KB first. */
  weak?: boolean;
}

export interface AgentContext {
  pathname: string;
}

const norm = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function lev1(a: string, b: string) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

const tokenHit = (tok: string, qTokens: string[]) =>
  qTokens.some((q) => q === tok || (tok.length >= 5 && lev1(q, tok)));

export function matchProduct(query: string): Product | null {
  const qNorm = norm(query);
  const qCompact = qNorm.replace(/ /g, "");
  const qTokens = qNorm.split(" ");
  let best: Product | null = null;
  let bestScore = 0;

  for (const p of products) {
    const candidates = [p.name, p.slug.replace(/-/g, " "), ...p.aliases];
    for (const cand of candidates) {
      const cn = norm(cand);
      const cc = cn.replace(/ /g, "");
      const tokens = cn.split(" ");
      let score = 0;
      const substringSafe = tokens.length > 1 || /\d/.test(cc) || cc.length >= 7;
      if (cc.length < 3) {
        if (qTokens.includes(cc)) score = 6;
      } else if (substringSafe && qCompact.includes(cc)) {
        score = cc.length * 2;
      } else if (tokens.every((t) => tokenHit(t, qTokens))) {
        score = cc.length * 1.5;
      }
      if (score > bestScore) {
        bestScore = score;
        best = p;
      }
    }
  }
  return best;
}

const has = (q: string, words: string[]) =>
  words.some((w) => new RegExp(`\\b${w}`, "i").test(q));

const WORDS = {
  price: ["price", "cost", "how much", "egp", "pound", "expensive"],
  calc: ["calculat", "how many lit", "how much paint", "do i need", "need for", "quantity", "litre", "liter", "m2", "m²", "square met", "estimate", "area"],
  store: ["store", "branch", "shop", "buy", "near", "where can i get", "distributor", "dealer", "franchise", "showroom", "warehouse", "factory"],
  contact: ["contact", "phone", "call", "hotline", "email", "number", "talk to", "support"],
  hours: ["hours", "open", "closed", "working time", "when are you"],
  colour: ["colour", "color", "shade", "palette", "catalogue", "catalog", "swatch"],
  projects: ["project", "reference", "case stud", "portfolio", "hotel", "compound"],
  about: ["about ubmc", "history", "who are", "company", "ubmc", "since", "founded", "mission", "vision", "group", "stand for"],
  points: ["point", "loyalty", "reward", "scratch", "qr", "app"],
  faq: ["faq", "question"],
  jobs: ["job", "career", "cv", "hiring", "vacanc", "intern"],
};

interface Need {
  words: string[];
  slug: string;
  why: string;
}

const NEEDS: Need[] = [
  { words: ["parquet", "floor"], slug: "si-wood-223", why: "it is a polyurethane varnish made for parquet and wooden floors" },
  { words: ["facade", "exterior", "outside", "outdoor", "outer wall", "balcony", "sun", "weather"], slug: "si-shield-matt", why: "it is SIPES' pure-acrylic exterior paint, built to resist dust, UV and heat" },
  { words: ["crack", "hole"], slug: "hi-krax", why: "it fills larger cracks and holes in one pass, indoors or out" },
  { words: ["putty", "smooth the wall", "level"], slug: "latex-putty", why: "it gives a smooth, white, easily sanded base before painting" },
  { words: ["kitchen", "kids", "children", "washable", "scrub", "clean", "hospital"], slug: "s70", why: "it is a premium matt emulsion with wet-scrub durability, so marks wipe off" },
  { words: ["stucco", "venetian", "marble"], slug: "effecto-stucco", why: "it creates a polished ornamental stucco finish" },
  { words: ["gold"], slug: "acry-gold", why: "it adds a gold-glitter decorative finish to interior walls" },
  { words: ["silver", "metallic"], slug: "acry-silver", why: "it adds a silver-sparkle decorative finish to interior walls" },
  { words: ["texture", "rough", "stone", "sandy"], slug: "si-tex", why: "it is a textured coating whose pattern changes with the tool you use" },
  { words: ["fabric", "velvet", "soft wall"], slug: "effecto-mohair", why: "it gives walls a silk, fabric-like brushed look" },
  { words: ["shimmer", "pearl", "sparkl"], slug: "effecto-amranti-silver", why: "it has soft shimmer pigments for a tactile, glowing wall" },
  { words: ["antique", "classic", "classical"], slug: "effecto-orgento-silver", why: "it gives a classical, antique architectural look" },
  { words: ["black"], slug: "si-tone-700-black", why: "it is a deep black water-based emulsion with good colour stability" },
  { words: ["silk", "sheen", "satin"], slug: "si-tone-silk", why: "it has a smooth silk sheen and resists stains" },
  { words: ["eggshell"], slug: "si-tone-800-eggshell", why: "it has a soft eggshell sheen and is washable" },
  { words: ["bright", "vivid"], slug: "si-tone-bright-colors", why: "it is tinted by machine to bright, saturated shades" },
  { words: ["furniture", "wood", "door", "cabinet", "timber"], slug: "nitro-varnish", why: "it is a fast-drying nitrocellulose varnish for interior wood and furniture" },
  { words: ["stain"], slug: "wood-stains", why: "they colour unfinished wood transparently before sealing" },
  { words: ["varnish", "clear coat", "transparent"], slug: "ultra-clear", why: "it is a clear, durable polyurethane varnish" },
  { words: ["metal", "iron", "steel", "gate", "railing"], slug: "si-gloss", why: "it is a hard, glossy alkyd enamel suited to metal and wood" },
  { words: ["thinner", "solvent", "dilute"], slug: "sipes-spirit", why: "it is the solvent for thinning SIPES oil paints and varnishes" },
  { words: ["tint", "colorant", "colourant", "concentrate"], slug: "uni-mix", why: "these concentrates tint paint by hand, no machine needed" },
  { words: ["matt", "ceiling", "bedroom", "living room", "interior", "wall", "room", "apartment"], slug: "si-tone-700", why: "it is a smooth matt interior emulsion with high hiding power" },
];

const FAMILIES: { words: string[]; family: string; label: string }[] = [
  { words: ["exterior paints", "exterior products", "facade products"], family: "exterior", label: "exterior" },
  { words: ["special effect", "decorative", "effects"], family: "effects", label: "special-effect" },
  { words: ["wood care", "woodcare", "wood products", "wood finishes"], family: "woodcare", label: "wood-care" },
  { words: ["interior paints", "interior products", "emulsions"], family: "interior", label: "interior" },
  { words: ["all products", "your products", "catalogue of products", "product range", "what do you sell", "what products"], family: "", label: "" },
];

// Which UBMC brand a question belongs to. Checked before SIPES products.
const BRAND_WORDS: { brand: BrandSlug; words: string[] }[] = [
  { brand: "perbuild", words: ["perbuild", "per build", "waterproof", "admixture", "concrete repair", "mortar", "grout", "tile adhesive", "cementitious", "construction chemical", "insulat"] },
  { brand: "transocean", words: ["transocean", "marine", "ship", "boat", "yacht", "hull", "antifouling", "offshore", "anticorros", "pipeline", "tank lining", "shipyard"] },
  { brand: "sitech", words: ["sitech", "si tech", "epoxy", "self-level", "self level", "industrial floor", "floor coating", "xtr", "antibacterial", "cooling paint", "warehouse floor"] },
  { brand: "swift", words: ["swift", "cheap", "economical", "budget", "affordable", "low cost", "low-cost"] },
  { brand: "color-center", words: ["color center", "colour center", "color centre", "colour centre", "masria", "nearest store", "visit a store", "showroom"] },
];

function brandAnswer(slug: BrandSlug): AgentAnswer {
  const b = brandBySlug(slug)!;
  const reply =
    slug === "color-center"
      ? `That's our UBMC Color Center stores: Heliopolis, El Bahr El Aazam, Faisal and El Sudan in Mohandessin, with specialists to help you choose. Call ${group.hotline} to check hours.`
      : `That's a job for ${b.name}, our ${b.area.toLowerCase()} brand. ${b.tagline} Here's what it offers.`;
  return {
    source: "local",
    reply,
    route: b.href,
    product: null,
    mood: "excited",
    suggestions: [`What does ${b.name} offer?`, "Where can I buy it?", "Show me all UBMC brands"],
  };
}

const GENERIC = new Set(["the", "new", "hospital", "international", "school", "city", "road"]);
// The distinctive word in a project name, e.g. "Sawary" in "Sawary – Alexandria".
const projectKey = (name: string) =>
  norm(name).split(" ").find((w) => w.length >= 4 && !GENERIC.has(w)) ?? norm(name);

export function describe(p: Product, why?: string) {
  const lead = why
    ? `I'd go with ${p.name}: ${why}.`
    : `Here's ${p.name}: ${lowerFirst(p.whatItIs)}`;
  return `${lead} Where to use it: ${lowerFirst(p.uses)} Available in ${p.packs.map((x) => x.size).join(", ")}.`;
}

const lowerFirst = (s: string) =>
  /^[A-Z](?![A-Z0-9-])/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;

export function productSuggestions(p: Product) {
  return [
    `How much ${p.name} do I need?`,
    `Where can I buy ${p.name}?`,
    ...products
      .filter((x) => x.category === p.category && x.slug !== p.slug)
      .slice(0, 1)
      .map((x) => `Compare with ${x.name}`),
  ];
}

export const pageSuggestions = (pathname: string): string[] => {
  if (pathname.startsWith("/sipes/product/")) {
    const p = productBySlug(pathname.split("/")[3] ?? "");
    if (p) return [`What is ${p.name} used for?`, `Where can I buy it?`, `How many litres for a 4×3 m room?`];
  }
  if (pathname.startsWith("/sipes/products")) return ["Which paint is washable?", "Show me exterior paints", "Something gold for a feature wall"];
  if (pathname.startsWith("/sipes/colours")) return ["Which paint takes these colours?", "Show me Elegance tones", "Calculate paint for my room"];
  if (pathname.startsWith("/sipes/calculator")) return ["Which paint for a kitchen?", "Where can I buy it?", "What is Si-Tone 700 used for?"];
  if (pathname.startsWith("/stores")) return ["What are your working hours?", "What is the hotline?", "How do I become a distributor?"];
  if (pathname.startsWith("/brands/")) {
    const b = brandBySlug(pathname.split("/")[2] ?? "");
    if (b) return [`What does ${b.name} offer?`, `Is ${b.name} right for my project?`, "Where can I buy it?"];
  }
  if (pathname.startsWith("/sipes")) return ["Tell me about Si-Tone Silk", "Paint for my facade", "Varnish for a parquet floor"];
  return ["Which brand does waterproofing?", "Coatings for a ship hull", "Washable paint for a kids' room"];
};

function isAboutCurrent(q: string) {
  return has(q, ["this", "it", "its", "price", "cost", "use", "used", "what is", "dry", "apply", "cover", "where", "surface", "finish", "how"]);
}

export function localAnswer(message: string, ctx: AgentContext): AgentAnswer {
  const q = message.trim();
  const base = { source: "local" as const };
  if (!q) {
    return { ...base, reply: "Ask me about any UBMC brand, product, store or project.", route: null, product: null, suggestions: pageSuggestions(ctx.pathname) };
  }

  // Questions about the category itself win over a product-name match.
  if (has(q, ["wallpaper"])) return faqAnswer("wallpaper");
  if (has(q, ["heat insulat", "keep the heat", "heat out"])) return { ...faqAnswer("insulation"), route: "/brands/perbuild" };
  if (has(q, ["brands", "sister brand", "subsidiar", "which brand"])) {
    return { ...base, reply: "UBMC has six brands: SIPES for decorative paint, SiTech for professional coatings, Transocean for marine protection, PerBuild for construction chemicals, Swift for an economical range, and our UBMC Color Center stores.", route: "/brands", product: null, suggestions: ["Which brand does waterproofing?", "Coatings for a ship hull", "Tell me about SIPES"] };
  }

  const project = projects.find((x) => has(q, [projectKey(x.name)]));
  if (project) {
    return { ...base, reply: `${project.name} used ${project.product} for its ${project.scope.toLowerCase()}.`, route: project.slug ? `/sipes/product/${project.slug}` : "/sipes/projects", product: project.slug, suggestions: ["Show me all projects", "Paint for my facade"] };
  }

  let p = matchProduct(q);
  const currentSlug = ctx.pathname.startsWith("/sipes/product/") ? ctx.pathname.split("/")[3] : null;
  if (!p && currentSlug && isAboutCurrent(q) && !has(q, WORDS.store) && !has(q, WORDS.contact)) {
    p = productBySlug(currentSlug) ?? null;
  }

  if (p) {
    if (has(q, WORDS.calc)) {
      return { ...base, reply: `Let's work out how much ${p.name} you need. Enter your wall sizes and I'll calculate the litres and pack quantities for two coats.`, route: `/sipes/calculator?product=${p.slug}`, product: p.slug, suggestions: [`What is ${p.name} used for?`, `Where can I buy ${p.name}?`] };
    }
    if (has(q, WORDS.store)) {
      return { ...base, reply: `${p.name} is sold through SIPES branches and distributors. Here are the SIPES locations; call the hotline ${company.hotline} to check stock near you.`, route: "/stores", product: p.slug, suggestions: ["What are your working hours?", "Which pack sizes are available?"] };
    }
    if (has(q, WORDS.price)) {
      const sizes = p.packs.map((x) => x.size).join(", ");
      return { ...base, reply: `${p.name} is available in ${sizes}. Current prices and discounts are available at SIPES branches and authorized distributors, or by calling 19852.`, route: `/sipes/product/${p.slug}`, product: p.slug, suggestions: productSuggestions(p) };
    }
    return { ...base, reply: describe(p), route: `/sipes/product/${p.slug}`, product: p.slug, suggestions: productSuggestions(p) };
  }

  // A named SIPES product wins; otherwise check whether another UBMC brand fits.
  for (const b of BRAND_WORDS) if (has(q, b.words)) return brandAnswer(b.brand);

  if (has(q, WORDS.hours)) return { ...base, reply: `UBMC head office hours: ${group.hours} The hotline for every brand is ${group.hotline}.`, route: "/contact", product: null, suggestions: ["Where are your branches?", "What's your email?"] };
  if (has(q, WORDS.jobs)) return { ...base, reply: `Send your CV to ${company.careersEmail}. SIPES posts current openings on its careers page.`, route: "/contact", product: null, suggestions: ["Tell me about SIPES", "Where is the head office?"] };
  if (has(q, ["dry", "drying"])) return faqAnswer("dry");
  if (has(q, ["data sheet", "tds", "technical"])) return faqAnswer("tds");
  if (has(q, WORDS.calc)) return { ...base, reply: "Enter your wall width and height, doors and windows, and pick a paint. I'll estimate litres and pack quantities for two coats.", route: "/sipes/calculator", product: null, suggestions: ["Which paint for a living room?", "How much paint for a bedroom?"] };
  if (has(q, WORDS.contact)) return { ...base, reply: `Call ${group.hotline} for any UBMC brand, email ${group.email} (or ${company.email} for SIPES), or visit our headquarters at ${group.address}.`, route: "/contact", product: null, suggestions: ["What are your working hours?", "Where are your branches?"] };
  if (has(q, WORDS.store)) return { ...base, reply: "Visit a UBMC Color Center in Heliopolis, El Bahr El Aazam, Faisal or Mohandessin, or call 19852 to find the nearest dealer. Here are our stores, factories and warehouses.", route: "/stores", product: null, suggestions: ["What are your working hours?", "How do I become a distributor?"] };
  if (has(q, WORDS.points)) return { ...base, reply: "SIPES Points lets you scan the scratch-off QR code on eligible products, collect points in the app and redeem them for discounts and rewards.", route: "/sipes/loyalty", product: null, suggestions: ["Which products carry points?", "Where can I buy SIPES?"] };
  if (has(q, WORDS.projects)) return { ...base, reply: "SIPES coatings are on hospitals, hotels and coastal compounds across Egypt, from Magdy Yacoub Hospital to Naia Bay. Here are the reference projects.", route: "/sipes/projects", product: null, suggestions: ["What was used at Sawary?", "Paint for a facade"] };

  for (const f of FAMILIES) {
    if (has(q, f.words)) {
      return { ...base, reply: f.family ? `Here is the SIPES ${f.label} range. Tap any product, or tell me about your surface and I'll pick one.` : "Here is the full SIPES range across interior, exterior, special effects and wood care.", route: f.family ? `/sipes/products?family=${f.family}` : "/sipes/products", product: null, suggestions: ["Which one is washable?", "Paint for my facade", "Something gold"] };
    }
  }

  if (has(q, WORDS.colour)) return { ...base, reply: "Here are the SIPES colour families: Angel, Dream, Elegance, Fall and Young. Pick a swatch to preview it, then visit a colour centre for a physical sample.", route: "/sipes/colours", product: null, suggestions: ["Which paint can be tinted?", "Calculate paint for my room"] };

  for (const n of NEEDS) {
    if (has(q, n.words)) {
      const prod = productBySlug(n.slug)!;
      return { ...base, reply: describe(prod, n.why), route: `/sipes/product/${prod.slug}`, product: prod.slug, suggestions: productSuggestions(prod) };
    }
  }

  if (has(q, WORDS.about)) return { ...base, reply: "UBMC stands for Universal Building Materials and Chemicals. We make paints, coatings and construction chemicals in three Egyptian factories, sell through six brands, and serve Egypt plus 15 other countries.", route: "/about", product: null, suggestions: ["What brands does UBMC have?", "Where are your factories?"], weak: true };
  if (has(q, WORDS.price)) return faqAnswer("price");
  if (has(q, WORDS.faq)) return { ...base, reply: "Here are the most common questions customers ask SIPES.", route: "/sipes/faq", product: null, suggestions: pageSuggestions("/sipes/faq") };
  if (has(q, ["hi", "hello", "hey", "salam", "help"])) return { ...base, reply: "Hi, I'm Mr. SIPES! Tell me about your project, a paint, a coating or a store you're after, and I'll take you to the right UBMC brand.", route: null, product: null, suggestions: pageSuggestions(ctx.pathname) };

  return {
    ...base,
    reply: "I couldn't match that to a UBMC brand, product or page. Tell me what you're working on, name a product, or ask about a store.",
    route: null,
    product: null,
    suggestions: ["Tell me about Si-Tone Silk", "Paint for my facade", "Where can I buy SIPES?"],
    unmatched: true,
    weak: true,
  };

  function faqAnswer(id: string): AgentAnswer {
    const f = faqs.find((x) => x.id === id)!;
    return { ...base, reply: f.a, route: "/sipes/faq", product: null, suggestions: pageSuggestions("/sipes/faq") };
  }
}
