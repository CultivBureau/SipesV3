import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, type Product } from "@/data/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/sipes/product/${p.slug}`} className="paint-chip group block">
      <div className="relative flex aspect-[5/3] items-end p-4" style={{ background: p.tint }}>
        <span className="absolute right-3 top-3 font-mono text-[10.5px] uppercase tracking-wider text-white/70">
          {p.where}
        </span>
        <h3 className="font-display text-[19px] font-semibold leading-tight tracking-tight text-white">{p.name}</h3>
      </div>
      <div className="flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate text-[13px] text-graphite">
            {categories[p.category].label}
            {p.finish ? ` · ${p.finish}` : ""}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[14px] leading-snug text-ink">{p.whatItIs}</p>
        </div>
        <div className="shrink-0 text-right">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primer text-graphite transition group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
