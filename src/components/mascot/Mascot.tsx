"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useAgent } from "@/components/agent/AgentProvider";
import { MASCOT } from "@/lib/mascot";

export type MascotAct = "idle" | "listening" | "thinking" | "talking" | "excited" | "sorry";

/** What the mascot should be doing right now, from the assistant state. */
export function useMascotAct(): MascotAct {
  const a = useAgent();
  if (a.status === "listening") return "listening";
  if (a.status === "thinking") return "thinking";
  if (a.speaking) {
    if (a.answer?.mood === "excited") return "excited";
    if (a.answer?.mood === "sorry") return "sorry";
    return "talking";
  }
  return "idle";
}

const { standing, armsCrossed } = MASCOT.poses;

/**
 * The full-body SIPES technician. Pose images swap with the act; the body
 * breathes, sways, leans in to listen, crosses his arms to think and bobs on
 * every spoken word.
 */
export function Mascot({
  height = 520,
  className = "",
  priority = false,
  onClick,
}: {
  /** Any CSS length, e.g. 420 or "clamp(340px, 60svh, 640px)". */
  height?: number | string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  const act = useMascotAct();
  const { wordTick } = useAgent();
  const reduce = useReducedMotion();
  const bob = useAnimationControls();

  // One little bounce per spoken word, alternating the tilt so it reads as speech.
  useEffect(() => {
    if (reduce || (act !== "talking" && act !== "excited" && act !== "sorry")) return;
    const dir = wordTick % 2 ? 1 : -1;
    const lift = act === "excited" ? -14 : act === "sorry" ? -3 : -7;
    void bob.start({
      y: [0, lift, 0],
      rotate: [0, dir * (act === "excited" ? 2.2 : 1.1), 0],
      scaleY: [1, 1.012, 0.995, 1],
      transition: { duration: 0.26, ease: "easeOut" },
    });
  }, [wordTick, act, bob, reduce]);

  const crossed = act === "thinking" || act === "sorry";
  const pose = crossed ? armsCrossed : standing;
  const h = typeof height === "number" ? `${height}px` : height;

  const body = reduce
    ? {}
    : act === "idle"
      ? { rotate: [0, 1.2, 0, -1.2, 0], y: [0, -4, 0, -4, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } }
      : act === "listening"
        ? { rotate: -3.5, scale: 1.04, y: -6, transition: { type: "spring" as const, stiffness: 200, damping: 14 } }
        : act === "thinking"
          ? { rotate: [-2, 2.5, -2], y: [0, -3, 0], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const } }
          : { rotate: 0, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 18 } };

  return (
    <div
      className={`mascot relative isolate select-none ${className}`}
      style={{ "--mh": h, height: "var(--mh)", width: `calc(var(--mh) * ${(standing.width / standing.height).toFixed(4)})` } as React.CSSProperties}
      data-act={act}
    >
      {/* Ground shadow squashes when he bobs. */}
      <motion.span
        aria-hidden
        className="mascot-shadow"
        animate={reduce ? {} : act === "idle" ? { scaleX: [1, 0.94, 1, 0.94, 1] } : { scaleX: 1 }}
        transition={{ duration: 6, repeat: act === "idle" ? Infinity : 0, ease: "easeInOut" }}
      />

      {act === "listening" && (
        <span className="mascot-ears" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      )}

      <AnimatePresence>
        {act === "thinking" && <ThoughtBubble key="thought" />}
        {act === "excited" && <PaintBurst key="burst" />}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        aria-label={onClick ? `Talk to ${MASCOT.name}` : undefined}
        className="absolute inset-x-0 bottom-0 flex justify-center outline-none enabled:cursor-pointer"
        style={{ transformOrigin: "50% 100%" }}
        animate={body}
        whileHover={onClick && !reduce ? { scale: 1.02 } : undefined}
        whileTap={onClick && !reduce ? { scale: 0.97 } : undefined}
      >
        <motion.span animate={bob} className="block" style={{ transformOrigin: "50% 100%" }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={pose.src}
              className="block"
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Image
                src={pose.src}
                alt={`${MASCOT.name}, ${MASCOT.role}`}
                width={pose.width}
                height={pose.height}
                priority={priority}
                draggable={false}
                // The bust pose is cropped at the waist, so it renders shorter.
                style={{ height: crossed ? "calc(var(--mh) * 0.66)" : "var(--mh)", width: "auto" }}
                className="mascot-img"
              />
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </motion.button>

      {(act === "talking" || act === "excited") && <VoiceBars />}
    </div>
  );
}

function ThoughtBubble() {
  return (
    <motion.div
      aria-hidden
      className="mascot-thought"
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
    >
      <span className="dot-s" />
      <span className="dot-m" />
      <span className="cloud">
        <i />
        <i />
        <i />
      </span>
    </motion.div>
  );
}

const DROPS = ["#E2231A", "#1F2A6B", "#F5B400", "#14A38B", "#E2231A", "#7C4DFF", "#F5B400", "#1F2A6B"];

function PaintBurst() {
  return (
    <div aria-hidden className="mascot-burst">
      {DROPS.map((c, i) => {
        const ang = (i / DROPS.length) * Math.PI * 2;
        return (
          <motion.i
            key={i}
            style={{ background: c }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x: Math.cos(ang) * 120, y: Math.sin(ang) * 90 - 30, scale: [0, 1.2, 0.9], opacity: [1, 1, 0] }}
            transition={{ duration: 1.1, ease: "easeOut", delay: i * 0.02 }}
          />
        );
      })}
    </div>
  );
}

function VoiceBars() {
  return (
    <span aria-hidden className="mascot-voice">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

/** Round face avatar for the chat panel; nods while talking, tilts while thinking. */
export function MascotFace({ size = 44 }: { size?: number }) {
  const act = useMascotAct();
  const { wordTick } = useAgent();
  const reduce = useReducedMotion();
  const nod = useAnimationControls();

  useEffect(() => {
    if (reduce || act === "idle" || act === "thinking" || act === "listening") return;
    void nod.start({ y: [0, -3, 0], rotate: [0, wordTick % 2 ? 4 : -4, 0], transition: { duration: 0.24 } });
  }, [wordTick, act, nod, reduce]);

  return (
    <motion.span
      className={`mascot-face act-${act}`}
      style={{ width: size, height: size }}
      animate={
        reduce
          ? {}
          : act === "thinking"
            ? { rotate: [-8, 8, -8], transition: { duration: 1.6, repeat: Infinity } }
            : act === "listening"
              ? { scale: [1, 1.08, 1], transition: { duration: 1, repeat: Infinity } }
              : { rotate: 0, scale: 1 }
      }
    >
      <motion.span animate={nod} className="block h-full w-full">
        <Image src={MASCOT.poses.face.src} alt="" width={size * 2} height={size * 2} className="h-full w-full object-cover" />
      </motion.span>
    </motion.span>
  );
}

/** Words revealed in step with the mascot's speech. */
export function useSpokenWords(text: string) {
  const { wordTick, speaking } = useAgent();
  const [start, setStart] = useState({ text, tick: wordTick });
  if (start.text !== text) setStart({ text, tick: wordTick });
  const words = text.split(/(\s+)/);
  if (!speaking) return { shown: text, done: true };
  const count = Math.max(1, wordTick - start.tick + 1) * 2;
  return { shown: words.slice(0, count).join(""), done: count >= words.length };
}
