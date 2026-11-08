import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "SIPES Points" };

// These steps are a real sequence in the app, so they are numbered.
const STEPS = [
  { t: "Register", d: "Sign up in the SIPES Points app on iOS or Android and verify your phone with a one-time code." },
  { t: "Scratch & scan", d: "Reveal the QR code under the scratch panel on an eligible SIPES product and scan it in the app." },
  { t: "Collect", d: "Points land in your account with each scan." },
  { t: "Redeem", d: "Spend points on discounts or reward items at eligible merchants, and enter periodic prize draws." },
];

export default function LoyaltyPage() {
  return (
    <>
      <PageHeader
        eyebrow="SIPES Points"
        title="Every tin you buy earns something back."
        lead="SIPES Points is the loyalty app for customers and painters. Terms, rewards and redemption rates are set in the app."
      />
      <div className="wrap py-14">
        <ol className="grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="rounded-[22px] bg-primer p-6">
              <span className="font-mono text-[12px] text-graphite">Step {i + 1}</span>
              <h2 className="mt-3 font-display text-[20px] font-semibold tracking-tight">{s.t}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-graphite">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[62ch] rounded-2xl border border-chalk p-5 text-[15px] leading-relaxed text-graphite">
          Never share your national ID or one-time codes in a chat or by email. Enter them only in the official SIPES Points app.
        </p>
      </div>
    </>
  );
}
