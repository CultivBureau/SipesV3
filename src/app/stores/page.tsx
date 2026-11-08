import type { Metadata } from "next";
import { Phone, Store } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { facilities } from "@/data/site";
import { colorCenters, group } from "@/data/ubmc";

export const metadata: Metadata = { title: "Stores & facilities" };

const TYPES = ["Factory", "Warehouse"] as const;

export default function StoresPage() {
  return (
    <>
      <PageHeader
        eyebrow="UBMC Color Center · Stores & facilities"
        title="Where to find UBMC."
        lead={`UBMC Color Center is the group's own store chain: products from across the UBMC brands and specialists to help you choose. Call ${group.hotline} to check opening hours or find a dealer near you.`}
      />
      <div className="wrap py-14">
        <section className="mb-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">UBMC Color Center stores</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colorCenters.map((c) => (
              <li key={c.name} className="flex flex-col rounded-[20px] bg-ink p-6 text-white">
                <Store size={20} className="text-sipes" />
                <h3 className="mt-3 font-display text-[19px] font-semibold tracking-tight">{c.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-white/75">{c.address}</p>
                <a href={`tel:${c.phone.split(" ")[0]}`} className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold">
                  <Phone size={15} /> {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {TYPES.map((t) => (
          <section key={t} className="mb-14 last:mb-0">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{t === "Factory" ? "Factories" : "Warehouses"}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facilities
                .filter((f) => f.type === t)
                .map((f) => (
                  <li key={f.name} className="flex flex-col rounded-[20px] bg-primer p-6">
                    <p className="eyebrow">{f.city}</p>
                    <h3 className="mt-2 font-display text-[19px] font-semibold tracking-tight">{f.name}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-graphite">{f.place}</p>
                    {f.phone ? (
                      <a href={`tel:${f.phone.replace(/\s/g, "")}`} className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-tint">
                        <Phone size={15} /> {f.phone}
                      </a>
                    ) : (
                      <p className="mt-4 text-[14px] text-graphite">Call the hotline {group.hotline}</p>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <section className="mt-16 rounded-[24px] bg-sipes p-8 text-white sm:p-10">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-tight">Want to sell UBMC brands?</h2>
          <p className="mt-3 max-w-[56ch] text-[16px] text-white/85">
            Distributors and franchise partners apply through the SIPES store locator or the UBMC head office. Each request is reviewed;
            approval isn’t automatic.
          </p>
          <a href="https://ubmcgroup.com/sipes/en/store-locator/" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-ink">
            Open the franchise request
          </a>
        </section>
      </div>
    </>
  );
}
