import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { company } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const rows = [
    { icon: <Phone size={18} />, label: "Hotline", value: company.hotline, href: `tel:${company.hotline}` },
    { icon: <Phone size={18} />, label: "Head office", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
    { icon: <Mail size={18} />, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: <Mail size={18} />, label: "Careers", value: company.careersEmail, href: `mailto:${company.careersEmail}` },
    { icon: <Printer size={18} />, label: "Fax", value: company.fax },
    { icon: <MapPin size={18} />, label: "Address", value: company.address },
    { icon: <Clock size={18} />, label: "Hours", value: company.hours },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to SIPES." lead="For product advice, project enquiries and technical support." />
      <div className="wrap grid gap-10 py-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-[24px] bg-tint p-8 text-white">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70">Customer hotline</p>
          <a href={`tel:${company.hotline}`} className="mt-2 block font-display text-[clamp(3.5rem,9vw,6rem)] font-bold leading-none tracking-[-0.04em]">
            {company.hotline}
          </a>
          <p className="mt-4 text-[16px] text-white/85">Local Egyptian hotline. Sunday to Thursday, 09:00–17:00.</p>
        </div>
        <dl className="divide-y divide-chalk border-y border-chalk">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[28px_110px_1fr] items-start gap-3 py-4">
              <span className="mt-0.5 text-tint">{r.icon}</span>
              <dt className="text-[15px] text-graphite">{r.label}</dt>
              <dd className="text-[16px] font-medium">
                {r.href ? <a href={r.href} className="hover:text-tint">{r.value}</a> : r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
