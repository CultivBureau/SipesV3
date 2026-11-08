import Image from "next/image";
import Link from "next/link";
import { apps, brand, company, groupBrands, socials } from "@/data/site";
import { families } from "@/data/products";

export function Footer() {
  return (
    <footer>
      <section className="border-t border-chalk bg-white py-12" aria-labelledby="group-brands">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div className="flex items-center gap-4">
            <Image src={brand.ubmcLogo} alt="UBMC" width={500} height={118} className="h-9 w-auto" />
            <p id="group-brands" className="max-w-[22ch] text-[13.5px] leading-snug text-graphite">
              SIPES is a brand of Universal Building Materials &amp; Chemicals
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {groupBrands.map((b) => (
              <li key={b.name}>
                <a href={b.href} target={b.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" title={b.name}>
                  <Image src={b.logo} alt={b.name} width={326} height={200} className="h-14 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-ink pb-40 pt-16 text-white/80">
        <div className="wrap grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src={brand.logo} alt="SIPES" width={200} height={96} className="h-14 w-auto" />
            <p className="mt-4 max-w-[32ch] text-[15px] leading-relaxed">
              Paints and coatings for homes, facades and woodwork since 1947.
            </p>
            <a href={`tel:${company.hotline}`} className="mt-6 block font-display text-4xl font-bold text-white">
              {company.hotline}
            </a>
            <p className="eyebrow !text-white/50">Hotline</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={apps.ios} target="_blank" rel="noreferrer" aria-label="SIPES Points on the App Store">
                <Image src="/brand/app-store.png" alt="Download on the App Store" width={1200} height={356} className="h-10 w-auto" />
              </a>
              <a href={apps.android} target="_blank" rel="noreferrer" aria-label="SIPES Points on Google Play">
                <Image src="/brand/google-play.png" alt="Get it on Google Play" width={1280} height={380} className="h-10 w-auto" />
              </a>
            </div>
          </div>
          <FooterCol
            title="Products"
            links={[
              ...Object.entries(families).map(([id, f]) => ({ href: `/sipes/products?family=${id}`, label: f.label })),
              { href: "/sipes/products", label: "All products" },
            ]}
          />
          <FooterCol
            title="Quick links"
            links={[
              { href: "/about", label: "About us" },
              { href: "/contact", label: "Careers" },
              { href: "/sipes/catalogue", label: "Catalogues" },
              { href: "/sipes/colours", label: "Room colouring" },
              { href: "/sipes/projects", label: "Projects" },
              { href: "/sipes/news", label: "News and events" },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { href: "/contact", label: "Head office" },
              { href: "/stores", label: "Branches and stores" },
              { href: "/sipes/calculator", label: "Paint calculator" },
              { href: "/sipes/loyalty", label: "SIPES Points" },
              { href: "/sipes/faq", label: "FAQ" },
            ]}
          />
        </div>
        <div className="wrap mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-white/50">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>{company.address}</p>
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
