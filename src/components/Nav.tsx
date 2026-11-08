"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { group } from "@/data/ubmc";

interface Item {
  href: string;
  label: string;
}
interface Group {
  label: string;
  match: string[];
  columns: { title?: string; items: Item[] }[];
}

// UBMC Group first; SIPES is one brand inside it with its own sub-section.
const MENU: Group[] = [
  {
    label: "About UBMC",
    match: ["/about", "/contact"],
    columns: [
      {
        items: [
          { href: "/about", label: "Who we are" },
          { href: "/about#projects", label: "Projects" },
          { href: "/contact", label: "Contact" },
          { href: "/contact", label: "Careers" },
        ],
      },
    ],
  },
  {
    label: "Brands",
    match: ["/brands"],
    columns: [
      {
        title: "Paints & coatings",
        items: [
          { href: "/sipes", label: "SIPES" },
          { href: "/brands/sitech", label: "SiTech Coatings" },
          { href: "/brands/transocean", label: "Transocean Coatings" },
          { href: "/brands/swift", label: "Swift Paints" },
        ],
      },
      {
        title: "Building & retail",
        items: [
          { href: "/brands/perbuild", label: "PerBuild" },
          { href: "/stores", label: "UBMC Color Center" },
          { href: "/brands", label: "All brands" },
        ],
      },
    ],
  },
  {
    label: "SIPES",
    match: ["/sipes"],
    columns: [
      {
        title: "Products",
        items: [
          { href: "/sipes", label: "SIPES home" },
          { href: "/sipes/products?family=interior", label: "Interior" },
          { href: "/sipes/products?family=exterior", label: "Exterior" },
          { href: "/sipes/products?family=effects", label: "Special effects" },
          { href: "/sipes/products?family=woodcare", label: "Wood care" },
        ],
      },
      {
        title: "Tools",
        items: [
          { href: "/sipes/colours", label: "Colour catalogue" },
          { href: "/sipes/calculator", label: "Paint calculator" },
          { href: "/sipes/catalogue", label: "Catalogues" },
          { href: "/sipes/loyalty", label: "SIPES Points" },
        ],
      },
      {
        title: "More",
        items: [
          { href: "/sipes/projects", label: "SIPES projects" },
          { href: "/sipes/news", label: "News and events" },
          { href: "/sipes/faq", label: "FAQ" },
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
        <Link href="/" className="shrink-0" aria-label="UBMC Group home">
          <Image src={overHero ? group.logoWhite : group.logo} alt="UBMC" width={500} height={118} priority className="h-8 w-auto sm:h-9" />
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
              href="/stores"
              className={`rounded-full px-3.5 py-2 text-[14.5px] font-medium ${overHero ? "hover:bg-white/15" : "hover:bg-primer"}`}
            >
              Stores
            </Link>
          </li>
        </ul>
        <a
          href={`tel:${group.hotline}`}
          className={`hidden rounded-full px-4 py-2 text-[14px] font-semibold lg:inline-flex ${
            overHero ? "bg-white text-ink" : "bg-sipes text-white"
          }`}
        >
          Hotline {group.hotline}
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
            <Link href="/stores" className="rounded-xl px-3 py-3 text-[17px] font-medium hover:bg-primer">Stores</Link>
            <a href={`tel:${group.hotline}`} className="mt-2 rounded-xl bg-sipes px-3 py-3 text-center text-[17px] font-semibold text-white">
              Call {group.hotline}
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
