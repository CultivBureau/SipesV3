import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { facilities, company } from "@/data/site";

export const metadata: Metadata = { title: "Stores & branches" };

const TYPES = ["Store & office", "Factory", "Warehouse"] as const;

export default function StoresPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stores & branches"
        title="Where to find SIPES."
        lead={`SIPES sells through its own store, colour centres and a wide network of retailers. Call ${company.hotline} to find the retailer nearest you, or visit one of the locations below.`}
      />
      <div className="wrap py-14">
        {TYPES.map((t) => (
          <section key={t} className="mb-14 last:mb-0">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{t === "Factory" ? "Factories" : t === "Warehouse" ? "Warehouses" : t}</h2>
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
                      <p className="mt-4 text-[14px] text-graphite">Call the hotline {company.hotline}</p>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        ))}
        <section className="mt-16 rounded-[24px] bg-ink p-8 text-white sm:p-10">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-tight">Want to sell SIPES?</h2>
          <p className="mt-3 max-w-[56ch] text-[16px] text-white/80">
            Distributors and franchise partners apply through the SIPES store locator or the head office. Each request is reviewed; approval isn’t automatic.
          </p>
          <a href="https://ubmcgroup.com/sipes/en/store-locator/" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-ink">
            Open the franchise request
          </a>
        </section>
      </div>
    </>
  );
}
