"use client";

import { useState } from "react";
import { mockGenerateQuestion } from "@/lib/mocks";
import { playClick } from "@/lib/audio";

/**
 * QuestionGenerator — "Quero a Pergunta" button that reveals random absurd questions.
 */
export default function QuestionGenerator() {
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerate = () => {
    playClick();
    setIsAnimating(true);
    // Small delay for drama
    setTimeout(() => {
      setCurrentQuestion(mockGenerateQuestion());
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section
      id="question-generator"
      className="relative z-10 w-full max-w-2xl mx-auto px-6 mb-12"
    >
      <div className="glass-card p-6 text-center space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-dt-text-muted">
          A Pergunta Fundamental
        </h3>

        <p className="text-sm text-dt-text-sec leading-relaxed">
          Nós computamos a resposta. Mas qual era a pergunta?
        </p>

        <button
          id="generate-question-button"
          onClick={handleGenerate}
          disabled={isAnimating}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 bg-dt-blue-mid/60 border border-dt-border text-dt-amber hover:border-dt-amber/40 hover:bg-dt-blue-mid/80 hover:shadow-[0_0_20px_rgba(255,209,102,0.1)] active:scale-[0.97] disabled:opacity-50"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isAnimating ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Quero a Pergunta
        </button>

        {currentQuestion && (
          <div className="animate-fade-in-up">
            <blockquote className="mt-2 text-base sm:text-lg font-medium text-dt-amber/90 italic leading-relaxed">
              &ldquo;{currentQuestion}&rdquo;
            </blockquote>
            <p className="mt-2 text-xs font-mono text-dt-text-muted">
              — Pergunta Fundamental Hipotética #{Math.floor(Math.random() * 9999)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
