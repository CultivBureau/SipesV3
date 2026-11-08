export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-chalk bg-primer pb-12 pt-28 sm:pb-16 sm:pt-36">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(2.1rem,5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.035em]">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-graphite">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
