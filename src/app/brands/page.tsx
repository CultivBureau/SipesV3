import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { brands, brandBySlug, solutions } from "@/data/ubmc";

export const metadata: Metadata = {
  title: "Our brands",
  description: "SIPES, SiTech Coatings, Transocean Coatings, PerBuild, Swift Paints and UBMC Color Center.",
};

export default function BrandsPage() {
  return (
    <>
      <PageHeader
        eyebrow="UBMC Group · Brands"
        title="Six brands, each with its own speciality."
        lead="Decorative paints, professional coatings, marine protection, construction chemicals, an economical range and our own stores. Each brand keeps its own products and advice; UBMC brings them together."
      />
      <div className="wrap py-14">
        <ul className="grid gap-5 md:grid-cols-2">
          {brands.map((b) => (
            <li key={b.slug}>
              <Link href={b.href} className="brand-card group" style={{ "--brand": b.colour } as React.CSSProperties}>
                <div className="flex items-start justify-between gap-4">
                  <Image src={b.logo} alt={b.name} width={326} height={200} className="h-16 w-auto object-contain object-left" />
                  <ArrowUpRight className="shrink-0 text-graphite transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: b.colour }}>
                  {b.area}
                </p>
                <h2 className="mt-1.5 font-display text-[22px] font-semibold tracking-tight">{b.name}</h2>
                <p className="mt-2 text-[15.5px] leading-relaxed text-graphite">{b.positioning}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {b.offers.slice(0, 4).map((o) => (
                    <li key={o} className="rounded-full bg-primer px-2.5 py-1 text-[12.5px] text-ink">
                      {o.split(":")[0]}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-16">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-tight">Which brand for which job</h2>
          <dl className="mt-6 divide-y divide-chalk border-y border-chalk">
            {solutions.map((s) => {
              const b = brandBySlug(s.brand)!;
              return (
                <div key={s.need} className="grid gap-1 py-4 sm:grid-cols-[1.4fr_1fr] sm:items-center">
                  <dt className="text-[16px]">{s.need}</dt>
                  <dd className="sm:text-right">
                    <Link href={b.href} className="font-semibold underline decoration-chalk underline-offset-4" style={{ color: b.colour }}>
                      {b.name}
                    </Link>
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      </div>
    </>
  );
}
