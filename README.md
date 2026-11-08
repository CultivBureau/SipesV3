# SIPES v3 — Ask Sami (Next.js)

The SIPES paints website with an animated cartoon technician, **Sami**, who answers every question.
Sami is grounded on the Markdown knowledge base in [`KB/`](KB/) and is animated from the character art in [`Images/`](Images/).

## Run

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY for full answers
npm run dev                  # http://localhost:3000
```

## How Sami answers

- **With `ANTHROPIC_API_KEY`**: `/api/agent` sends the question to Claude with *every* `.md` file in `KB/` in the (cached) system prompt. Claude answers in character as Sami, picks a mood (happy / explaining / excited / sorry) that drives his animation, and returns the page to open.
- **Without a key** (or if the call fails): the product engine in `src/lib/agent-local.ts` answers catalogue questions, and a BM25 keyword search over the KB sections (`src/lib/kb.ts`) answers the rest.
- Add or edit a file in `KB/` and restart the server; Sami knows it. `GET /api/agent` lists the loaded KB files.
- Internal docs (the prototype scope and brand guidelines) are used for context only; Sami won't present planned features as live.

## The character

Poses are cut out of `Images/` into `public/mascot/` (transparent PNGs):

| Pose | Used when |
|---|---|
| `standing.png` | idle (breathing + sway), listening (leans in, sound rings), talking (bobs on every spoken word, voice bars) |
| `arms-crossed.png` | thinking (thought bubble) and "sorry" answers |
| `face.png` | avatar in the answer panel (nods while talking) |
| `van.jpg` | "On the road" section on the home page |

Answers are read aloud with the browser's speech engine (Arabic replies use an Arabic voice), and the speech bubble reveals the words in step with the voice. Muted, Sami still mouths the answer.

Rename the character or swap images in [`src/lib/mascot.ts`](src/lib/mascot.ts).

## Where things live

- `KB/` — knowledge base (Markdown), read at runtime
- `Images/` — original character art
- `src/components/mascot/` — `Mascot` (full body + states), `MascotFace`, `MascotHero`
- `src/components/agent/` — state, speech, navigation, bottom dock
- `src/data/` — product catalogue, stores, pages used for navigation
