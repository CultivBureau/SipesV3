import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { products, families, categories, familyOf, type FamilyId, type CategoryId } from "@/data/products";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage(props: PageProps<"/sipes/products">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primer" />}>
      <Listing searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Listing({ searchParams }: Pick<PageProps<"/sipes/products">, "searchParams">) {
  const sp = await searchParams;
  const raw = typeof sp.family === "string" ? sp.family : "";
  const family = raw in families ? (raw as FamilyId) : null;
  const list = family ? products.filter((p) => familyOf(p) === family) : products;
  const groups = (Object.keys(categories) as CategoryId[])
    .map((c) => ({ id: c, ...categories[c], items: list.filter((p) => p.category === c) }))
    .filter((g) => g.items.length);

  return (
    <>
      <PageHeader
        eyebrow={family ? `${families[family].label} · ${list.length} products` : `${products.length} products`}
        title={family ? `${families[family].label} paints` : "Every SIPES product"}
        lead={family ? families[family].line : "Interior emulsions, exterior coatings, decorative effects and wood care. Not sure which one? Ask the bar below."}
      >
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter by family">
          <FilterLink href="/sipes/products" active={!family}>All</FilterLink>
          {(Object.keys(families) as FamilyId[]).map((id) => (
            <FilterLink key={id} href={`/sipes/products?family=${id}`} active={family === id} tint={families[id].tint}>
              {families[id].label}
            </FilterLink>
          ))}
        </nav>
      </PageHeader>

      <div className="wrap py-14">
        {groups.map((g) => (
          <section key={g.id} className="mb-16 last:mb-0" aria-labelledby={`cat-${g.id}`}>
            <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-chalk pb-3">
              <h2 id={`cat-${g.id}`} className="font-display text-2xl font-semibold tracking-tight">{g.label}</h2>
              <p className="text-[15px] text-graphite">{g.blurb}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.items.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function FilterLink({ href, active, tint, children }: { href: string; active: boolean; tint?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14.5px] font-medium transition ${
        active ? "bg-ink text-white" : "bg-white text-ink shadow-[0_0_0_1px_var(--color-chalk)] hover:bg-chalk/50"
      }`}
    >
      {tint && <span className="h-2.5 w-2.5 rounded-full" style={{ background: tint }} />}
      {children}
    </Link>
  );
}
