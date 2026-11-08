import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import Image from "next/image";
import { milestones, company, groupBrands, brand } from "@/data/site";

export const metadata: Metadata = { title: "About SIPES" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SIPES"
        title="Making paint for the region since 1947."
        lead={`SIPES makes paints and coatings for homeowners, painters, architects and contractors, and exports across the MENA region. It is part of ${company.group}, which runs three factories in Egypt.`}
      />

      <section className="wrap grid gap-12 py-16 lg:grid-cols-3">
        {[
          { h: "Strategy", t: "Follow what customers actually need, and adapt premium products to practical jobs." },
          { h: "Vision", t: "A significant international presence in paints and coatings, with care for ecological balance and quality." },
          { h: "Mission", t: "Use technology, efficient operations and R&D to develop coatings that solve real customer problems." },
        ].map((x) => (
          <div key={x.h}>
            <p className="eyebrow">{x.h}</p>
            <p className="mt-3 text-[19px] leading-snug">{x.t}</p>
          </div>
        ))}
      </section>

      <section className="border-y border-chalk bg-primer py-16">
        <div className="wrap">
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-tight">Group milestones</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[20px] bg-chalk sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <li key={m.year} className="bg-white p-6">
                <p className="font-display text-3xl font-bold tracking-tight text-tint">{m.year}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-tight">The UBMC family</h2>
        <p className="mt-3 max-w-[60ch] text-[16px] text-graphite">Brands with overlapping but separate specialities. This site covers SIPES products only.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groupBrands.map((b) => (
            <li key={b.name} className="flex flex-col rounded-[20px] bg-primer p-6">
              <Image src={b.logo} alt={b.name} width={326} height={200} className="h-20 w-auto self-start" />
              <h3 className="mt-3 font-display text-[18px] font-semibold tracking-tight">{b.name}</h3>
              <p className="mt-2 text-[15px] text-graphite">{b.text}</p>
            </li>
          ))}
          <li className="flex flex-col justify-center rounded-[20px] bg-ink p-6 text-white">
            <Image src={brand.ubmcLogoWhite} alt="UBMC" width={500} height={118} className="h-10 w-auto self-start" />
            <p className="mt-4 text-[15px] text-white/75">Plus the UBMC Color Center for colour selection and tinting.</p>
          </li>
        </ul>
      </section>
    </>
  );
}
