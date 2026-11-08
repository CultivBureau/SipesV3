// UBMC Group: the umbrella this site is about. Facts from KB/UBMC_Company_Knowledge_Base.md.

export const group = {
  name: "UBMC Group",
  legalName: "Universal Building Materials and Chemicals Company",
  short: "UBMC",
  line: "Paints, coatings, construction chemicals and the stores to buy them, under one roof.",
  summary:
    "UBMC is an Egypt-headquartered maker of paints, decorative finishes, professional and protective coatings, and construction chemicals. Six brands and business units serve homes, projects, shipyards and industry across Egypt and 15 other countries.",
  hotline: "19852",
  email: "info@ubmcgroup.com",
  website: "https://ubmcgroup.com/",
  address: "104 El-Thawra Street, Heliopolis, Cairo, Egypt",
  hours: "Sunday to Thursday, 8:00–18:00 (check before visiting).",
  logo: "/brand/ubmc.png",
  logoWhite: "/brand/ubmc-white.png",
};

export const figures = [
  { value: "6", label: "brands and business units" },
  { value: "3", label: "manufacturing facilities" },
  { value: "64,000 m²", label: "of manufacturing footprint" },
  { value: "180,000 t", label: "stated production capacity a year" },
  { value: "1,000+", label: "qualified staff" },
  { value: "15+", label: "countries served beyond Egypt" },
];

export type BrandSlug = "sipes" | "sitech" | "transocean" | "perbuild" | "swift" | "color-center";

export interface Brand {
  slug: BrandSlug;
  name: string;
  logo: string;
  colour: string;
  area: string;
  tagline: string;
  positioning: string;
  offers: string[];
  examples?: string[];
  services?: string[];
  forWho: string;
  site: string;
  note?: string;
  /** Where this brand lives on this site. */
  href: string;
}

export const brands: Brand[] = [
  {
    slug: "sipes",
    name: "SIPES",
    logo: "/brand/sipes-k.png",
    colour: "#E2231A",
    area: "Decorative & architectural paints",
    tagline: "Interior and exterior paint, decorative effects, wood care and colour.",
    positioning:
      "The decorative and architectural painting brand, serving homeowners, decorators, craftspeople, designers, architects and projects. The SIPES trademark dates back to 1947.",
    offers: [
      "Interior painting systems, emulsions, fillers and putties",
      "Exterior and facade paints",
      "Wood-care products and varnishes",
      "Decorative finishes and special-effect coatings",
      "Colour inspiration, catalogues and the Si-PRO tinting system with over 900 tones",
    ],
    examples: ["Bond 5000", "S70", "Si-Tone", "Latex Putty", "Ultra Clear", "Si Wood 223", "SipeStar", "Si-Shield Matt"],
    forWho: "Painting a home, preparing walls, choosing colours, decorative finishes and wood finishes.",
    site: "https://ubmcgroup.com/sipes/en/",
    href: "/sipes",
  },
  {
    slug: "sitech",
    name: "SiTech Coatings",
    logo: "/brand/sitech.png",
    colour: "#0E6E8C",
    area: "Professional & performance coatings",
    tagline: "High-performance facades, floors and specialist interiors.",
    positioning:
      "Premium professional coatings for demanding exterior surfaces and specialist applications. Launched in 2022.",
    offers: [
      "Exterior and facade systems for urban, coastal and industrial weathering",
      "Floor coatings: self-levelling epoxies, mortars, grouts and crack fillers",
      "Specialised interior paints, including antibacterial and cooling categories",
      "Concrete-floor protection against oils, chemicals, abrasion and impact",
    ],
    examples: ["XTR Putty", "XTR Sealer S1", "XTR Sealer S100", "XTR Roof"],
    forWho: "Specialty facades, protective floors, epoxy systems, industrial or coastal exposure.",
    site: "https://ubmcgroup.com/sitech/",
    href: "/brands/sitech",
  },
  {
    slug: "transocean",
    name: "Transocean Coatings",
    logo: "/brand/transocean.png",
    colour: "#123C7A",
    area: "Marine, offshore & protective",
    tagline: "Antifouling, anticorrosive and yacht coatings for steel that meets the sea.",
    positioning:
      "Marine, yacht, offshore and industrial protective coating solutions, part of the UBMC portfolio since 2011.",
    offers: [
      "Marine coatings: antifouling and corrosion protection for ships",
      "Offshore and protective systems for exposed steel and industrial structures",
      "Yacht coatings: protective and decorative finishes",
      "Systems for tank linings, pipelines, vessels and installations",
    ],
    forWho: "Shipyards, marine operators, offshore assets, industrial protection and yacht owners.",
    site: "https://ubmcgroup.com/transocean-coatings/",
    note: "The worldwide Transocean Coatings association (founded 1959, Netherlands) is a separate network; UBMC carries the brand in its portfolio.",
    href: "/brands/transocean",
  },
  {
    slug: "perbuild",
    name: "PerBuild",
    logo: "/brand/perbuild.png",
    colour: "#5B6B2E",
    area: "Construction chemicals",
    tagline: "Admixtures, waterproofing, mortars and repair, with technical support on site.",
    positioning: "Construction chemicals and building-performance materials for local and export markets. Established in 2009.",
    offers: [
      "Premixed cementitious products, mortars and repair materials",
      "Concrete and mortar admixtures",
      "Waterproofing products and systems",
      "Grouts and tile adhesives",
      "Flooring epoxies and surface protection",
    ],
    services: ["Samples and trial sessions", "Theoretical and practical technical support", "Technical supervision", "Application guidance and product recommendations"],
    forWho: "Civil contractors, site engineers, concrete specialists, developers and waterproofing contractors.",
    site: "https://ubmcgroup.com/perbuild/",
    href: "/brands/perbuild",
  },
  {
    slug: "swift",
    name: "Swift Paints",
    logo: "/brand/swift.png",
    colour: "#E07B00",
    area: "Economical paints",
    tagline: "The practical, budget-conscious range for every core painting step.",
    positioning: "The economical painting solution for customers who need a practical, budget-conscious range.",
    offers: ["Sealer", "Putty", "Plastic ceiling paint", "Gloss enamel", "Top Tone"],
    examples: ["Swift Plastic", "Swift Top-Tone", "Swift Putty"],
    forWho: "Anyone looking for an affordable paint system across the core painting steps.",
    site: "https://ubmcgroup.com/swift-paints/",
    href: "/brands/swift",
  },
  {
    slug: "color-center",
    name: "UBMC Color Center",
    logo: "/brand/ubmc.png",
    colour: "#8B1E45",
    area: "Stores & specialist advice",
    tagline: "Company-operated stores with the whole group on the shelf and specialists to help.",
    positioning:
      "UBMC's company-operated retail store chain (formerly El Masria Store), where customers explore assortments and get specialist product advice.",
    offers: ["Product assortments from across the group", "In-store specialist advice", "Colour discussions and buying guidance"],
    forWho: "Anyone who wants to see products, talk to a specialist or find the nearest store.",
    site: "https://ubmcgroup.com/ubmc-color-center/",
    href: "/stores",
  },
];

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);

export const solutions = [
  { need: "Paint a home inside or out", brand: "sipes" as BrandSlug },
  { need: "Decorative effect or wood finish", brand: "sipes" as BrandSlug },
  { need: "Weather-proof facade or specialist floor", brand: "sitech" as BrandSlug },
  { need: "Ship hull, tank or steel structure", brand: "transocean" as BrandSlug },
  { need: "Waterproofing, admixtures or concrete repair", brand: "perbuild" as BrandSlug },
  { need: "Economical core paint materials", brand: "swift" as BrandSlug },
  { need: "Visit a store or talk to a specialist", brand: "color-center" as BrandSlug },
];

export const colorCenters = [
  { name: "Heliopolis", address: "104 El Thawra St., Heliopolis, Cairo", phone: "26905015" },
  { name: "El Bahr El Aazam", address: "1–2 Manesterly Towers, El Bahr El Aazam St., Giza", phone: "35729300 / 35709800" },
  { name: "Faisal", address: "216 Faisal St., Ta'awon, Giza", phone: "37420002" },
  { name: "El Sudan", address: "153 Sudan St., opposite El Salam Shopping Center, Mohandessin, Giza", phone: "37499698" },
];

export const groupMilestones = [
  { year: "1947", text: "The SIPES trademark is created." },
  { year: "1956", text: "First manufacturing facility in the MENA region." },
  { year: "1989", text: "First manufacturing facility in Egypt." },
  { year: "2007", text: "SIPES expands into Saudi Arabia and beyond." },
  { year: "2009", text: "PerBuild is established." },
  { year: "2011", text: "Transocean joins the UBMC portfolio." },
  { year: "2022", text: "SiTech launches." },
];

export const groupProjects = ["West El Shorouk", "West El Shorouk 2", "New Capital City", "Pharmacists City"];

export const principles = [
  "Quality, technical innovation and integrated solutions",
  "Compliance with local and global standards, and sustainability",
  "Developing people, training and team effectiveness",
  "Long-term customer confidence and service",
];
