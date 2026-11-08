import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { projects } from "@/data/site";
import { productBySlug } from "@/data/products";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${projects.length} reference projects`}
        title="Buildings finished with SIPES."
        lead="Hospitals, hotels, schools and coastal compounds across Egypt, with the coating used on each. Some projects use specialist products from SIPES' sister brand SiTECH."
      />
      <div className="wrap grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const prod = p.slug ? productBySlug(p.slug) : null;
          const tint = prod?.tint ?? "#0B1026";
          return (
            <article key={p.name} className="paint-chip flex flex-col">
              <div className="flex aspect-[16/9] items-end p-5" style={{ background: `linear-gradient(160deg, ${tint}, color-mix(in oklab, ${tint} 70%, black))` }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/75">{p.scope}</p>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-[19px] font-semibold tracking-tight">{p.name}</h2>
                <p className="mt-1 flex-1 text-[15px] text-graphite">Coating: {p.product}</p>
                {prod && (
                  <Link href={`/sipes/product/${prod.slug}`} className="mt-4 text-[14.5px] font-semibold text-tint hover:underline">
                    See {prod.name} →
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
