import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, Calculator, MapPin, MessageCircle, TriangleAlert } from "lucide-react";
import { AskButton } from "@/components/agent/AskButton";
import { ProductCard } from "@/components/ProductCard";
import { products, productBySlug, categories, families, familyOf } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/sipes/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = productBySlug(slug);
  return p ? { title: p.name, description: `${p.whatItIs} ${p.uses}` } : {};
}

export default function ProductPage(props: PageProps<"/sipes/product/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={props.params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Pick<PageProps<"/sipes/product/[slug]">, "params">) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  const cat = categories[p.category];
  const fam = families[familyOf(p)];
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-28 text-white sm:pb-20 sm:pt-36" style={{ background: p.tint }}>
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
          style={{ background: "white" }}
          aria-hidden
        />
        <div className="wrap relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <nav className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70" aria-label="Breadcrumb">
              <Link href="/sipes/products" className="hover:text-white">Products</Link>
              {" / "}
              <Link href={`/sipes/products?family=${familyOf(p)}`} className="hover:text-white">{fam.label}</Link>
              {" / "}
              <span>{cat.label}</span>
            </nav>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.045em]">
              {p.name}
            </h1>
            <p className="mt-5 max-w-[48ch] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-white/90">{p.whatItIs}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Link href={`/sipes/calculator?product=${p.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-ink">
                <Calculator size={17} /> Calculate quantity
              </Link>
              <Link href="/stores" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-[15px] font-semibold ring-1 ring-white/30 hover:bg-white/25">
                <MapPin size={17} /> Find a store
              </Link>
              <AskButton
                question={`What is ${p.name} used for and what are its features?`}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-[15px] font-semibold ring-1 ring-white/30 hover:bg-white/25"
              >
                <MessageCircle size={17} /> Ask about it
              </AskButton>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/20 ring-1 ring-white/25">
            <Spec label="Finish" value={p.finish ?? "See data sheet"} />
            <Spec label="Where" value={p.where} />
            <Spec label="Range" value={cat.label} />
            <Spec label="Family" value={fam.label} />
          </dl>
        </div>
      </section>

      <div className="wrap grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr] lg:py-20">
        <div className="grid content-start gap-12">
          <section className="rounded-2xl border border-chalk/80 bg-gradient-to-br from-primer/90 via-white to-primer/40 p-6 shadow-xs">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: p.tint }} />
              Primary Application & Uses
            </p>
            <p className="mt-3 max-w-[52ch] text-[clamp(1.2rem,2vw,1.5rem)] font-medium leading-snug text-ink">{p.uses}</p>
          </section>

          <section>
            <p className="eyebrow">Key features & benefits</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-2xl border border-chalk/60 bg-primer p-4 text-[16px] transition-all hover:border-[var(--tint)]/40 hover:bg-white hover:shadow-xs"
                >
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full shadow-xs" style={{ background: p.tint }} />
                  <span className="font-medium text-ink">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {p.tech && (
            <section>
              <p className="eyebrow">Published technical points</p>
              <p className="mt-3 rounded-2xl border border-chalk p-4 font-mono text-[13.5px] leading-relaxed text-ink">{p.tech}</p>
            </section>
          )}

          {p.note && (
            <section className="flex gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-4 text-[15px] leading-relaxed text-ink">
              <TriangleAlert size={19} className="mt-0.5 shrink-0 text-amber-600" />
              <p>
                <span className="font-semibold">Check before you specify. </span>
                {p.note}
              </p>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[22px] border border-chalk bg-white p-6 shadow-xs">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: p.tint }} />
              Available pack sizes
            </p>
            <ul className="mt-4 divide-y divide-chalk">
              {p.packs.map((x) => (
                <li key={x.size} className="flex items-center justify-between py-3">
                  <span className="font-mono text-[14.5px] font-bold text-ink">{x.size}</span>
                  <span className="rounded-full bg-[var(--tint)]/10 px-3 py-0.5 text-[12px] font-semibold text-ink ring-1 ring-[var(--tint)]/25">
                    Available
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] leading-relaxed text-graphite">
              Pack sizes for planning. SIPES branches and distributors give current availability; call 19852.
            </p>
            <a
              href={p.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-between rounded-xl bg-primer px-4 py-3 text-[14.5px] font-medium hover:bg-chalk/60"
            >
              Data sheet on the SIPES site <ArrowUpRight size={16} />
            </a>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-chalk bg-primer py-16">
          <div className="wrap">
            <h2 className="font-display text-2xl font-semibold tracking-tight">More in {cat.label}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <section className="relative overflow-hidden bg-ink/90 pb-14 pt-28 text-white sm:pb-20 sm:pt-36">
        <div className="wrap relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <div className="h-4 w-40 rounded bg-white/20" />
            <div className="mt-4 h-14 w-3/4 max-w-[500px] rounded-2xl bg-white/20" />
            <div className="mt-5 h-6 w-full max-w-[48ch] rounded bg-white/20" />
            <div className="mt-8 flex flex-wrap gap-2">
              <div className="h-11 w-44 rounded-full bg-white/20" />
              <div className="h-11 w-36 rounded-full bg-white/20" />
              <div className="h-11 w-36 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/20">
            <div className="h-20 bg-white/10" />
            <div className="h-20 bg-white/10" />
            <div className="h-20 bg-white/10" />
            <div className="h-20 bg-white/10" />
          </div>
        </div>
      </section>

      <div className="wrap grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr] lg:py-20">
        <div className="grid content-start gap-12">
          <div>
            <div className="h-4 w-24 rounded bg-chalk" />
            <div className="mt-3 h-8 w-3/4 rounded-xl bg-chalk/60" />
          </div>
          <div>
            <div className="h-4 w-36 rounded bg-chalk" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="h-16 rounded-2xl bg-primer" />
              <div className="h-16 rounded-2xl bg-primer" />
              <div className="h-16 rounded-2xl bg-primer" />
              <div className="h-16 rounded-2xl bg-primer" />
            </div>
          </div>
        </div>
        <div className="h-80 rounded-[22px] border border-chalk bg-primer" />
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 p-4 backdrop-blur-sm">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/65">{label}</dt>
      <dd className="mt-1 text-[16px] font-semibold">{value}</dd>
    </div>
  );
}
