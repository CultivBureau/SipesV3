# SIPES 360 — Interactive Prototype Scope
## An AI-first painting, procurement, and professional ecosystem
**Document type:** Client demonstration scope + Codex implementation brief  
**Version:** 1.0 | **Date:** 26 October 2026  
**Status:** Proposed proof of concept — not a live commercial system

---

## 1. Executive summary

Build a premium, futuristic, bilingual (Arabic/English), mobile-responsive interactive prototype that illustrates how SIPES can evolve from a conventional manufacturer's website into a practical operating environment for homeowners, engineers, architects, contractors, painters, distributors, and the SIPES sales team.

**Core proposition:** Help people **choose the right paint, plan the job, see the result, price the project, find a professional, request the order, and receive recognition for verified contributions**—in one connected journey.

The entire future platform should be discoverable and visually compelling. Only its highest-impact, most demonstrable capabilities need fully functioning prototype workflows. Other modules should have credible, interactive UI backed by carefully identified sample data; do not portray mock functionality as a live integration.

**Commercial goals:** generate qualified projects, increase quote-to-order conversion, sell complete compatible paint systems, increase professional specification and repeat purchase, and improve downstream sales visibility.

### Prototype acceptance principle
The prototype succeeds when a client can complete an end-to-end demonstration from an AI request to a saved project, calculated bill of materials, color visualization, quotation, and **clearly labeled demo order**, while also seeing realistic working previews of the Academy, painter network, loyalty, distributor, and enterprise ecosystem.

## 2. Scope categories

- **LIVE MVP:** Real UI actions, validated business logic, and persistence in the prototype database. AI calls are real where specified.
- **INTERACTIVE DEMO:** User can navigate and perform a limited simulated transaction; results are generated from sample data and labeled *Demo*.
- **VISUAL SHOWCASE:** Fully designed screen and representative states; no production transaction, external integration, or real-world guarantee.

No dead buttons or misleading successes. Unimplemented actions either open a meaningful preview or visibly explain that they are part of the proposed next phase.

## 3. Audience and demo personas

| Persona | Primary job to be done | Demo entry point |
|---|---|---|
| Homeowner | Explore colors and estimate renovation spend | Visualize My Space |
| Architect / designer | Select palettes and specify SIPES products | Design Studio / Projects |
| Contractor / engineer | Calculate quantities, prepare BOQ, request pricing | Project Calculator |
| Painter | Access application guidance, courses, accreditation, points | SIPES Pro / Academy |
| Distributor | Receive potential orders and view channel rewards | Dealer Portal |
| SIPES commercial team | Understand the pipeline and professional influence | Commercial Intelligence |

**Demo-role switcher:** Allow presenters to switch between these six seeded personas without logging out. Display **Presentation Demo Mode** prominently. In a production environment, roles and access would require proper authentication and verification.

## 4. Visual product concept: AI workspace, not a conventional website

### Experience
- Hero proposition: **“What are we creating today?”** with a large AI command bar, voice-input affordance, and contextual suggestions.
- Premium architectural photography, actual SIPES color inspiration, large typography, tactile product/material imagery, subtle motion, and elegant transitions.
- A continuously accessible **AI copilot** opens tools **inside a unified workspace**, preferably as Next.js component panels or drawers; reserve iframes for independently hosted modules only where justified.
- Standard navigation remains available via an obvious **Explore Website** / menu entry. Users never need to chat to perform a task.
- Responsive desktop split-screen: AI conversation / guidance on one side, active tool canvas on the other. On mobile, switch to an accessible stacked layout with a persistent assistant launcher.
- English and Arabic experiences with real RTL layout; prioritize short, understandable Egyptian-market terminology. Demo can use bilingual static UI copy and language-specific assistant instructions.
- Respect SIPES' visual identity while applying a more futuristic art direction: graphite/ink neutral canvases, spacious editorial layouts, pigment-inspired accent colors, rich material textures, refined micro-interactions. Do not invent a new company logo.
- All major tools support deep links so a presenter can jump directly into a specific feature.

### Two navigation modes
1. **AI Mode:** conversational project orchestration with clickable output cards and actions.
2. **Explore Mode:** accessible classic product, solutions, inspiration, professionals, Academy, rewards, and company navigation.

## 5. Full feature-coverage matrix

| Module | Prototype level | Required behavior / screen |
|---|---|---|
| AI-first home and adaptive tool navigation | **LIVE MVP** | Conversational assistant opens relevant tools and carries project context |
| AI Material & Product Advisor | **LIVE MVP** | Guided discovery; recommends from seeded SIPES catalog with reasons and caveats |
| Advanced Project Calculator | **LIVE MVP** | Deterministic measurement, coats, coverage, pack optimization, cost scenarios |
| AI Room Color Visualizer | **LIVE MVP** | Preset rooms with instant previews; uploaded-room AI edit where key available |
| Color catalogue and inspiration | **LIVE MVP** | Browse/search palettes, upload an inspiration photo for AI palette suggestions, apply colors to room/project |
| Architect Specification Studio | **INTERACTIVE DEMO** | Mood board, system specification, product sheet links, client approval preview |
| Surface Problem Photo Advisor | **INTERACTIVE DEMO** | Upload wall image and see cautious AI symptom triage; no technical diagnosis |
| Project Passport | **LIVE MVP** | Create/save project, areas, participants, color choices, estimated BOM, status |
| Quotation and order-request journey | **LIVE MVP (demo transaction)** | Turn estimate into quote and submit a stored **Demo Order Request** |
| Custom tinting / custom color order | **INTERACTIVE DEMO** | Color selection, product/pack compatibility mock, request submission |
| SIPES professional network | **INTERACTIVE DEMO** | Search/filter fictional seeded professionals; view profile and contact-request demo |
| SIPES Academy & accreditation | **LIVE MVP (sample course)** | Enroll, view 1 sample micro-course, pass mini-quiz, receive **Demo Accreditation** |
| Multi-stakeholder loyalty wallets | **INTERACTIVE DEMO** | Role-specific wallets; sample event ledger; one independent entitlement claim flow |
| Project-based referrals and contributions | **INTERACTIVE DEMO** | Architect/contractor/painter/dealer role associations on one demo project |
| Dealer portal and routing | **INTERACTIVE DEMO** | Mock incoming order, fulfillment status, stock indicators, channel dashboard |
| Dealer locator / nearest color center | **INTERACTIVE DEMO** | Search by district, filter tinting/fulfillment services, use seeded **demo** locations |
| WhatsApp AI companion | **VISUAL SHOWCASE** | Realistic channel handoff UI and sample chat, **not** connected to WhatsApp |
| Customer purchase history / smart reorder | **INTERACTIVE DEMO** | Reorder from existing demo project into a new draft |
| SIPES Pro membership / verification | **VISUAL SHOWCASE** | Tiers, benefits, badge and verification request UI |
| Enterprise specification & RFQ | **VISUAL SHOWCASE** | Developer procurement workspace and sample RFQ |
| AI blueprint takeoff | **VISUAL SHOWCASE** | Preloaded sample drawing and annotated results; **not** live PDF measurement |
| Maintenance / aftercare | **VISUAL SHOWCASE** | Saved paint history, maintenance timeline, sample reminders |
| AI color matching | **INTERACTIVE DEMO** | Upload inspiration, approximate closest palette and send matching request |
| Enterprise demand insights | **VISUAL SHOWCASE** | Territory demand indicators, product trends, and future forecast concept (sample data) |
| Commercial Intelligence dashboard | **INTERACTIVE DEMO** | Real prototype activity counters mixed with labeled illustrative business metrics |
| Technical library / guides | **INTERACTIVE DEMO** | Searchable curated technical snippets and product sheets where licensed |
| SIPES company pages | **VISUAL SHOWCASE** | About, quality, R&D, contact, careers, authorized distributors |

## 6. LIVE MVP specifications

### 6.1 SIPES AI Copilot

**User input:** Free-text English or Arabic, suggested prompts, optional image upload. Speech capture may be a UI affordance in this release, not a required functional voice integration.

**Mandatory capabilities:**
- Understand intent: colors, product selection, estimate, pricing, quotation, order, rewards, professional discovery, training.
- Maintain project context during the session and when signed in.
- Query **approved seeded SIPES products and their recorded attributes**; never recommend nonexistent SKUs or invent technical data.
- Use tool/function calling to trigger actual application actions: `searchProducts`, `recommendPaintSystem`, `openTool`, `calculateEstimate`, `createProject`, `saveColorSelection`, `createQuote`, `prepareDemoOrder`, `findProfessionals`, `showAcademyCourse`.
- Return structured UI cards: product options, estimated quantities, color palettes, next actions, project snapshots.
- Ask for missing inputs (e.g., floor area versus wall area) before making calculations.
- Hand off complex substrate or moisture scenarios to technical support; avoid confident diagnoses from photos.
- Request explicit confirmation before saving, creating quotes, or submitting demo order requests.
- Refuse to fabricate official SIPES prices, coating guarantees, tint formulas, product availability, or certification status.

**Acceptance demo:** “I have a 150 m² apartment; recommend a washable interior system and estimate my cost.” Assistant asks for clarification where necessary, retrieves options, opens calculator, creates a project, and proposes a quote.

### 6.2 Smart Material Advisor

Guided form and chat-powered equivalent taking surface type, indoor/outdoor, substrate, condition, finish preference, location exposure, priorities, and budget tier. A photo-upload triage preview may classify visible symptoms but must state that it cannot confirm hidden moisture or structural defects.

Output 2–3 supported alternatives, trade-offs, and *full compatible systems* (preparation, primer, filler, finish) only when documented. Add products to a project. Clearly flag unavailable catalog attributes as **“To be verified by SIPES technical team.”**

### 6.3 Advanced Paint Calculator

**Inputs:** project type; room/wall measurements; openings; selected products; number of coats; coverage per coat; surface-condition factor; waste factor; pack sizes; unit prices; optional labor assumption.

**Business rules:**
- Net painted area = measured wall and ceiling surface areas − valid excluded openings.
- The demo must distinguish **floor area** from **paintable surface area**.
- Liters required = `net area × coats / effective coverage × (1 + waste fraction)`; validate coverage basis per manufacturer documentation and account for required dilution/absorption only when defined.
- Select a feasible combination of available package sizes; show purchased volume and unused volume; explain optimization assumptions.
- Estimate line items for primer, filler and topcoat according to validated system rules.
- Show Economy / Balanced / Premium scenarios only when seeded products have sufficient comparison data.
- EGP totals use **clearly labeled illustrative demo prices**, not asserted market prices.
- Save estimate and produce an itemized quotation view; browser print/PDF export is a nice-to-have.

**Acceptance demo:** Changing wall measurements, number of coats, product, or waste factor immediately recalculates quantities and EGP totals consistently. Same inputs yield same outputs: all arithmetic is deterministic code, not AI-generated numbers.

### 6.4 Room Visualizer / Color Studio

**Two methods:**
- **Instant mode:** 3–5 curated room images with predefined wall masks and client-side paint color overlays. Rapid, deterministic, high-impact during live demos.
- **AI upload mode:** User uploads a room photo and selects a SIPES palette color. Server invokes OpenAI image editing to produce a realistic *conceptual approximation*, attempting to preserve room geometry, furniture, openings, shadows, and materials. Permit before/after slider and save result to the project.

**Required:** palette picker, named SIPES color references when sourced, accent-wall selection on prepared scenes, compare versions, save mood board, link suggested products, before/after presentation. Also provide an inspiration-photo palette extraction: use a vision-capable model to suggest approximate nearest seeded colors (not precise colorimetry).

**Important:** Photo-edit output cannot establish a certified color match. Display “Digital color previews are approximate; confirm with physical samples.” If image API key is missing or a generation fails, fall back openly to preset room scenarios; never silently claim a static image is a new AI result.

### 6.5 Project Passport → Quote → Demo Order

Each project includes title, fictional customer, location area, project type, participants, photos, rooms/surfaces, estimated quantities, color selections, selected paint systems, quote value, and status.

Supported statuses: Draft → Specified → Estimated → Quote Ready → Demo Order Requested. Save in Supabase. Generate a presentation-friendly project overview with a unique reference such as `SIPES-DEMO-10485`.

Quote contains editable lines, sizes, quantities, indicative prices, assumptions, and grand total. CTA: **Request an Order (Demo)**. Persist an order request and display confirmation with an unequivocal **“Prototype only — no actual order placed”** label. No real payment, inventory reservation, or external dealer action.

## 7. Interactive ecosystem demonstrations

### 7.1 SIPES Academy and accreditation (a centerpiece)

Build an attractive learning portal with course cards, levels, progress bars, skills pathways, and role-based recommendations.

**Actually working sample:** one short SIPES product-application course comprising 3 lessons plus 5 quiz questions. Pass threshold: configurable, default 80%. Save quiz result and issue a **Demo Completion Badge / Demo Accreditation** in the user profile with a shareable preview.

**Show future vision:** basic/advanced painter pathways, installer credentials, refresher modules, technical product certificates, searchable verified professional profiles, and partner incentives. Never label a sample badge as an official SIPES qualification.

### 7.2 SIPES Pro Network

Interactive directory seeded with clearly fictional painters, contractors, architects and designers. Cards show location, specialties, rating placeholder, project portfolio, training badges, and contact-request CTA. Working filters/search. Profile page with sample work gallery and visible Demo markers. Contact requests are stored as demo inquiries only.

**Business logic shown:** training → verified skills → better discovery → customer inquiry → professional engagement → more chances to specify SIPES.

### 7.3 SIPES Rewards and professional wallet

Present separate views for homeowner, architect, contractor, painter, and dealer. Wallets display pending/validated/credited entries and points by *contribution type*, not simply by whoever scans a container first.

Build **one credible interactive attribution demonstration**:
1. A seeded project records an architect's specification.
2. A simulated dealer transaction confirms particular serialized packs.
3. The contractor's procurement entitlement becomes eligible.
4. A painter scans/enters a **demo application token** (manual entry is enough) and claims the painter entitlement.
5. Homeowner purchase recognition is separate.
6. Demonstrate a duplicate claim is rejected, whereas other role entitlements remain unclaimed and unaffected.

Persist demo claim state and event logs. Use separate **reward_entitlements** per contribution and **reward_events** as an append-only history. Use atomic database updates to prevent double claims. No actual monetary balance, voucher issuance, identity verification, payout, or physical serial production.

State future anti-fraud roadmap: serialized per-unit codes, concealed painter token, dealer transaction reconciliation, project attribution, identity checks, anomaly detection, dispute handling, returns clawbacks, and reconciliation with finance.

### 7.4 Dealer and enterprise previews

Dealer portal: seeded order inbox, status updates, coverage areas, stock snapshots, custom tinting requests, and reconciliation dashboard. Interactions update only sample records. Include a demo dealer/color-center search list with location/service filters and clear test-data notices.

Enterprise workspace: example developer project with specification schedule, RFQ, drawing upload area, material comparisons, procurement stages. Blueprint takeoff results come from a *labeled preloaded demonstration*, not a live parser. Architect Studio shows editable mood board, palette and specification sheet preview. WhatsApp AI companion uses a simulated conversation and handoff concept; no WhatsApp API traffic.

### 7.5 Custom orders

Provide a functional-looking custom color request wizard: photo/palette → desired finish/product → volume → destination → contact details → submit **Demo Custom Color Request**. Store request. Display tinting compatibility as illustrative only unless sourced from actual SIPES formula/availability data.

## 8. Recommended technology stack

| Layer | Selection | Why |
|---|---|---|
| Frontend | **Next.js App Router + TypeScript** | Full-stack React, SEO-friendly conventional pages, API routes and server rendering |
| Deployment | **Vercel** | Straightforward Git-based previews, environment variables, serverless functions |
| Styling | **Tailwind CSS + shadcn/ui + Lucide** | Custom, polished, accessible UI without a rigid template appearance |
| Motion | **Motion / Framer Motion** | Polished tool transitions, micro-interactions (respect reduced-motion setting) |
| Forms and validation | **React Hook Form + Zod** | Consistent validated project, estimate, and order forms |
| Database | **Supabase Postgres** | Relational project/order/reward model and integrated backend services |
| Authentication | **Supabase Auth** | Real identity when needed, role-based access via profiles + RLS |
| Image/file storage | **Supabase Storage** | Room uploads, edited renders, course content, project assets |
| AI chat and routing | **OpenAI Responses API with function calling** | Structured tool orchestration, grounded assistant, multimodal inputs |
| AI image editing | **OpenAI Image API** | Actual room recolor edits; configurable model selection |
| Charts | **Recharts** | Prototype commercial intelligence dashboard |
| Analytics | Supabase `activity_events` | Capture attributable user interactions without a separate analytics platform |
| Optional semantic retrieval | Postgres **pgvector** (later) | Search a larger corpus of verified technical sheets if needed |

### Database decision
**Use Supabase, not a separate NoSQL database, for this prototype.** The core domain is relational: projects ↔ participants ↔ products ↔ quotes ↔ orders ↔ serialized items ↔ reward entitlements ↔ courses/accreditation. Postgres transactions and constraints are valuable for reward integrity. Supabase also gives storage, auth and RLS, reducing the number of services Codex needs to integrate. Don't introduce Redis, microservices, vector databases, or separate queues until a specific need exists.

## 9. Proposed data model (build only the required columns)

**Identity and partners:** `profiles`, `organizations`, `organization_members`, `professional_profiles`, `dealers`.

**Catalog:** `products`, `product_categories`, `colors`, `product_color_options`, `product_system_components`, `demo_prices`.

**Projects and sales:** `projects`, `project_participants`, `project_surfaces`, `project_assets`, `estimates`, `estimate_items`, `quotes`, `quote_items`, `order_requests`, `order_items`, `custom_color_requests`.

**AI and experience:** `ai_sessions`, `ai_messages`, `visualizations`, `activity_events`.

**Academy:** `courses`, `lessons`, `quiz_questions`, `course_enrollments`, `quiz_attempts`, `accreditations`.

**Rewards:** `product_serials_demo`, `reward_entitlements`, `reward_events`.

For speed, some catalog relationships may initially be represented by validated JSONB fields. Do **not** collapse transactional rewards and project participant ownership into a single JSON blob. Maintain auditability and foreign keys for those domains.

**Access rules:** public catalog read; private projects/quotes/assets for owner and explicitly linked collaborators; role-scoped dealer and academy access; administrative actions server-only; demo switcher accessible only inside presentation/demo mode; RLS enabled on all browser-exposed tables. Never expose Supabase service-role key or OpenAI key in the browser.

**Storage buckets:** `product-assets` (public approved media), `room-uploads` (private), `visualizations` (private/share-on-demand), `project-documents` (private), `academy-assets` (licensed sample media).

## 10. APIs and AI orchestration

Suggested Next.js server routes / server actions:

- `POST /api/ai/chat` — Responses API conversation + approved tool calls.
- `POST /api/visualizations` and `GET /api/visualizations/:id` — trigger/status/result for room editing.
- `POST /api/projects`, `PATCH /api/projects/:id` — project data.
- `POST /api/estimates` — deterministic calculation and persistence.
- `POST /api/quotes` — create from estimate.
- `POST /api/order-requests` — store demo order request.
- `POST /api/custom-color-requests` — store demo custom request.
- `POST /api/academy/submit-quiz` — grade quiz on server, issue demo badge.
- `POST /api/rewards/demo-claim` — validate entitlement, atomic claim.
- `POST /api/events` — validated analytics events with rate limits.

Use the OpenAI API only from the server. Validate model-proposed tool arguments with Zod and check permissions before executing. Treat the AI as an **interface and decision-support layer**, not a price engine, ERP, or accounting authority. Use strict tool schemas and human confirmation for order submissions.

**Image-edit performance:** resize/compress uploaded images, show generation progress, set timeouts based on current Vercel plan/runtime, and persist outputs to storage. For robustness, implement job states (`queued`, `processing`, `complete`, `failed`) and status polling; a simple initial server execution is acceptable if its duration stays within configured Vercel limits. Prevent duplicate generation requests and cap per-user demo usage.

**Secrets/config:** `OPENAI_API_KEY`, configurable `OPENAI_CHAT_MODEL`, `OPENAI_IMAGE_MODEL`, Supabase URL and publishable key, server-side Supabase secret/service-role key, and `DEMO_MODE=true`. No hardcoded credentials.

## 11. Demo content and presentation readiness

Seed a visually rich but accurate demonstration environment:

- **Products:** approximately 12–20 SIPES SKUs/products sourced from approved official material, including interior finishes, exterior, primer/filler, and decorative options. Product availability, system compatibility and coverage must be tagged **Verified** only when supported by SIPES documentation.
- **Colors:** a curated set of 60–100 named colors from the official color catalogue, with approximate on-screen swatches and an explicit digital-color caveat. Do not represent guessed HEX values as lab-accurate.
- **Images:** 3–5 licensed/presentation-ready architectural room photos plus prebuilt colored variations; 1–2 example user uploads for live AI demo.
- **Pricing:** illustrative EGP price lists clearly marked **Demo prices — not official SIPES quotations**.
- **Projects:** at least 5 fictional projects: apartment renovation, premium villa, commercial building, facade repaint, developer compound.
- **Professionals:** approximately 12 fictional professional listings, including painter and architect profiles; clearly labeled as examples.
- **Academy:** 1 complete mini-course, 5 real quiz questions, 3 fictional upcoming courses, and demo badge.
- **Dealer/rewards:** 3 fictional dealer records, at least 1 linked purchase, 5 roles, demo serials, and contrasting successful/duplicate claims.
- **Dashboard:** real interaction counters plus separate illustrative aggregate sales numbers; label sample data.

Where approved SIPES brand assets are unavailable, use explicit placeholders rather than unofficial-looking logos or false company claims.

## 12. Critical demonstration journeys

### Journey A — Homeowner: inspiration to order
Open homepage → “Visualize my living room” → pick SIPES color → compare room previews → add product to new project → calculate material quantities → see an indicative total → submit demo order request.

### Journey B — Contractor: technical decision to quote
Ask AI for washable paint system for a 150 m² apartment → clarify paintable wall area → choose supported solution → adjust wall measurements/coats → compare product options → save detailed estimate → issue quote → inspect project passport.

### Journey C — Painter: academy to visibility
Switch demo persona to painter → discover Academy → take 3 lessons → pass quiz → see demo accreditation on profile → become searchable in painter network → receive simulated customer inquiry.

### Journey D — Contribution attribution: one sale, many roles
Open a seeded project → inspect architect specification → simulate dealer sale → claim painter-only application token → show claimed painter entitlement, untouched architect/customer entitlements → try duplicate painter claim and see rejection → inspect audit trail.

### Journey E — Management: commercial impact
Open commercial dashboard → inspect demo project funnel and quote status → show popular product families, project pipeline, role engagement, and dealer routing → clearly differentiate *attributed activity* from *incremental revenue*.

## 13. Commercial measurement built into prototype

Track `workspace_opened`, `ai_prompt_submitted`, `product_recommended`, `color_previewed`, `visualization_saved`, `estimate_created`, `quote_created`, `demo_order_submitted`, `academy_course_started`, `academy_badge_earned`, `professional_profile_viewed`, `demo_claim_attempted`, `demo_claim_succeeded`.

Dashboard should demonstrate project creation and quotation conversion, full-system product attachment, conversion by persona, and professional engagement. Do not present assumed market share growth or incremental sales as achieved results. All data must be distinguishable as live prototype event counts vs seeded example metrics.

## 14. Explicit exclusions / deferred production scope

Not included in this prototype: real payments, real purchase fulfillment, live ERP/POS/CRM connections, live dealer stock, real tint formula or mixing-machine control, officially accredited training, verified professional background checks, actual cashback/commission payouts, nation-wide secure printed serialization, real WhatsApp messaging campaigns, actual technical warranties, automated CAD/BIM takeoff, real procurement contracts, production-grade fraud scoring, customer-facing mobile apps, and operational deployment at SIPES.

The architecture should allow future connectors without implementing them now. All order, reward, accreditation, inventory, and price statuses shown during presentation must make the demo nature obvious.

## 15. Build milestones for Codex

**Milestone 1 — Foundation and visual system**  
Next.js app, components/design tokens, language switch/RTL, responsive workspace shell, demo persona switcher, navigation, Supabase connection, database migrations and seed.

**Milestone 2 — Conversion MVP**  
Product/color data, AI copilot tool orchestration, guided advisor, deterministic calculator, project passport, quote and demo order request, visualization instant mode and optional image-edit path.

**Milestone 3 — Ecosystem demonstration**  
Academy + quiz/badge, professional network, custom request wizard, role wallets + atomic mock reward claim, dealer and enterprise previews, management dashboard.

**Milestone 4 — Presentation polish and QA**  
Seed realistic journeys, refine animations and imagery, add empty/loading/error states, exercise all CTAs, test Arabic RTL and mobile, verify secrets/RLS, capture demo screenshots, deploy Vercel Preview/production demo URL.

## 16. Definition of done

- [ ] Usable live deployment on Vercel, connected to Supabase.
- [ ] Premium, coherent visual design with desktop/mobile views and Arabic/English/RTL.
- [ ] Both AI-first workspace and classic navigation work; no dead-end primary actions.
- [ ] At least four complete live/interactively simulated customer journeys succeed without developer intervention.
- [ ] AI uses real OpenAI API, curated product data, schema-validated tools, and never invents official prices/specifications.
- [ ] Calculator produces correct, deterministic recalculations and saves to project.
- [ ] Visualizer changes curated-room wall colors instantly; uploaded-room AI editing works when enabled, with explicit graceful fallback.
- [ ] Project, quote, and demo order request are persisted in Supabase.
- [ ] Academy quiz grades answers and creates a clearly marked demo badge.
- [ ] Painter network search/filter, profile, and demo inquiry flow work.
- [ ] Reward demo rejects duplicate claim while preserving separate role entitlements.
- [ ] Dashboard reports prototype activity and labels sample figures.
- [ ] Demo transactions and credentials are safely isolated; RLS and API key handling checked.
- [ ] Clear `README.md`, `.env.example`, seed/reset scripts, and deployment instructions included.

## 17. Direct Codex implementation mandate

> Build SIPES 360 as a client-ready **interactive product prototype**, not a slide deck, figma-style screenshot, or collection of disconnected pages. Prioritize the end-to-end demonstration flows and premium interface over breadth of backend integrations. Use Next.js + TypeScript + Tailwind + shadcn/ui + Supabase + OpenAI APIs, deploy to Vercel, and implement the scope above. Every visually promised feature should have an intentionally designed screen; only modules marked LIVE MVP need true underlying logic, while interactive demonstrations must be clearly marked. Work milestone by milestone, maintain database migrations, seed deterministic sample content, and test critical journeys. Do not misrepresent demo orders, training badges, reward points, pricing, or inventory as live SIPES operations.

---

**Positioning for SIPES management:** “A connected sales ecosystem that makes SIPES easier to specify, easier to purchase, and more rewarding to recommend—built around the everyday needs of people who create and maintain painted spaces.”
