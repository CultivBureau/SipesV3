"use client";

import { useState } from "react";
import Link from "next/link";
import { colourFamilies } from "@/data/site";
import { products } from "@/data/products";
import { useAgent } from "@/components/agent/AgentProvider";

const TINTABLE = products.filter((p) => /tint/i.test(p.whatItIs) && p.category !== "preparation").slice(0, 6);

// Perceived lightness, so text on a swatch stays readable.
const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
};

export function ColourBrowser() {
  const { setTint } = useAgent();
  const [family, setFamily] = useState(colourFamilies[0].id);
  const [picked, setPicked] = useState(colourFamilies[0].swatches[3]);
  const current = colourFamilies.find((f) => f.id === family)!;

  const choose = (s: { code: string; hex: string }) => {
    setPicked(s);
    if (!isLight(s.hex)) setTint(s.hex);
  };

  return (
    <div className="wrap grid gap-10 py-14 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <div role="tablist" aria-label="Colour families" className="flex flex-wrap gap-2">
          {colourFamilies.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={family === f.id}
              onClick={() => setFamily(f.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[14.5px] font-medium transition ${
                family === f.id ? "bg-ink text-white" : "bg-primer hover:bg-chalk/70"
              }`}
            >
              <span className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ background: f.swatches[5].hex }} />
              {f.label}
            </button>
          ))}
        </div>
        <p className="mt-5 text-[16px] text-graphite">{current.mood}</p>
        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4" role="tabpanel">
          {current.swatches.map((s) => (
            <li key={s.code}>
              <button
                type="button"
                onClick={() => choose(s)}
                aria-pressed={picked.code === s.code}
                className={`paint-chip block w-full text-left ${picked.code === s.code ? "ring-2 ring-ink ring-offset-2" : ""}`}
              >
                <span className="block aspect-square" style={{ background: s.hex }} />
                <span className="block px-3 py-2 font-mono text-[12px]">{s.code}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] leading-relaxed text-graphite">
          Screen colours are approximate. Codes follow the SIPES catalogue families; see the exact shade at a colour centre.
        </p>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <Room wall={picked.hex} />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">{picked.code}</p>
            <p className="font-mono text-[12px] text-graphite">{current.label} family · approx. {picked.hex.toUpperCase()}</p>
          </div>
          <Link href="/sipes/calculator" className="btn-ink">Calculate paint</Link>
        </div>
        <div className="mt-6">
          <p className="eyebrow">Paints tinted to this kind of shade</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TINTABLE.map((p) => (
              <li key={p.slug}>
                <Link href={`/sipes/product/${p.slug}`} className="chip inline-block">{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Room({ wall }: { wall: string }) {
  return (
    <svg viewBox="0 0 600 380" className="w-full overflow-hidden rounded-[22px]" role="img" aria-label="Living room preview with the selected wall colour">
      <rect width="600" height="290" style={{ fill: wall, transition: "fill 500ms" }} />
      <rect y="290" width="600" height="90" fill="#C9B79C" />
      <rect y="282" width="600" height="10" fill="#F5F2EC" />
      <rect x="370" y="60" width="150" height="110" rx="4" fill="#F5F2EC" opacity=".9" />
      <rect x="380" y="70" width="130" height="90" rx="2" fill="#A9C4D6" />
      <rect x="80" y="70" width="90" height="120" rx="3" fill="#2B2F3A" opacity=".85" />
      <rect x="88" y="78" width="74" height="104" fill="#D8B26E" opacity=".75" />
      <rect x="120" y="215" width="300" height="70" rx="18" fill="#3A3F4D" />
      <rect x="105" y="235" width="40" height="55" rx="12" fill="#2E323E" />
      <rect x="395" y="235" width="40" height="55" rx="12" fill="#2E323E" />
      <rect x="140" y="200" width="120" height="40" rx="14" fill="#4A5060" />
      <rect x="280" y="200" width="120" height="40" rx="14" fill="#4A5060" />
      <rect x="470" y="200" width="10" height="85" fill="#6B5B45" />
      <circle cx="475" cy="190" r="34" fill="#4F7A52" />
      <ellipse cx="300" cy="330" rx="170" ry="16" fill="#000" opacity=".08" />
    </svg>
  );
}
