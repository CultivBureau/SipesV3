"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, ChevronDown, Mic, Square, Volume2, VolumeX, X } from "lucide-react";
import { useAgent } from "./AgentProvider";
import { productBySlug, categories } from "@/data/products";
import { pageSuggestions } from "@/lib/agent-local";
import { MASCOT } from "@/lib/mascot";
import { Mascot, MascotFace, useSpokenWords } from "@/components/mascot/Mascot";

function highlightContent(text: string, currentProductName?: string) {
  if (!text) return null;

  const targets: string[] = [];
  if (currentProductName) targets.push(currentProductName);
  targets.push(
    "19852",
    "interior",
    "exterior",
    "washable",
    "facade",
    "parquet",
    "wood-care",
    "stucco",
    "varnish",
    "alkyd",
    "emulsion",
    "acrylic",
    "two coats"
  );

  const escaped = targets.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(\\*\\*.*?\\*\\*|\\b(?:${escaped.join("|")})\\b)`, "gi");

  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <mark key={i} className="content-highlight">
          {part.slice(2, -2)}
        </mark>
      );
    }
    const isTarget = targets.some((t) => t.toLowerCase() === part.toLowerCase());
    if (isTarget) {
      return (
        <mark key={i} className="content-highlight">
          {part}
        </mark>
      );
    }
    return part;
  });
}

export function AgentDock() {
  const a = useAgent();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [text, setText] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const product = a.answer?.product ? productBySlug(a.answer.product) : null;
  const showPanel = a.open && (a.status === "thinking" || a.answer || a.notice);
  const suggestions = a.answer?.suggestions?.length ? a.answer.suggestions : pageSuggestions(pathname);

  // Input nav bar is hidden on the full-screen hero until the user scrolls, unless on a subpage or an answer is open
  const isVisible = scrolled || pathname !== "/" || Boolean(showPanel);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    void a.ask(text);
    setText("");
  };

  const showSideMascot = Boolean(showPanel) && (pathname !== "/" || scrolled);

  return (
    <>
    <AnimatePresence>
      {showSideMascot && (
        <motion.div
          key="side-mascot"
          className="pointer-events-auto fixed bottom-4 z-50 hidden lg:block"
          style={{ right: "calc(480px + 2.5rem)" }}
          initial={reduce ? false : { x: 80, y: 60, opacity: 0, rotate: 8 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          exit={reduce ? { opacity: 0 } : { x: 60, y: 80, opacity: 0, rotate: 6 }}
          transition={{ type: "spring", stiffness: 170, damping: 17 }}
        >
          <Mascot height="min(420px, 56vh)" onClick={a.listen} />
        </motion.div>
      )}
    </AnimatePresence>
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 flex px-3 pb-3 transition-[justify-content] duration-500 ease-out sm:px-6 sm:pb-5 ${
        showPanel ? "justify-center sm:justify-end" : "justify-center"
      }`}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            layout
            initial={reduce ? false : { opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.96 }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 30 }
            }
            className={`pointer-events-auto w-full transition-[max-width] duration-500 ease-out ${
              showPanel ? "max-w-[760px] sm:max-w-[480px]" : "max-w-[760px]"
            }`}
          >
        <AnimatePresence>
          {showPanel && (
            <motion.section
              key="panel"
              aria-label="SIPES assistant answer"
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="dock-surface mb-2 max-h-[min(64vh,580px)] overflow-y-auto rounded-[28px] p-5 sm:p-6"
            >
              <header className="mb-3 flex items-center gap-3">
                <MascotFace size={42} />
                <div className="min-w-0">
                  <p className="font-display text-[14px] font-semibold tracking-tight text-ink">{MASCOT.name}</p>
                  <p className="truncate text-[12.5px] text-graphite">
                    {a.lastQuestion ? <>You asked: “{a.lastQuestion}”</> : MASCOT.role}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => a.setSpeak(!a.speak)}
                    className={`icon-btn ${a.speak ? "text-[var(--tint)] bg-[var(--tint)]/10" : ""}`}
                    aria-pressed={a.speak}
                    aria-label={a.speak ? "Stop reading answers aloud" : "Read answers aloud"}
                    title={a.speak ? "Sound is ON (reading aloud)" : "Sound is OFF"}
                  >
                    {a.speak ? <Volume2 size={17} /> : <VolumeX size={17} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => a.setOpen(false)}
                    className="icon-btn"
                    aria-label="Collapse answer"
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
              </header>

              <div aria-live="polite">
                {a.status === "thinking" ? (
                  <ThinkingLine />
                ) : a.notice ? (
                  <p className="text-[16.5px] leading-relaxed text-ink">{a.notice}</p>
                ) : (
                  <SpokenReply text={a.answer?.reply ?? ""} productName={product?.name} />
                )}
              </div>

              {a.status !== "thinking" && !a.notice && a.answer?.sources?.length ? (
                <p className="mt-3 truncate font-mono text-[10.5px] uppercase tracking-wider text-graphite/80" title={a.answer.sources.join(" | ")}>
                  Source · {[...new Set(a.answer.sources.map((x) => x.split(" › ").pop()))].slice(0, 2).join(" · ")}
                </p>
              ) : null}

              {a.status !== "thinking" && product && (
                <div className="mt-5 overflow-hidden rounded-2xl border border-chalk bg-primer/30">
                  <div className="flex items-stretch">
                    <div className="w-2.5 shrink-0" style={{ background: product.tint }} aria-hidden />
                    <div className="flex-1 p-4 sm:p-5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                          {product.name}
                        </h3>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-graphite">
                          {categories[product.category].label} · {product.finish ?? product.where}
                        </span>
                      </div>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-graphite">
                        <span className="font-medium text-ink">Used for: </span>
                        {product.uses}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {product.features.map((f) => (
                          <li
                            key={f}
                            className="rounded-full bg-white px-2.5 py-1 text-[12px] font-medium text-ink ring-1 ring-[var(--tint)]/25"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* Available pack sizes - NO PRICES */}
                      <div className="mt-4 border-t border-chalk pt-3">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-graphite mb-1.5">
                          Available pack sizes
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.packs.map((p) => (
                            <span
                              key={p.size}
                              className="rounded-md bg-white border border-[var(--tint)]/30 px-2.5 py-1 font-mono text-[12px] font-bold text-ink shadow-2xs"
                            >
                              {p.size}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {pathname !== `/sipes/product/${product.slug}` && (
                          <Link href={`/sipes/product/${product.slug}`} className="btn-tint text-[13.5px]">
                            Open product page
                          </Link>
                        )}
                        <Link
                          href={`/sipes/calculator?product=${product.slug}`}
                          className="btn-ghost text-[13.5px]"
                        >
                          Calculate quantity
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {a.status !== "thinking" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => a.ask(s)} className="chip text-[13px]">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* The Original Bottom Dock Pill */}
        <form onSubmit={submit} className="dock-surface dock-pill flex items-center gap-2 rounded-full p-2 pl-5">
          <label htmlFor="agent-input" className="sr-only">
            Ask Sami
          </label>
          {a.status === "listening" ? (
            <p className="min-w-0 flex-1 truncate text-[16px] text-ink" aria-live="polite">
              {a.transcript || <span className="text-graphite">Listening…</span>}
            </p>
          ) : (
            <input
              id="agent-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => (a.answer || a.notice) && a.setOpen(true)}
              placeholder={`Ask ${MASCOT.name} about a paint, colour, surface or store`}
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-graphite"
            />
          )}
          {a.answer && !a.open && a.status !== "listening" && (
            <button
              type="button"
              onClick={() => a.setOpen(true)}
              className="hidden rounded-full px-3 py-2 text-[13px] font-medium text-graphite hover:bg-primer sm:block"
            >
              Last answer
            </button>
          )}
          {a.status === "listening" ? (
            <button type="button" onClick={a.cancel} className="icon-btn" aria-label="Cancel listening">
              <X size={18} />
            </button>
          ) : null}
          <button
            type="button"
            onClick={a.listen}
            className={`mic-btn ${a.status === "listening" ? "is-listening" : ""}`}
            aria-label={a.status === "listening" ? "Stop listening" : "Ask by voice"}
          >
            {a.status === "listening" ? <Square size={16} fill="currentColor" /> : <Mic size={19} />}
          </button>
          {a.status !== "listening" && (
            <button
              type="submit"
              disabled={!text.trim()}
              className="send-btn"
              aria-label="Send question"
            >
              <ArrowUp size={19} />
            </button>
          )}
        </form>
      </motion.div>
      )}
    </AnimatePresence>
    </div>
    </>
  );
}

function ThinkingLine() {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="typing-dots" aria-hidden>
        <i /><i /><i />
      </span>
      <p className="text-[17px] text-graphite">{MASCOT.name} is thinking…</p>
    </div>
  );
}

/** The answer appears word by word as the mascot says it. */
function SpokenReply({ text, productName }: { text: string; productName?: string }) {
  const { shown, done } = useSpokenWords(text);
  return (
    <p className="text-[16.5px] leading-relaxed text-ink">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {highlightContent(shown, productName)}
        {!done && <span className="caret" />}
      </span>
    </p>
  );
}
