import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { brands, figures, group, groupMilestones, groupProjects, principles } from "@/data/ubmc";

export const metadata: Metadata = { title: "About UBMC" };

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About UBMC Group" title="Building materials and chemicals, made in Egypt." lead={group.summary} />

      <section className="wrap grid gap-12 py-16 lg:grid-cols-3">
        {[
          { h: "Who we are", t: `${group.legalName} (UBMC): one group for decorative paint, specialist and protective coatings, construction chemicals and retail advice.` },
          { h: "Vision", t: "To be recognised globally as a sustainable and influential industry participant, while building long-term customer partnerships." },
          { h: "Mission", t: "A first-class customer experience through quality products, service excellence, integrity and pride." },
        ].map((x) => (
          <div key={x.h}>
            <p className="eyebrow">{x.h}</p>
            <p className="mt-3 text-[19px] leading-snug">{x.t}</p>
          </div>
        ))}
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="wrap">
          <p className="eyebrow !text-white/60">Manufacturing, R&amp;D and reach</p>
          <ul className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {figures.map((f) => (
              <li key={f.label}>
                <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.03em]">{f.value}</p>
                <p className="mt-1 text-[15px] text-white/70">{f.label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[70ch] text-[15.5px] leading-relaxed text-white/75">
            An in-house R&amp;D department develops new formulations, backed by quality control and industrial safety standards. UBMC
            supplies customers in Egypt through distribution, facilities and warehouses, and exports across the Middle East and Africa.
            Figures are as published by UBMC.
          </p>
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-tight">What we stand for</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li key={p} className="rounded-[20px] bg-primer p-6">
              <p className="font-mono text-[12px] text-sipes">0{i + 1}</p>
              <p className="mt-3 text-[16px] leading-snug">{p}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-chalk bg-primer py-16">
        <div className="wrap">
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-tight">Milestones</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[20px] bg-chalk sm:grid-cols-2 lg:grid-cols-4">
            {groupMilestones.map((m) => (
              <li key={m.year} className="bg-white p-6">
                <p className="font-display text-3xl font-bold tracking-tight text-sipes">{m.year}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite">{m.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13.5px] text-graphite">1947 marks the SIPES trademark, not necessarily the founding of today’s UBMC company.</p>
        </div>
      </section>

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_1.4fr]" id="projects">
        <div>
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-tight">Selected projects</h2>
          <p className="mt-3 text-[16px] text-graphite">Developments UBMC showcases on its corporate project page.</p>
          <ul className="mt-6 grid gap-2">
            {groupProjects.map((p) => (
              <li key={p} className="rounded-2xl bg-primer px-5 py-4 font-display text-[17px] font-semibold tracking-tight">
                {p}
              </li>
            ))}
          </ul>
          <Link href="/sipes/projects" className="btn-ghost mt-5">SIPES reference projects</Link>
        </div>
        <div>
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-tight">The UBMC family</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link href={b.href} className="flex items-center gap-4 rounded-[18px] bg-primer p-4 transition hover:bg-chalk/60">
                  <Image src={b.logo} alt="" width={326} height={200} className="h-12 w-auto" />
                  <span>
                    <span className="block font-display text-[16px] font-semibold tracking-tight">{b.name}</span>
                    <span className="block text-[13.5px] text-graphite">{b.area}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
