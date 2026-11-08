import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404 — Not Found"
        title="Page not found"
        lead="The page you requested could not be found. It may have been moved, renamed, or is temporarily unavailable."
      />
      <div className="wrap py-14">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-tint"
          >
            Back to home <ArrowRight size={16} />
          </Link>
          <Link
            href="/sipes/products"
            className="inline-flex items-center gap-2 rounded-full bg-primer px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-chalk/60"
          >
            Browse all products
          </Link>
        </div>
      </div>
    </>
  );
}

