import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calculator, MapPin, Palette, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { SipesHero } from "@/components/SipesHero";
import { MASCOT } from "@/lib/mascot";
import { AskButton } from "@/components/agent/AskButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { products, families, familyOf, type FamilyId } from "@/data/products";
import { projects, colourFamilies, news, apps } from "@/data/site";

const FAMILY_PHOTO: Partial<Record<FamilyId, string>> = {
  interior: "/media/interior.jpg",
  exterior: "/media/exterior.jpg",
  woodcare: "/media/woodcare.jpg",
};

const EXAMPLES = [
  { q: "Tell me about Si-Tone Silk", to: "Si-Tone Silk" },
  { q: "My kids draw on the walls. What paint wipes clean?", to: "S70 product page" },
  { q: "How much Si-Shield do I need for a 120 m² facade?", to: "Paint calculator" },
  { q: "Where can I buy SIPES in Alexandria?", to: "Stores & branches" },
  { q: "I want a polished stucco look in the hallway", to: "Effecto Stucco" },
  { q: "Do exterior paints keep the heat out?", to: "FAQ" },
];

export const metadata: Metadata = {
  title: "SIPES — decorative paints by UBMC",
  description: "SIPES, the UBMC Group brand for interior, exterior, decorative and wood-care paints since 1947.",
};

export default function SipesPage() {
  const counts = products.reduce<Record<FamilyId, number>>(
    (acc, p) => ({ ...acc, [familyOf(p)]: (acc[familyOf(p)] ?? 0) + 1 }),
    { interior: 0, exterior: 0, effects: 0, woodcare: 0 },
  );

  return (
    <>
      <SipesHero />

      <section className="wrap py-20 sm:py-28">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The range</p>
              <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                {products.length} products, four kinds of surface.
              </h2>
            </div>
            <Link href="/sipes/products" className="btn-ghost">
              Browse every product <ArrowUpRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-6">
          {(Object.keys(families) as FamilyId[]).map((id, i) => {
            const f = families[id];
            const names = products.filter((p) => familyOf(p) === id).slice(0, 4).map((p) => p.name);
            return (
              <ScrollReveal
                key={id}
                delay={i * 0.08}
                className={i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}
              >
                <Link
                  href={`/sipes/products?family=${id}`}
                  className="group relative isolate flex min-h-[300px] h-full flex-col justify-between overflow-hidden rounded-[22px] p-6 text-white sm:p-8"
                  style={{ background: f.tint }}
                >
                  {FAMILY_PHOTO[id] && (
                    <>
                      <Image
                        src={FAMILY_PHOTO[id]}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 66vw, 100vw"
                        className="-z-0 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(180deg, transparent 20%, ${f.tint} 100%)` }}
                        aria-hidden
                      />
                    </>
                  )}
                  <div className="relative flex items-start justify-between">
                    <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70">
                      {counts[id]} products
                    </span>
                    <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold tracking-[-0.03em]">{f.label}</h3>
                    <p className="mt-1 max-w-[34ch] text-[15.5px] text-white/85">{f.line}</p>
                    <p className="mt-4 text-[13px] text-white/65">{names.join(" · ")}</p>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="bg-primer py-20 sm:py-28 overflow-hidden">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <ScrollReveal>
            <div>
              <p className="eyebrow">Ask {MASCOT.name}</p>
              <h2 className="mt-3 max-w-[15ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Ask it the way you’d ask at the counter.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-graphite">
                {MASCOT.name} knows every SIPES product. Talk or type, and he answers out loud, opens the right product
                page and explains what it’s for. Describe a wall and he picks a paint.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <ul className="grid gap-2">
              {EXAMPLES.map((e) => (
                <li key={e.q}>
                  <AskButton
                    question={e.q}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 text-left shadow-[0_0_0_1px_rgb(11_16_38/0.06)] transition hover:shadow-[0_0_0_1px_var(--tint)]"
                  >
                    <span className="text-[16px] text-ink">“{e.q}”</span>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-graphite group-hover:text-tint">
                      → {e.to}
                    </span>
                  </AskButton>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="wrap py-20 sm:py-28" aria-labelledby="inspiration">
        <ScrollReveal>
          <p className="eyebrow">Inspiration</p>
          <h2 id="inspiration" className="mt-3 max-w-[18ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            See it built, browse it, choose the colour.
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { href: "/sipes/projects", img: "/media/projects.jpg", kicker: "Inspiration", title: "Our projects", text: "Navigate our colonnade and see us in action; achieving quality is our morality." },
            { href: "/sipes/catalogue", img: "/media/catalogue.jpg", kicker: "Inspiration", title: "Products catalogue", text: "Durable, easy-to-apply quality products, all in one catalogue." },
            { href: "/sipes/colours", img: "/media/si-pro.jpg", kicker: "Tools", title: "Mega colours catalogue", text: "With Si-Pro, explore a near-endless list of colours that bring radiance to your home." },
          ].map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.1}>
              <Link href={c.href} className="paint-chip group block h-full">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={c.img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-5">
                  <p className="eyebrow">{c.kicker}</p>
                  <h3 className="mt-1.5 font-display text-[20px] font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-graphite">{c.text}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="wrap py-20 sm:py-28">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <ScrollReveal>
            <div className="relative mx-auto w-full max-w-[480px] lg:max-w-[540px] -rotate-2 overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgb(11_16_38/0.6)] ring-8 ring-white">
              <Image src={MASCOT.poses.van.src} alt={`${MASCOT.name} waving from the red SIPES van`} width={MASCOT.poses.van.width} height={MASCOT.poses.van.height} className="h-auto w-full" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <div>
              <p className="eyebrow">On the road</p>
              <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                {MASCOT.name} knows where SIPES is near you.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-graphite">
                Branches, warehouses and distributors from Alexandria to Luxor. Ask him for the closest one, or call the hotline 19852.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <AskButton question="Where can I buy SIPES near me?" className="btn-tint">Ask {MASCOT.name}</AskButton>
                <Link href="/stores" className="btn-ghost">Stores & branches <ArrowUpRight size={16} /></Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-sipes text-white overflow-hidden">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
          <ScrollReveal>
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70">Loyalty</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em]">SIPES Points</h2>
              <p className="mt-4 max-w-[40ch] text-[18px] text-white/90">Unlock a world of rewards and surprises. Scan the code on eligible SIPES products and redeem your points in the app.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={apps.ios} target="_blank" rel="noreferrer"><Image src="/brand/app-store.png" alt="Download on the App Store" width={1200} height={356} className="h-12 w-auto" /></a>
                <a href={apps.android} target="_blank" rel="noreferrer"><Image src="/brand/google-play.png" alt="Get it on Google Play" width={1280} height={380} className="h-12 w-auto" /></a>
                <Link href="/sipes/loyalty" className="inline-flex items-center rounded-full bg-white/15 px-5 text-[15px] font-semibold ring-1 ring-white/30 hover:bg-white/25">How it works</Link>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[24px] shadow-2xl">
              <Image src="/media/loyalty.jpg" alt="The SIPES Points app" fill sizes="380px" className="object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="wrap py-20 sm:py-28">
        <ScrollReveal>
          <p className="eyebrow">Plan the job</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ToolCard href="/sipes/colours" icon={<Palette />} title="Colour catalogue" text="Five colour families, from Angel whites to Young brights.">
              <div className="mt-5 flex h-8 overflow-hidden rounded-lg">
                {colourFamilies.map((f) => (
                  <span key={f.id} className="flex-1" style={{ background: f.swatches[4].hex }} />
                ))}
              </div>
            </ToolCard>
            <ToolCard href="/sipes/calculator" icon={<Calculator />} title="Paint calculator" text="Litres and recommended pack quantities for two coats, minus doors and windows." />
            <ToolCard href="/stores" icon={<MapPin />} title="Stores & branches" text="Heliopolis store, three factories and warehouses from Alexandria to Luxor." />
            <ToolCard href="/sipes/loyalty" icon={<Sparkles />} title="SIPES Points" text="Scan the code on eligible tins and redeem points for rewards." />
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-primer py-20 sm:py-28" aria-labelledby="news">
        <div className="wrap">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="news" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">News and events</h2>
              <Link href="/sipes/news" className="btn-ghost bg-white">All news <ArrowUpRight size={16} /></Link>
            </div>
          </ScrollReveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {news.map((n, i) => (
              <ScrollReveal key={n.title} delay={i * 0.08}>
                <li className="paint-chip h-full">
                  <div className="relative aspect-[16/10]">
                    <Image src={n.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[17px] font-semibold tracking-tight">{n.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-graphite">{n.text}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-chalk py-20 sm:py-28">
        <div className="wrap">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-[18ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                On hospitals, hotels and the North Coast.
              </h2>
              <Link href="/sipes/projects" className="btn-ghost">
                All projects <ArrowUpRight size={16} />
              </Link>
            </div>
            <ul className="mt-10 divide-y divide-chalk border-y border-chalk">
              {projects.slice(0, 6).map((p) => (
                <li key={p.name} className="grid gap-1 py-5 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center sm:gap-6">
                  <p className="font-display text-[18px] font-semibold tracking-tight">{p.name}</p>
                  <p className="text-[15px] text-graphite">{p.scope}</p>
                  {p.slug ? (
                    <Link href={`/sipes/product/${p.slug}`} className="text-[15px] font-medium underline decoration-chalk underline-offset-4 hover:decoration-tint sm:text-right">
                      {p.product}
                    </Link>
                  ) : (
                    <p className="text-[15px] sm:text-right">{p.product}</p>
                  )}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function ToolCard({
  href,
  icon,
  title,
  text,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href={href} className="group flex flex-col rounded-[22px] bg-primer p-6 transition hover:bg-chalk/60">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-tint">{icon}</span>
      <h3 className="mt-6 font-display text-[19px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-graphite">{text}</p>
      {children}
    </Link>
  );
}
