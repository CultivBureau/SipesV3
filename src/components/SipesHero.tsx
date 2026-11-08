import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MASCOT } from "@/lib/mascot";
import { AskButton } from "@/components/agent/AskButton";

/** Header for the SIPES section: the brand inside UBMC Group. */
export function SipesHero() {
  return (
    <section className="hero relative isolate overflow-hidden text-white">
      <div className="hero-grain" aria-hidden />
      <div className="wrap grid items-end gap-8 pt-28 md:grid-cols-[1.3fr_1fr] md:pt-32">
        <div className="pb-14 md:pb-20">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/75">
            <Link href="/brands" className="hover:text-white">UBMC Group</Link> / SIPES
          </p>
          <Image src="/brand/sipes-logo.png" alt="SIPES" width={675} height={414} priority className="mt-5 h-20 w-auto drop-shadow-lg sm:h-24" />
          <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            Decorative paints since 1947.
          </h1>
          <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-white/85">
            SIPES is the UBMC Group brand for interior and exterior paint, decorative effects, wood care and colour.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/sipes/products" className="hero-mic">
              Browse the range <ArrowUpRight size={18} />
            </Link>
            <AskButton question="Which SIPES paint should I use for my living room?" className="hero-chip">
              Ask {MASCOT.name} which paint
            </AskButton>
          </div>
        </div>
        <div className="hidden justify-center self-end md:flex">
          <Image
            src={MASCOT.poses.armsCrossed.src}
            alt={`${MASCOT.name} with arms crossed`}
            width={MASCOT.poses.armsCrossed.width}
            height={MASCOT.poses.armsCrossed.height}
            className="mascot-img h-[min(440px,52svh)] w-auto"
          />
        </div>
      </div>
    </section>
  );
}
