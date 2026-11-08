import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, Check, Info, MessageCircle } from "lucide-react";
import { AskButton } from "@/components/agent/AskButton";
import { MASCOT } from "@/lib/mascot";
import { brands, group } from "@/data/ubmc";

// SIPES (/sipes) and the Color Center (/stores) have their own sections; the rest live here.
const HERE = brands.filter((b) => b.href === `/brands/${b.slug}`);

export function generateStaticParams() {
  return HERE.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: PageProps<"/brands/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const b = HERE.find((x) => x.slug === slug);
  return b ? { title: b.name, description: b.positioning } : {};
}

export default function BrandPage(props: PageProps<"/brands/[slug]">) {
  return (
    <Suspense fallback={<BrandSkeleton />}>
      <BrandContent params={props.params} />
    </Suspense>
  );
}

async function BrandContent({ params }: Pick<PageProps<"/brands/[slug]">, "params">) {
  const { slug } = await params;
  const b = HERE.find((x) => x.slug === slug);
  if (!b) notFound();
  const others = brands.filter((x) => x.slug !== b.slug);

  return (
    <>
      <section
        className="relative overflow-hidden pb-14 pt-28 text-white sm:pb-20 sm:pt-36"
        style={{ background: `linear-gradient(150deg, ${b.colour}, color-mix(in oklab, ${b.colour} 55%, #0b1026))` }}
      >
        <div className="wrap grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/75">
              <Link href="/brands" className="hover:text-white">
                UBMC Group brands
              </Link>{" "}
              / {b.area}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.3rem,6vw,4.4rem)] font-bold leading-[1] tracking-[-0.04em]">{b.name}</h1>
            <p className="mt-5 max-w-[50ch] text-[18px] leading-relaxed text-white/90">{b.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <AskButton question={`What does ${b.name} offer, and is it right for my project?`} className="hero-mic">
                <MessageCircle size={18} /> Ask {MASCOT.name}
              </AskButton>
              <a href={b.site} target="_blank" rel="noreferrer" className="hero-chip inline-flex items-center gap-1.5">
                Official {b.name} site <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="justify-self-start rounded-[24px] bg-white p-6 md:justify-self-end">
            <Image src={b.logo} alt={b.name} width={326} height={200} className="h-28 w-auto" />
          </div>
        </div>
      </section>

      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">What {b.name} is</p>
          <p className="mt-3 text-[clamp(1.2rem,2.2vw,1.5rem)] leading-snug">{b.positioning}</p>

          <h2 className="mt-12 font-display text-[22px] font-semibold tracking-tight">What it offers</h2>
          <ul className="mt-4 grid gap-3">
            {b.offers.map((o) => (
              <li key={o} className="flex gap-3 rounded-2xl bg-primer px-4 py-3.5 text-[16px]">
                <Check size={18} className="mt-0.5 shrink-0" style={{ color: b.colour }} /> {o}
              </li>
            ))}
          </ul>

          {b.services && (
            <>
              <h2 className="mt-12 font-display text-[22px] font-semibold tracking-tight">Technical services</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {b.services.map((s) => (
                  <li key={s} className="rounded-2xl border border-chalk px-4 py-3.5 text-[15.5px]">
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}

          {b.examples && (
            <>
              <h2 className="mt-12 font-display text-[22px] font-semibold tracking-tight">Product examples</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {b.examples.map((x) => (
                  <li key={x}>
                    <AskButton question={`Tell me about ${b.name} ${x}`} className="chip">
                      {x}
                    </AskButton>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13.5px] text-graphite">
                Examples only, not a full current inventory. Check the official site for the live catalogue.
              </p>
            </>
          )}

          {b.note && (
            <p className="mt-10 flex gap-3 rounded-2xl bg-primer p-4 text-[14.5px] text-graphite">
              <Info size={18} className="mt-0.5 shrink-0" /> {b.note}
            </p>
          )}
        </div>

        <aside className="grid content-start gap-4">
          <div className="rounded-[22px] bg-ink p-6 text-white">
            <p className="eyebrow !text-white/60">Right for</p>
            <p className="mt-2 text-[17px] leading-relaxed">{b.forWho}</p>
          </div>
          <div className="rounded-[22px] bg-primer p-6">
            <p className="eyebrow">Talk to UBMC</p>
            <a href={`tel:${group.hotline}`} className="mt-2 block font-display text-4xl font-bold tracking-tight">
              {group.hotline}
            </a>
            <p className="mt-2 text-[14.5px] text-graphite">Prices, stock and data sheets come from the brand or a UBMC Color Center.</p>
            <Link href="/stores" className="btn-ghost mt-4 bg-white">
              Find a store
            </Link>
          </div>
        </aside>
      </div>

      <section className="border-t border-chalk bg-primer py-14">
        <div className="wrap">
          <p className="eyebrow">More from UBMC Group</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={o.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14.5px] font-medium shadow-[0_0_0_1px_rgb(11_16_38/0.07)]"
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: o.colour }} /> {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function BrandSkeleton() {
  return (
    <div className="animate-pulse">
      <section className="relative overflow-hidden bg-ink/90 pb-14 pt-28 text-white sm:pb-20 sm:pt-36">
        <div className="wrap grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="h-4 w-36 rounded bg-white/20" />
            <div className="mt-4 h-12 w-64 rounded-2xl bg-white/20" />
            <div className="mt-5 h-6 w-96 rounded bg-white/20" />
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="h-11 w-40 rounded-full bg-white/20" />
              <div className="h-11 w-44 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="h-28 w-44 rounded-[24px] bg-white/10 md:justify-self-end" />
        </div>
      </section>
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <div className="h-6 w-32 rounded bg-chalk" />
          <div className="h-16 w-full rounded-2xl bg-primer" />
          <div className="h-16 w-full rounded-2xl bg-primer" />
        </div>
        <div className="h-64 rounded-[22px] bg-primer" />
      </div>
    </div>
  );
}
