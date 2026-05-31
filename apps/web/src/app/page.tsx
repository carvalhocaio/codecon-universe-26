"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  mockAskUniverse,
  PROCESSING_LOGS,
  type LogEntry,
} from "@/lib/mocks";
import { playClick, playBeep, playSuccess, startHum, stopHum } from "@/lib/audio";

import BackgroundEffect from "@/components/BackgroundEffect";
import Hero from "@/components/Hero";
import Console from "@/components/Console";
import ProcessingLogs from "@/components/ProcessingLogs";
import RevealAnswer from "@/components/RevealAnswer";
import QuestionGenerator from "@/components/QuestionGenerator";
import DontPanic from "@/components/DontPanic";

/**
 * ═══════════════════════════════════════════════════════════════
 *  Deep Thought as a Service — Main Page
 *  A parody enterprise SaaS inspired by The Hitchhiker's Guide.
 * ═══════════════════════════════════════════════════════════════
 */

type Phase = "idle" | "processing" | "revealed";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      stopHum();
    };
  }, []);

  const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleCompute = useCallback(
    async (question: string) => {
      if (phase !== "idle") return;

      setPhase("processing");
      setLogs([]);
      setProgress(0);
      startHum();

      // Start the mock API call (resolves quickly but we simulate 5s of processing)
      mockAskUniverse(question);

      // Simulate progressive log entries over ~5 seconds
      const totalDuration = 5000;
      const logCount = PROCESSING_LOGS.length;
      const logInterval = totalDuration / logCount;

      let logIndex = 0;

      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const target = ((logIndex + 1) / logCount) * 100;
          const next = prev + (target - prev) * 0.15;
          return Math.min(next, 100);
        });
      }, 50);

      timerRef.current = progressInterval;

      // Add logs one by one
      const addNextLog = () => {
        if (logIndex >= logCount) {
          clearInterval(progressInterval);
          setProgress(100);
          stopHum();

          // Small pause before reveal
          setTimeout(() => {
            playSuccess();
            setPhase("revealed");
          }, 600);
          return;
        }

        const entry = PROCESSING_LOGS[logIndex];
        playBeep();
        setLogs((prev) => [
          ...prev,
          {
            timestamp: formatTimestamp(),
            message: entry.message,
            level: entry.level,
          },
        ]);

        logIndex++;
        setTimeout(addNextLog, logInterval);
      };

      // Start after a small initial delay
      setTimeout(addNextLog, 400);
    },
    [phase]
  );

  const handleReset = () => {
    playClick();
    stopHum();
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("idle");
    setLogs([]);
    setProgress(0);
  };

  return (
    <div className="relative min-h-screen scanline-overlay">
      {/* Background — REACT BITS SWAP POINT */}
      <BackgroundEffect />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center pb-24">
        <Hero />

        {/* Console input */}
        <Console
          onSubmit={handleCompute}
          isProcessing={phase === "processing"}
          isRevealed={phase === "revealed"}
        />

        {/* Processing logs */}
        {(phase === "processing" || (phase === "revealed" && logs.length > 0)) && (
          <ProcessingLogs
            logs={logs}
            progress={progress}
            isProcessing={phase === "processing"}
          />
        )}

        {/* Dont Panic shows up during processing to reassure the user */}
        {phase === "processing" && (
           <div className="animate-fade-in-up">
             <DontPanic />
           </div>
        )}

        {/* The Answer: 42 */}
        <RevealAnswer visible={phase === "revealed"} />

        {/* Reset button (only after reveal) */}
        {phase === "revealed" && (
          <div className="relative z-10 mb-12 animate-fade-in" style={{ animationDelay: "1.5s", opacity: 0 }}>
            <button
              id="reset-button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-lg font-mono text-sm text-dt-text-sec border border-dt-border hover:border-dt-green/30 hover:text-dt-green transition-all duration-300"
            >
              ↻ Fazer outra pergunta
            </button>
          </div>
        )}

        {/* Question Generator */}
        <QuestionGenerator />

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center">
          <p className="text-xs font-mono text-dt-text-muted">
            Bug Bang © {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
