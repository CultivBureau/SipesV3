import Image from "next/image";
import Link from "next/link";
import { brands, group } from "@/data/ubmc";
import { families } from "@/data/products";

export function Footer() {
  return (
    <footer>
      <section className="border-t border-chalk bg-white py-12" aria-labelledby="group-brands">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <p id="group-brands" className="eyebrow">The UBMC Group brands</p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {brands
              .filter((b) => b.slug !== "color-center")
              .map((b) => (
                <li key={b.slug}>
                  <Link href={b.href} title={b.name}>
                    <Image src={b.logo} alt={b.name} width={326} height={200} className="h-14 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <div className="bg-ink pb-40 pt-16 text-white/80">
        <div className="wrap grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src={group.logoWhite} alt="UBMC" width={500} height={118} className="h-10 w-auto" />
            <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed">{group.line}</p>
            <a href={`tel:${group.hotline}`} className="mt-6 block font-display text-4xl font-bold text-white">
              {group.hotline}
            </a>
            <p className="eyebrow !text-white/50">Hotline for all UBMC brands</p>
          </div>
          <FooterCol
            title="UBMC Group"
            links={[
              { href: "/about", label: "About UBMC" },
              { href: "/brands", label: "Our brands" },
              { href: "/about#projects", label: "Projects" },
              { href: "/stores", label: "Color Center stores" },
              { href: "/contact", label: "Contact & careers" },
            ]}
          />
          <FooterCol
            title="Brands"
            links={brands.map((b) => ({ href: b.href, label: b.name }))}
          />
          <FooterCol
            title="SIPES"
            links={[
              ...Object.entries(families).map(([id, f]) => ({ href: `/sipes/products?family=${id}`, label: f.label })),
              { href: "/sipes/colours", label: "Colour catalogue" },
              { href: "/sipes/calculator", label: "Paint calculator" },
              { href: "/sipes/loyalty", label: "SIPES Points" },
            ]}
          />
        </div>
        <div className="wrap mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-white/50">
          <p>© {group.legalName}</p>
          <p>{group.address}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow !text-white/50">{title}</p>
      <ul className="mt-4 grid gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-[15px] hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
