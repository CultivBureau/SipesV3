"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { brand, company } from "@/data/site";

interface Item {
  href: string;
  label: string;
}
interface Group {
  label: string;
  match: string[];
  columns: { title?: string; items: Item[] }[];
}

// Mirrors the menu on ubmcgroup.com/sipes/en/, pointed at this site's pages.
const MENU: Group[] = [
  {
    label: "About",
    match: ["/about", "/sipes/projects", "/sipes/news", "/sipes/faq"],
    columns: [
      {
        items: [
          { href: "/about", label: "About us" },
          { href: "/sipes/projects", label: "Projects" },
          { href: "/sipes/news", label: "News and events" },
          { href: "/sipes/faq", label: "FAQ" },
          { href: "/contact", label: "Careers" },
        ],
      },
    ],
  },
  {
    label: "Inspiration",
    match: ["/sipes/catalogue"],
    columns: [
      {
        items: [
          { href: "/sipes/catalogue", label: "Catalogue" },
          { href: "/sipes/projects", label: "Gallery" },
          { href: "/sipes/colours", label: "Colour catalogue" },
        ],
      },
    ],
  },
  {
    label: "Products",
    match: ["/sipes/products", "/sipes/product/"],
    columns: [
      {
        title: "Interiors",
        items: [
          { href: "/sipes/products?family=interior#cat-emulsions", label: "Emulsions" },
          { href: "/sipes/products?family=interior#cat-alkyds", label: "Alkyds" },
          { href: "/sipes/products?family=interior#cat-varnishes", label: "Varnishes" },
          { href: "/sipes/products?family=effects", label: "Special effects" },
        ],
      },
      { title: "Exteriors", items: [{ href: "/sipes/products?family=exterior", label: "Facade coatings" }] },
      {
        title: "WoodCare",
        items: [
          { href: "/sipes/products?family=woodcare#cat-nitro", label: "Nitro" },
          { href: "/sipes/products?family=woodcare#cat-polyester", label: "Polyester" },
          { href: "/sipes/products?family=woodcare#cat-polyurethane", label: "Polyurethane" },
          { href: "/sipes/products?family=woodcare#cat-wood-stains", label: "Wood stains" },
        ],
      },
    ],
  },
  {
    label: "Tools",
    match: ["/sipes/calculator", "/sipes/colours"],
    columns: [
      {
        items: [
          { href: "/sipes/calculator", label: "Calculator" },
          { href: "/sipes/colours", label: "Colour catalogue" },
          { href: "/sipes/colours", label: "Room colouring" },
        ],
      },
    ],
  },
  {
    label: "Contact",
    match: ["/contact", "/stores"],
    columns: [
      {
        items: [
          { href: "/contact", label: "Head office" },
          { href: "/stores", label: "Branches and stores" },
          { href: "https://ubmcgroup.com/sipes/en/store-locator/", label: "Store locator" },
        ],
      },
    ],
  },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    // Close the mobile menu after navigating.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        overHero ? "bg-transparent text-white" : "border-b border-chalk bg-white/92 text-ink backdrop-blur-md"
      }`}
    >
      <nav className="wrap flex h-[68px] items-center gap-4" aria-label="Main">
        <Link href="/" className="shrink-0" aria-label="SIPES home">
          <Image src={brand.logo} alt="SIPES" width={200} height={96} priority className="h-11 w-auto" />
        </Link>

        <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
          {MENU.map((g) => {
            const active = g.match.some((m) => pathname.startsWith(m));
            return (
              <li key={g.label} className="group relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                    overHero ? "group-hover:bg-white/15" : active ? "bg-primer" : "group-hover:bg-primer"
                  }`}
                >
                  {g.label}
                  <ChevronDown size={14} className="opacity-60 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-2 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="flex gap-8 rounded-2xl bg-white p-5 text-ink shadow-[0_0_0_1px_rgb(11_16_38/0.06),0_24px_50px_-18px_rgb(11_16_38/0.35)]">
                    {g.columns.map((c, i) => (
                      <div key={i} className="min-w-[160px]">
                        {c.title && <p className="eyebrow mb-2">{c.title}</p>}
                        <ul className="grid gap-0.5">
                          {c.items.map((it) => (
                            <li key={it.label}>
                              <MenuLink item={it} className="block whitespace-nowrap rounded-lg px-2.5 py-2 text-[14.5px] hover:bg-primer" />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
          <li>
            <Link
              href="/sipes/loyalty"
              className={`rounded-full px-3.5 py-2 text-[14.5px] font-medium ${overHero ? "hover:bg-white/15" : "hover:bg-primer"}`}
            >
              Loyalty program
            </Link>
          </li>
        </ul>
        <a
          href={`tel:${company.hotline}`}
          className={`hidden rounded-full px-4 py-2 text-[14px] font-semibold lg:inline-flex ${
            overHero ? "bg-white text-ink" : "bg-sipes text-white"
          }`}
        >
          Hotline {company.hotline}
        </a>
        <button
          type="button"
          className="ml-auto grid h-10 w-10 place-items-center rounded-full lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-chalk bg-white pb-28 lg:hidden">
          <div className="wrap grid gap-1 pt-3">
            <Link href="/" className="rounded-xl px-3 py-3 text-[17px] font-medium hover:bg-primer">Home</Link>
            {MENU.map((g) => (
              <details key={g.label} className="group rounded-xl">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-[17px] font-medium hover:bg-primer">
                  {g.label}
                  <ChevronDown size={18} className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid gap-3 px-3 pb-3">
                  {g.columns.map((c, i) => (
                    <div key={i}>
                      {c.title && <p className="eyebrow mb-1 mt-1">{c.title}</p>}
                      {c.items.map((it) => (
                        <MenuLink key={it.label} item={it} className="block rounded-lg px-2 py-2 text-[16px] text-graphite hover:bg-primer" />
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
            <Link href="/sipes/loyalty" className="rounded-xl px-3 py-3 text-[17px] font-medium hover:bg-primer">Loyalty program</Link>
            <a href={`tel:${company.hotline}`} className="mt-2 rounded-xl bg-sipes px-3 py-3 text-center text-[17px] font-semibold text-white">
              Call {company.hotline}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuLink({ item, className }: { item: Item; className: string }) {
  return item.href.startsWith("http") ? (
    <a href={item.href} target="_blank" rel="noreferrer" className={className}>
      {item.label} ↗
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}
