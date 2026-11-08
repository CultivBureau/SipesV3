import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { catalogues } from "@/data/site";

export const metadata: Metadata = { title: "Catalogues" };

export default function CataloguePage() {
  return (
    <>
      <PageHeader
        eyebrow="Inspiration"
        title="SIPES catalogues."
        lead="Seasonal colour trends, the Si-Pro colour system and product guides. Older catalogues are kept for reference and may list ranges that have changed."
      />
      <div className="wrap grid gap-12 py-14 lg:grid-cols-[1fr_2fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] lg:sticky lg:top-24 lg:self-start">
          <Image src="/media/catalogue.jpg" alt="SIPES products catalogue" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>
        <div className="grid content-start gap-10">
          {catalogues.map((y) => (
            <section key={y.year}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-tint">{y.year}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {y.items.map((c) => (
                  <li key={c.name}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl bg-primer px-5 py-4 text-[16px] font-medium transition hover:bg-chalk/60"
                    >
                      {c.name}
                      <ArrowUpRight size={17} className="text-graphite" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
