import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Calculator } from "./Calculator";
import { productBySlug } from "@/data/products";

export const metadata: Metadata = { title: "Paint calculator" };

export default function CalculatorPage(props: PageProps<"/sipes/calculator">) {
  return (
    <>
      <PageHeader
        eyebrow="Plan the job"
        title="How much paint do you need?"
        lead="Enter the room, take off doors and windows, and pick a paint. The estimate covers two coats by default and updates as you type."
      />
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <CalculatorFor searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

async function CalculatorFor({ searchParams }: Pick<PageProps<"/sipes/calculator">, "searchParams">) {
  const sp = await searchParams;
  const requested = typeof sp.product === "string" ? sp.product : "";
  const initial = productBySlug(requested)?.slug ?? "si-tone-700";
  return <Calculator key={initial} initial={initial} />;
}
