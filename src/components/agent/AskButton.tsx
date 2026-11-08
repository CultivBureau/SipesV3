"use client";

import { useAgent } from "./AgentProvider";

export function AskButton({
  question,
  className,
  children,
}: {
  question: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { ask } = useAgent();
  return (
    <button type="button" onClick={() => ask(question)} className={className}>
      {children}
    </button>
  );
}
