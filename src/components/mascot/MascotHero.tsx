"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Mic, Square } from "lucide-react";
import { useAgent } from "@/components/agent/AgentProvider";
import { MASCOT } from "@/lib/mascot";
import { Mascot, useMascotAct, useSpokenWords } from "./Mascot";

const STARTERS = [
  "Which UBMC brand does waterproofing?",
  "Coatings for a ship hull",
  "Washable paint for a kids' room",
  "Where is the nearest Color Center?",
];

const GREETING = `Hi, I'm ${MASCOT.name}, ${MASCOT.role}. From SIPES paints to marine coatings, waterproofing and our Color Center stores, ask me anything and I'll take you to the right brand.`;

export function MascotHero() {
  const a = useAgent();
  const act = useMascotAct();
  const reduce = useReducedMotion();
  const busy = a.status === "listening" || a.status === "thinking";

  const line =
    a.status === "listening"
      ? a.transcript || "I'm listening… tell me about your project."
      : a.status === "thinking"
        ? "Hmm, let me think about that…"
        : a.notice ?? a.answer?.reply ?? GREETING;

  return (
    <section className="hero hero-ubmc relative isolate overflow-hidden text-white">
      <div className="hero-grain" aria-hidden />
      <div className="hero-splash" aria-hidden />

      <div className="wrap relative grid min-h-[100svh] grid-cols-1 items-end gap-6 pt-24 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:pt-16">
        {/* The mascot stands on the stage at the bottom of the hero. */}
        <motion.div
          className="order-2 flex justify-center md:order-1 md:self-end"
          initial={reduce ? false : { y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.15 }}
        >
          <Mascot
            height="clamp(330px, 64svh, 660px)"
            className="mascot-hero"
            priority
            onClick={a.listen}
          />
        </motion.div>

        <div className="order-1 md:order-2 md:pb-10">
          <motion.p
            className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/75"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            UBMC Group · Ask {MASCOT.name}
          </motion.p>

          <SpeechBubble text={line} act={act} live={a.status !== "listening"} />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={a.listen}
              className={`hero-mic ${a.status === "listening" ? "is-listening" : ""}`}
              aria-label={a.status === "listening" ? "Stop listening" : `Ask ${MASCOT.name} by voice`}
            >
              {a.status === "listening" ? <Square size={18} fill="currentColor" /> : <Mic size={22} />}
              <span>{a.status === "listening" ? "Stop" : `Talk to ${MASCOT.name}`}</span>
            </button>
            {busy && (
              <button type="button" onClick={a.cancel} className="hero-chip">
                Cancel
              </button>
            )}
          </div>

          <div className="mt-5 flex min-h-[48px] flex-wrap gap-2">
            {!busy &&
              (a.answer?.suggestions?.length ? a.answer.suggestions : STARTERS).map((s) => (
                <button key={s} type="button" onClick={() => a.ask(s)} className="hero-chip">
                  {s}
                </button>
              ))}
          </div>

          {!a.voiceSupported && !busy && (
            <p className="mt-3 text-xs text-white/70">Voice works in Chrome and Edge. Everywhere else, type in the bar below.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function SpeechBubble({ text, act, live }: { text: string; act: string; live: boolean }) {
  const { shown, done } = useSpokenWords(text);
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={act === "thinking" ? "thinking" : text}
        className={`speech-bubble mt-4 act-${act}`}
        initial={reduce ? false : { opacity: 0, scale: 0.92, y: 12, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        aria-live={live ? "polite" : "off"}
      >
        <p className="font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-semibold leading-snug tracking-[-0.015em] text-ink">
          {act === "thinking" ? (
            <span className="inline-flex items-center gap-3">
              {text}
              <span className="typing-dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
            </span>
          ) : (
            <>
              {/* Full text is always in the DOM for screen readers; the visible part follows the voice. */}
              <span className="sr-only">{text}</span>
              <span aria-hidden>
                {shown}
                {!done && <span className="caret" />}
              </span>
            </>
          )}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
