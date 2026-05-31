"use client";

import { useState } from "react";
import { playClick } from "@/lib/audio";

interface ConsoleProps {
  onSubmit: (question: string) => void;
  isProcessing: boolean;
  isRevealed: boolean;
}

/**
 * Console — Main input area where users type their question.
 */
export default function Console({ onSubmit, isProcessing, isRevealed }: ConsoleProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isProcessing || isRevealed) return;
    playClick();
    onSubmit(question.trim());
  };

  return (
    <section
      id="console"
      className="relative z-10 w-full max-w-2xl mx-auto px-6 mb-10"
    >
      <form onSubmit={handleSubmit} className="glass-card p-1">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dt-green/60 font-mono text-sm select-none pointer-events-none">
              &gt;
            </div>
            <input
              id="question-input"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Pergunte qualquer coisa. A resposta já é conhecida."
              disabled={isProcessing || isRevealed}
              className="w-full bg-black/40 border border-dt-border rounded-lg pl-8 pr-4 py-3.5 text-sm font-mono text-dt-text placeholder:text-dt-text-muted focus:outline-none focus:border-dt-green/60 focus:ring-1 focus:ring-dt-green/40 focus:bg-dt-green/5 hover:border-dt-border-active transition-all disabled:opacity-50"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <button
            id="compute-button"
            type="submit"
            disabled={isProcessing || isRevealed || !question.trim()}
            className="group relative px-6 py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-dt-green/90 to-emerald-500/90 text-dt-bg hover:from-dt-green hover:to-emerald-400 hover:shadow-[0_0_40px_rgba(124,255,178,0.4)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap overflow-hidden"
          >
            {/* Button glow sweep effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-2 justify-center">
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Calculando…
                </>
              ) : (
                "Calcular Resposta"
              )}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}
