"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { PROCESSING_LOGS, type LogEntry } from "@/lib/mocks";
import { playClick, playBeep, playSuccess, startHum, stopHum } from "@/lib/audio";

import BackgroundEffect from "@/components/BackgroundEffect";
import Hero from "@/components/Hero";
import Console from "@/components/Console";
import ProcessingLogs from "@/components/ProcessingLogs";
import RevealAnswer from "@/components/RevealAnswer";
import QuestionGenerator from "@/components/QuestionGenerator";
import DontPanic from "@/components/DontPanic";
import Dashboard from "@/components/Dashboard";

type Phase = "idle" | "processing" | "revealed";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:4242";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [question, setQuestion] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      stopHum();
      abortRef.current?.abort();
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

  const runFallbackSimulation = useCallback(
    (onDone: () => void) => {
      const totalDuration = 5000;
      const logCount = PROCESSING_LOGS.length;
      const logInterval = totalDuration / logCount;
      let logIndex = 0;

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const target = ((logIndex + 1) / logCount) * 100;
          return Math.min(prev + (target - prev) * 0.15, 100);
        });
      }, 50);

      const addNextLog = () => {
        if (logIndex >= logCount) {
          clearInterval(progressInterval);
          setProgress(100);
          onDone();
          return;
        }
        const entry = PROCESSING_LOGS[logIndex];
        playBeep();
        setLogs((prev) => [
          ...prev,
          { timestamp: formatTimestamp(), message: entry.message, level: entry.level },
        ]);
        logIndex++;
        setTimeout(addNextLog, logInterval);
      };

      setTimeout(addNextLog, 400);
    },
    []
  );

  const handleCompute = useCallback(
    async (question: string) => {
      if (phase !== "idle") return;

      setPhase("processing");
      setLogs([]);
      setProgress(0);
      startHum();

      const abort = new AbortController();
      abortRef.current = abort;

      const reveal = () => {
        stopHum();
        setTimeout(() => {
          playSuccess();
          setPhase("revealed");
        }, 600);
      };

      try {
        const res = await fetch(`${SERVER_URL}/api/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
          signal: abort.signal,
        });

        if (!res.ok || !res.body) throw new Error("stream unavailable");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let logCount = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data: ")) continue;
            const data = JSON.parse(line.slice(6)) as {
              type: "log" | "answer";
              message?: string;
              level?: string;
              answer?: number;
            };

            if (data.type === "log") {
              playBeep();
              logCount++;
              setProgress((logCount / PROCESSING_LOGS.length) * 100);
              setLogs((prev) => [
                ...prev,
                {
                  timestamp: formatTimestamp(),
                  message: data.message ?? "",
                  level: (data.level as LogEntry["level"]) ?? "info",
                },
              ]);
            } else if (data.type === "answer") {
              setProgress(100);
              reveal();
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        // Backend offline — fallback para simulação local
        runFallbackSimulation(reveal);
      }
    },
    [phase, runFallbackSimulation]
  );

  const handleReset = () => {
    playClick();
    stopHum();
    abortRef.current?.abort();
    setPhase("idle");
    setQuestion("");
    setLogs([]);
    setProgress(0);
  };

  return (
    <div className="relative min-h-screen scanline-overlay">
      <BackgroundEffect />

      <main className="relative z-10 flex flex-col items-center pb-24">

        {/* Fase idle / processing — hero + console + logs */}
        {phase !== "revealed" && (
          <>
            <Hero />
            <Console
              onSubmit={handleCompute}
              isProcessing={phase === "processing"}
              isRevealed={false}
              question={question}
              onQuestionChange={setQuestion}
            />
          </>
        )}

        {phase === "processing" && (
          <>
            <ProcessingLogs
              logs={logs}
              progress={progress}
              isProcessing
            />
            <div className="animate-fade-in-up">
              <DontPanic />
            </div>
          </>
        )}

        {/* Fase revealed — 42 centralizado na viewport */}
        {phase === "revealed" && (
          <div className="w-full flex flex-col items-center justify-center min-h-[80vh]">
            <RevealAnswer visible />

            <div
              className="relative z-10 mb-4 animate-fade-in"
              style={{ animationDelay: "1.5s", opacity: 0 }}
            >
              <button
                id="reset-button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg font-mono text-sm text-dt-text-sec border border-dt-border hover:border-dt-green/30 hover:text-dt-green transition-all duration-300"
              >
                ↻ Fazer outra pergunta
              </button>
            </div>
          </div>
        )}

        {phase === "revealed" && (
          <div
            className="w-full animate-fade-in-up"
            style={{ animationDelay: "1.2s", opacity: 0 }}
          >
            <Dashboard />
          </div>
        )}

        <QuestionGenerator />

        <footer className="relative z-10 py-8 text-center">
          <p className="text-xs font-mono text-dt-text-muted">
            Bug Bang © {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
