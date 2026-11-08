"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { products, productBySlug, categories, type Pack } from "@/data/products";
import { useAgent } from "@/components/agent/AgentProvider";

const DOOR_M2 = 1.9;
const WINDOW_M2 = 1.5;

interface Plan {
  counts: { pack: Pack; n: number }[];
  qty: number;
}

const sizeOf = (p: Pack) => parseFloat(p.size);
const unitOf = (p: Pack) => (p.size.includes("kg") ? "kg" : "L");

// Optimal mix of pack sizes that covers the quantity with minimal waste.
function optimalPlan(packs: Pack[], need: number): Plan | null {
  if (need <= 0) return null;
  const limits = packs.map((p) => Math.ceil(need / sizeOf(p)));
  let best: Plan | null = null;
  const walk = (i: number, counts: number[]) => {
    if (i === packs.length) {
      const qty = counts.reduce((s, n, k) => s + n * sizeOf(packs[k]), 0);
      if (qty + 1e-9 < need) return;
      const totalPacks = counts.reduce((s, n) => s + n, 0);
      if (!best || qty < best.qty || (qty === best.qty && totalPacks < best.counts.reduce((s, c) => s + c.n, 0))) {
        best = { counts: counts.map((n, k) => ({ pack: packs[k], n })).filter((c) => c.n > 0), qty };
      }
      return;
    }
    for (let n = 0; n <= limits[i]; n++) walk(i + 1, [...counts, n]);
  };
  walk(0, []);
  return best;
}

export function Calculator({ initial }: { initial: string }) {
  const { setTint } = useAgent();
  const [slug, setSlug] = useState(initial);
  const [length, setLength] = useState(4);
  const [width, setWidth] = useState(3.5);
  const [height, setHeight] = useState(2.8);
  const [ceiling, setCeiling] = useState(false);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(1);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(10);
  const [waste, setWaste] = useState(10);

  const product = productBySlug(slug) ?? productBySlug("si-tone-700") ?? products[0];
  useEffect(() => setTint(product.tint), [product.tint, setTint]);

  const result = useMemo(() => {
    const walls = 2 * (length + width) * height;
    const gross = walls + (ceiling ? length * width : 0);
    const openings = doors * DOOR_M2 + windows * WINDOW_M2;
    const net = Math.max(0, gross - openings);
    const need = coverage > 0 ? (net * coats) / coverage * (1 + waste / 100) : 0;
    return { walls, gross, openings, net, need, plan: optimalPlan(product.packs, need) };
  }, [length, width, height, ceiling, doors, windows, coats, coverage, waste, product.packs]);

  const unit = unitOf(product.packs[0]);

  return (
    <div className="wrap grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr]">
      <form className="grid content-start gap-8" onSubmit={(e) => e.preventDefault()}>
        <Field label="Paint">
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className="input">
            {Object.entries(categories).map(([id, c]) => (
              <optgroup key={id} label={c.label}>
                {products
                  .filter((p) => p.category === id && !p.packs.some((x) => x.size.includes("ml")))
                  .map((p) => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
              </optgroup>
            ))}
          </select>
        </Field>

        <fieldset className="grid gap-4">
          <legend className="eyebrow mb-3">Room size (metres)</legend>
          <div className="grid grid-cols-3 gap-3">
            <Num label="Length" value={length} onChange={setLength} step={0.1} />
            <Num label="Width" value={width} onChange={setWidth} step={0.1} />
            <Num label="Height" value={height} onChange={setHeight} step={0.1} />
          </div>
          <label className="flex items-center gap-3 text-[15px]">
            <input type="checkbox" checked={ceiling} onChange={(e) => setCeiling(e.target.checked)} className="h-5 w-5 accent-[var(--tint)]" />
            Paint the ceiling too
          </label>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="eyebrow mb-3">Openings</legend>
          <div className="grid grid-cols-2 gap-3">
            <Num label={`Doors (${DOOR_M2} m² each)`} value={doors} onChange={setDoors} step={1} />
            <Num label={`Windows (${WINDOW_M2} m² each)`} value={windows} onChange={setWindows} step={1} />
          </div>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="eyebrow mb-3">Assumptions</legend>
          <div className="grid grid-cols-3 gap-3">
            <Num label="Coats" value={coats} onChange={setCoats} step={1} />
            <Num label={`Coverage (m²/${unit})`} value={coverage} onChange={setCoverage} step={0.5} />
            <Num label="Waste (%)" value={waste} onChange={setWaste} step={1} />
          </div>
          <p className="text-[13.5px] leading-relaxed text-graphite">
            SIPES does not publish one coverage figure for every product, so coverage starts at 10 m² per {unit}. Check the
            data sheet for {product.name} and adjust it; porous or textured walls take more.
          </p>
        </fieldset>
      </form>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-[24px] border border-chalk">
          <div className="p-6 text-white" style={{ background: product.tint }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">You need about</p>
            <p className="mt-1 font-display text-[clamp(2.6rem,6vw,4rem)] font-bold leading-none tracking-[-0.04em]">
              {result.need.toFixed(1)} <span className="text-[0.45em] font-semibold">{unit}</span>
            </p>
            <p className="mt-2 text-[15px] text-white/85">of {product.name} for {coats} coat{coats === 1 ? "" : "s"}</p>
          </div>
          <dl className="grid grid-cols-3 border-b border-chalk text-center">
            <Stat label="Walls" value={`${result.walls.toFixed(1)} m²`} />
            <Stat label="Openings" value={`−${result.openings.toFixed(1)} m²`} />
            <Stat label="To paint" value={`${result.net.toFixed(1)} m²`} />
          </dl>
          <div className="p-6">
            <p className="eyebrow">Recommended pack combination</p>
            {result.plan ? (
              <>
                <ul className="mt-3 grid gap-2">
                  {result.plan.counts.map(({ pack, n }) => (
                    <li key={pack.size} className="flex items-center justify-between rounded-xl bg-primer px-3.5 py-2.5 text-[15px]">
                      <span className="font-medium text-ink">
                        {n} × {pack.size} pack
                      </span>
                      <span className="font-mono text-[12px] uppercase tracking-wider text-graphite">Recommended</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-chalk pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14.5px] text-graphite">Total paint quantity</span>
                    <span className="font-display text-xl font-bold text-ink">{result.plan.qty} {unit}</span>
                  </div>
                  <p className="mt-1 text-[13px] text-graphite">
                    {(result.plan.qty - result.need).toFixed(1)} {unit} spare for touch-ups
                  </p>
                </div>
                <p className="mt-3 text-[13px] text-graphite">Confirm packaging availability and prices at your nearest SIPES branch.</p>
              </>
            ) : (
              <p className="mt-3 text-[15px] text-graphite">Enter a room size above to see packs.</p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/sipes/product/${product.slug}`} className="btn-ghost">About {product.name}</Link>
              <Link href="/stores" className="btn-ink">Find a store</Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="eyebrow">{label}</span>
      {children}
    </label>
  );
}

function Num({ label, value, onChange, step }: { label: string; value: number; onChange: (n: number) => void; step: number }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] text-graphite">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={Number.isNaN(value) ? "" : value}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Math.max(0, parseFloat(e.target.value)))}
        className="input"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-chalk px-2 py-4 last:border-0">
      <dt className="font-mono text-[10.5px] uppercase tracking-wider text-graphite">{label}</dt>
      <dd className="mt-1 text-[15px] font-semibold">{value}</dd>
    </div>
  );
}
