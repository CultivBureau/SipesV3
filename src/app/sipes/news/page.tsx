import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { news } from "@/data/site";

export const metadata: Metadata = { title: "News and events" };

export default function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="News and events" title="What SIPES has been up to." lead="Workshops, outreach and events from the SIPES team." />
      <div className="wrap grid gap-6 py-14 md:grid-cols-2">
        {news.map((n) => (
          <article key={n.title} className="paint-chip">
            <div className="relative aspect-[16/9]">
              <Image src={n.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="font-display text-[22px] font-semibold tracking-tight">{n.title}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-graphite">{n.text}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
