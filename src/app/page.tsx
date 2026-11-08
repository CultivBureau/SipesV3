import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { MascotHero } from "@/components/mascot/MascotHero";
import { AskButton } from "@/components/agent/AskButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MASCOT } from "@/lib/mascot";
import { brands, brandBySlug, colorCenters, figures, group, groupMilestones, groupProjects, solutions } from "@/data/ubmc";
import { products } from "@/data/products";

const EXAMPLES = [
  { q: "What does UBMC stand for?", to: "About UBMC" },
  { q: "I need waterproofing for a basement", to: "PerBuild" },
  { q: "Antifouling for a fishing boat", to: "Transocean" },
  { q: "Epoxy floor for a warehouse", to: "SiTech" },
  { q: "A cheap ceiling paint", to: "Swift Paints" },
  { q: "Tell me about Si-Tone Silk", to: "SIPES product" },
];

export default function Home() {
  const sipes = brandBySlug("sipes")!;
  return (
    <>
      <MascotHero />

      {/* Group in numbers */}
      <section className="border-b border-chalk bg-white">
        <ul className="wrap grid grid-cols-2 gap-px py-10 sm:grid-cols-3 lg:grid-cols-6">
          {figures.map((f) => (
            <li key={f.label} className="px-2 py-3">
              <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.03em] text-ink">{f.value}</p>
              <p className="mt-1 text-[13.5px] leading-snug text-graphite">{f.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Brands */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="brands">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">One group, six brands</p>
              <h2 id="brands" className="mt-3 max-w-[18ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                From a living-room wall to a ship’s hull.
              </h2>
              <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-graphite">{group.summary}</p>
            </div>
            <Link href="/brands" className="btn-ghost">
              All brands <ArrowUpRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => (
            <ScrollReveal key={b.slug} delay={i * 0.06}>
              <li className="h-full">
                <Link href={b.href} className="brand-card group" style={{ "--brand": b.colour } as React.CSSProperties}>
                  <div className="flex items-start justify-between gap-4">
                    <Image src={b.logo} alt={b.name} width={326} height={200} className="h-16 w-auto object-contain object-left" />
                    <ArrowUpRight className="shrink-0 text-graphite transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: b.colour }}>
                    {b.area}
                  </p>
                  <h3 className="mt-1.5 font-display text-[21px] font-semibold tracking-tight">{b.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite">{b.tagline}</p>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* Which brand for which job */}
      <section className="bg-primer py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <ScrollReveal>
            <div>
              <p className="eyebrow">Which brand do I need?</p>
              <h2 className="mt-3 max-w-[15ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Start with the job, not the brand.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-graphite">
                Not sure where your project belongs? Tell {MASCOT.name} what you’re working on and he’ll point you to the right brand
                and product.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ul className="divide-y divide-chalk overflow-hidden rounded-[22px] bg-white shadow-[0_0_0_1px_rgb(11_16_38/0.06)]">
              {solutions.map((s) => {
                const b = brandBySlug(s.brand)!;
                return (
                  <li key={s.need}>
                    <Link href={b.href} className="group flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-primer/60">
                      <span className="text-[16px] text-ink">{s.need}</span>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-graphite group-hover:text-ink">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.colour }} />
                        {b.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* SIPES, the flagship brand */}
      <section className="bg-sipes text-white overflow-hidden">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
          <ScrollReveal>
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70">Our oldest brand · since 1947</p>
              <Image src="/brand/sipes-logo.png" alt="SIPES" width={675} height={414} className="mt-4 h-20 w-auto drop-shadow-lg" />
              <p className="mt-5 max-w-[44ch] text-[18px] text-white/90">{sipes.positioning}</p>
              <p className="mt-3 text-[15px] text-white/75">
                {products.length} products across interior, exterior, special effects and wood care, plus colour tools, a paint
                calculator and SIPES Points.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/sipes" className="hero-mic">
                  Explore SIPES <ArrowUpRight size={18} />
                </Link>
                <Link href="/sipes/products" className="hero-chip">Browse products</Link>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="relative mx-auto w-full max-w-[480px] lg:max-w-[540px] rotate-2 overflow-hidden rounded-[28px] ring-8 ring-white/90 shadow-2xl">
              <Image src={MASCOT.poses.van.src} alt={`${MASCOT.name} waving from the red SIPES van`} width={MASCOT.poses.van.width} height={MASCOT.poses.van.height} className="h-auto w-full" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ask Mr. SIPES */}
      <section className="wrap py-20 sm:py-28 overflow-hidden">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <ScrollReveal>
            <div>
              <p className="eyebrow">Meet {MASCOT.name}</p>
              <h2 className="mt-3 max-w-[15ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                One guide for the whole group.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-graphite">
                {MASCOT.name} has read up on every UBMC brand. Talk or type: he answers out loud, takes you to the right brand
                or product, and tells you honestly when something is better checked with a specialist.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <ul className="grid gap-2">
              {EXAMPLES.map((e) => (
                <li key={e.q}>
                  <AskButton
                    question={e.q}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-primer px-5 py-4 text-left transition hover:shadow-[0_0_0_1px_var(--tint)]"
                  >
                    <span className="text-[16px] text-ink">“{e.q}”</span>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-graphite group-hover:text-tint">→ {e.to}</span>
                  </AskButton>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* History + projects */}
      <section className="border-y border-chalk bg-primer py-20 sm:py-28">
        <div className="wrap">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-[18ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Building on more than 75 years.
              </h2>
              <Link href="/about" className="btn-ghost bg-white">About UBMC <ArrowUpRight size={16} /></Link>
            </div>
          </ScrollReveal>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[20px] bg-chalk sm:grid-cols-2 lg:grid-cols-4">
            {groupMilestones.map((m) => (
              <li key={m.year} className="bg-white p-6">
                <p className="font-display text-3xl font-bold tracking-tight text-sipes">{m.year}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite">{m.text}</p>
              </li>
            ))}
            <li className="bg-ink p-6 text-white">
              <p className="eyebrow !text-white/60">Selected projects</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85">{groupProjects.join(" · ")}</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Stores */}
      <section className="wrap py-20 sm:py-28">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">UBMC Color Center</p>
              <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                See it, ask about it, take it home.
              </h2>
            </div>
            <Link href="/stores" className="btn-ghost">Stores & facilities <ArrowUpRight size={16} /></Link>
          </div>
        </ScrollReveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colorCenters.map((c) => (
            <li key={c.name} className="flex flex-col rounded-[20px] bg-primer p-6">
              <MapPin size={18} className="text-sipes" />
              <h3 className="mt-3 font-display text-[18px] font-semibold tracking-tight">{c.name}</h3>
              <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-graphite">{c.address}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-[14.5px] font-semibold">
                <Phone size={14} /> {c.phone}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
