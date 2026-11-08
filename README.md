# UBMC Group website — Ask Mr. SIPES (Next.js)

The UBMC Group website, with SIPES as one of its six brands. An animated cartoon technician, **Mr. SIPES**, answers every question about the group.
He is grounded on the Markdown knowledge base in [`KB/`](KB/) and is animated from the character art in [`Images/`](Images/).

## Site map

- `/` — UBMC Group home: Mr. SIPES hero, group figures, six brands, "which brand for which job", stores
- `/about` — UBMC vision, mission, manufacturing and R&D, milestones, projects
- `/brands` and `/brands/[sitech|transocean|perbuild|swift]` — brand pages
- `/stores` — UBMC Color Center stores, factories and warehouses
- `/contact` — group contact
- `/sipes/*` — the SIPES brand section: products, product pages, colours, calculator, catalogues, SIPES Points, projects, news, FAQ

## Run

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY for full answers
npm run dev                  # http://localhost:3000
```

## How Mr. SIPES answers

- **With `ANTHROPIC_API_KEY`**: `/api/agent` sends the question to Claude with *every* `.md` file in `KB/` in the (cached) system prompt. Claude answers in character as Mr. SIPES, routes the visitor to the right UBMC brand, picks a mood (happy / explaining / excited / sorry) that drives his animation, and returns the page to open.
- **Without a key** (or if the call fails): the engine in `src/lib/agent-local.ts` routes to the right brand and answers SIPES catalogue questions, and a BM25 keyword search over the KB sections (`src/lib/kb.ts`) answers the rest.
- Add or edit a file in `KB/` and restart the server; Mr. SIPES knows it. `GET /api/agent` lists the loaded KB files.
- Internal docs (the prototype scope and brand guidelines) are used for context only; Mr. SIPES won't present planned features as live.

## The character

Poses are cut out of `Images/` into `public/mascot/` (transparent PNGs):

| Pose | Used when |
|---|---|
| `standing.png` | idle (breathing + sway), listening (leans in, sound rings), talking (bobs on every spoken word, voice bars) |
| `arms-crossed.png` | thinking (thought bubble) and "sorry" answers |
| `face.png` | avatar in the answer panel (nods while talking) |
| `van.jpg` | "On the road" section on the home page |

Answers are read aloud with the browser's speech engine (Arabic replies use an Arabic voice), and the speech bubble reveals the words in step with the voice. Muted, Mr. SIPES still mouths the answer.

Rename the character or swap images in [`src/lib/mascot.ts`](src/lib/mascot.ts).

## Where things live

- `KB/` — knowledge base (Markdown), read at runtime
- `Images/` — original character art
- `src/components/mascot/` — `Mascot` (full body + states), `MascotFace`, `MascotHero`
- `src/components/agent/` — state, speech, navigation, bottom dock
- `src/data/ubmc.ts` — group facts, brands, stores
- `src/data/` — SIPES product catalogue, pages used for navigation
