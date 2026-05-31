"use client";

import { useEffect, useRef } from "react";
import DecryptedText from "@/components/reactbits/DecryptedText";

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  REACT BITS SWAP POINT: RevealAnswer                        ║
 * ║  Replace the "42" text rendering with:                      ║
 * ║  - <DecryptedText text="42" /> from React Bits              ║
 * ║  for an encrypted→decrypted reveal animation.               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

interface RevealAnswerProps {
  visible: boolean;
}

export default function RevealAnswer({ visible }: RevealAnswerProps) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!visible || hasSpoken.current) return;

    // Web Speech API — speak "42" cinematically
    try {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance("Quarenta e dois.");
        utterance.rate = 0.7;
        utterance.pitch = 0.8;
        utterance.volume = 0.9;

        // Try to use a deeper voice
        const voices = speechSynthesis.getVoices();
        const preferred = voices.find(
          (v) => v.lang.startsWith("pt") && v.name.toLowerCase().includes("male")
        );
        if (preferred) utterance.voice = preferred;

        // Small delay for dramatic effect
        setTimeout(() => {
          speechSynthesis.speak(utterance);
        }, 800);
      }
    } catch {
      // Speech API not available — no problem
    }

    hasSpoken.current = true;
  }, [visible]);

  if (!visible) return null;

  return (
    <section
      id="answer-reveal"
      className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16 text-center"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-dt-amber/15 blur-[120px] mix-blend-screen" />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-yellow-400/20 blur-[80px] mix-blend-screen" />
      </div>

      {/* The Answer — DecryptedText from React Bits */}
      <div className="relative animate-reveal-42" key={visible ? "visible" : "hidden"}>
        <DecryptedText
          text="42"
          speed={60}
          sequential
          revealDirection="center"
          animateOn="view"
          characters="0123456789!@#$%^&*ABCDEFabcdef"
          className="the-answer animate-pulse-amber select-none relative z-10"
          encryptedClassName="the-answer opacity-40 relative z-10"
          parentClassName="the-answer-wrap"
        />
      </div>

      {/* Supporting text */}
      <p
        className="mt-8 text-base sm:text-lg text-dt-text-sec max-w-xl mx-auto leading-relaxed animate-fade-in-up"
        style={{ animationDelay: "0.8s", opacity: 0 }}
      >
        A Resposta para a Pergunta Fundamental da Vida, do Universo e Tudo Mais.
      </p>

      {/* Decorative elements */}
      <div
        className="mt-6 flex items-center justify-center gap-3 animate-fade-in"
        style={{ animationDelay: "1.2s", opacity: 0 }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-dt-amber/40" />
        <span className="text-xs font-mono text-dt-amber/60 tracking-widest uppercase">
          computação concluída
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-dt-amber/40" />
      </div>
    </section>
  );
}
