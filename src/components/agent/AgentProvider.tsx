"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { AgentAnswer } from "@/lib/agent-local";
import { localAnswer } from "@/lib/agent-local";
import { productBySlug } from "@/data/products";

export const DEFAULT_TINT = "#E2231A";

export type AgentStatus = "idle" | "listening" | "thinking" | "answered";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  product?: string | null;
  suggestions?: string[];
  sources?: string[];
  mood?: AgentAnswer["mood"];
  notice?: string | null;
}

interface Turn {
  role: "user" | "assistant";
  content: string;
}

interface AgentState {
  status: AgentStatus;
  transcript: string;
  answer: AgentAnswer | null;
  lastQuestion: string;
  notice: string | null;
  open: boolean;
  speak: boolean;
  tint: string;
  voiceSupported: boolean;
  /** The mascot is talking: true while the answer is read aloud (or typed out when muted). */
  speaking: boolean;
  /** Increments on every spoken word so the mascot can bob in time. */
  wordTick: number;
  messages: ChatMessage[];
  ask: (text: string) => Promise<void>;
  listen: () => void;
  cancel: () => void;
  setOpen: (v: boolean) => void;
  toggleOpen: () => void;
  setSpeak: (v: boolean) => void;
  setTint: (hex: string) => void;
  clearChat: () => void;
}

const Ctx = createContext<AgentState | null>(null);

export const useAgent = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAgent must be used inside <AgentProvider>");
  return v;
};

// Minimal Web Speech API typing; the DOM lib does not ship it.
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

function getRecognition(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, new () => SpeechRecognitionLike>;
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

const tintFor = (pathname: string) =>
  pathname.startsWith("/sipes/product/")
    ? productBySlug(pathname.split("/")[3] ?? "")?.tint ?? DEFAULT_TINT
    : DEFAULT_TINT;

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState<AgentAnswer | null>(null);
  const [lastQuestion, setLastQuestion] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [speak, setSpeak] = useState(true);
  const [tint, setTint] = useState(() => tintFor(pathname));
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [wordTick, setWordTick] = useState(0);
  const talkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const history = useRef<Turn[]>([]);
  const recog = useRef<SpeechRecognitionLike | null>(null);
  const finalText = useRef("");
  const pathRef = useRef(pathname);
  const requestId = useRef(0);

  useEffect(() => {
    // Feature detection has to wait for the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVoiceSupported(getRecognition() !== null);
  }, []);

  useEffect(() => {
    pathRef.current = pathname;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTint(tintFor(pathname));
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.setProperty("--tint", tint);
  }, [tint]);

  const sayId = useRef(0);

  const stopTalking = useCallback(() => {
    sayId.current++;
    if (talkTimer.current) clearTimeout(talkTimer.current);
    talkTimer.current = null;
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  // Without audio the mascot still "talks" for about as long as reading takes.
  const mimeTalking = useCallback((text: string, id: number) => {
    const words = text.split(/\s+/).length;
    setSpeaking(true);
    let n = 0;
    const tick = () => {
      if (id !== sayId.current) return;
      setWordTick((t) => t + 1);
      if (++n < words) talkTimer.current = setTimeout(tick, 260);
      else talkTimer.current = setTimeout(() => id === sayId.current && setSpeaking(false), 300);
    };
    tick();
  }, []);

  const say = useCallback(
    (text: string) => {
      stopTalking();
      const id = sayId.current;
      const clean = text.replace(/[*_#`~]/g, "");
      if (!speak || typeof window === "undefined" || !window.speechSynthesis) {
        mimeTalking(clean, id);
        return;
      }
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(clean);
      const arabic = /[\u0600-\u06ff]/.test(clean);
      u.lang = arabic ? "ar-EG" : "en-US";
      const voice = synth
        .getVoices()
        .find((v) => v.lang.startsWith(arabic ? "ar" : "en") && /\b(david|guy|mark|daniel|tarik|hamed|shakir)\b/i.test(v.name));
      if (voice) u.voice = voice;
      u.rate = 1.03;
      u.pitch = 0.95;
      let started = false;
      let boundaries = false;
      setSpeaking(true);
      u.onstart = () => {
        started = true;
      };
      u.onboundary = () => {
        if (id !== sayId.current) return;
        boundaries = true;
        setWordTick((t) => t + 1);
      };
      u.onend = u.onerror = () => {
        if (id === sayId.current && !talkTimer.current) setSpeaking(false);
      };
      synth.speak(u);
      setTimeout(() => {
        if (id !== sayId.current) return;
        if (!started && !synth.speaking) {
          // Speech was blocked or no voice exists: fall back to a silent read-out.
          mimeTalking(clean, id);
        } else if (!boundaries) {
          // Some voices never fire word boundaries; keep the mascot moving anyway.
          const pump = () => {
            if (id !== sayId.current) return;
            if (!synth.speaking) {
              talkTimer.current = null;
              setSpeaking(false);
              return;
            }
            setWordTick((t) => t + 1);
            talkTimer.current = setTimeout(pump, 280);
          };
          pump();
        }
      }, 800);
    },
    [speak, mimeTalking, stopTalking],
  );

  const ask = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message) return;
      const id = ++requestId.current;
      setLastQuestion(message);
      setNotice(null);
      stopTalking();
      setStatus("thinking");
      setOpen(true);

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "user",
        content: message,
      };
      setMessages((prev) => [...prev, userMsg]);

      const from = pathRef.current;

      let result: AgentAnswer;
      try {
        const res = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, pathname: from, history: history.current.slice(-8) }),
        });
        if (!res.ok) throw new Error(String(res.status));
        result = await res.json();
      } catch {
        // Offline or server error: answer from the on-page catalogue instead.
        result = localAnswer(message, { pathname: from });
      }
      if (id !== requestId.current) return;

      history.current.push({ role: "user", content: message }, { role: "assistant", content: result.reply });
      setAnswer(result);
      setStatus("answered");

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "assistant",
        content: result.reply,
        product: result.product,
        suggestions: result.suggestions,
        sources: result.sources,
        mood: result.mood,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      const product = result.product ? productBySlug(result.product) : null;
      if (product) setTint(product.tint);
      if (result.route && result.route !== from) router.push(result.route, { scroll: true });
      say(result.reply);
    },
    [router, say, stopTalking],
  );

  // Deep link: /?ask=si-tone-silk opens the site with that question answered.
  const askedFromUrl = useRef(false);
  useEffect(() => {
    if (askedFromUrl.current) return;
    askedFromUrl.current = true;
    const q = new URLSearchParams(window.location.search).get("ask");
    if (q) queueMicrotask(() => void ask(q));
  }, [ask]);

  const cancel = useCallback(() => {
    recog.current?.abort();
    recog.current = null;
    requestId.current++;
    stopTalking();
    setTranscript("");
    setStatus(answer ? "answered" : "idle");
  }, [answer, stopTalking]);

  const toggleOpen = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setAnswer(null);
    setLastQuestion("");
    setNotice(null);
    setStatus("idle");
    stopTalking();
    history.current = [];
  }, [stopTalking]);

  const listen = useCallback(() => {
    if (status === "listening") {
      recog.current?.stop();
      return;
    }
    const r = getRecognition();
    if (!r) {
      setNotice("Voice input isn't available in this browser. Type your question instead.");
      setOpen(true);
      document.getElementById("agent-input")?.focus();
      return;
    }
    stopTalking();
    finalText.current = "";
    setTranscript("");
    setNotice(null);
    r.lang = document.documentElement.lang === "ar" ? "ar-EG" : "en-US";
    r.interimResults = true;
    r.continuous = false;
    r.onresult = (e) => {
      let interim = "";
      let final = "";
      for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      if (final) finalText.current = final;
      setTranscript(final || interim);
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setNotice("Microphone access is blocked. Allow it in your browser, or type your question instead.");
        setOpen(true);
      } else if (e.error === "no-speech") {
        setNotice("I didn't catch anything. Tap the mic and try again.");
        setOpen(true);
      }
    };
    r.onend = () => {
      recog.current = null;
      const heard = finalText.current.trim();
      setTranscript("");
      if (heard) void ask(heard);
      else setStatus((s) => (s === "listening" ? "idle" : s));
    };
    recog.current = r;
    setStatus("listening");
    r.start();
  }, [ask, status, stopTalking]);

  return (
    <Ctx.Provider
      value={{
        status,
        transcript,
        answer,
        lastQuestion,
        notice,
        open,
        speak,
        tint,
        voiceSupported,
        speaking,
        wordTick,
        messages,
        ask,
        listen,
        cancel,
        setOpen,
        toggleOpen,
        setSpeak,
        setTint,
        clearChat,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
