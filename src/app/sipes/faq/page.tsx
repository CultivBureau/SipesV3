import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { faqs } from "@/data/site";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="What customers ask most."
        lead="Can't find your question? Ask the bar at the bottom of the page."
      />
      <div className="wrap max-w-[880px] py-14">
        <ul className="divide-y divide-chalk border-y border-chalk">
          {faqs.map((f) => (
            <li key={f.id}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-medium">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primer text-xl transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-graphite">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
