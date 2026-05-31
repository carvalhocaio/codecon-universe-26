"use client";

import type { LogEntry } from "@/lib/mocks";

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  REACT BITS SWAP POINT: ProcessingLogs                      ║
 * ║  Replace log lines with:                                    ║
 * ║  - <ScrambledText /> or <GlitchText /> from React Bits      ║
 * ║  for a more dramatic reveal effect.                         ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

interface ProcessingLogsProps {
  logs: LogEntry[];
  progress: number;
  isProcessing: boolean;
}

export default function ProcessingLogs({ logs, progress, isProcessing }: ProcessingLogsProps) {
  if (!isProcessing && logs.length === 0) return null;

  const levelColor: Record<string, string> = {
    info: "text-dt-green/80",
    warn: "text-dt-amber",
    success: "text-dt-green font-semibold",
  };

  const levelIcon: Record<string, string> = {
    info: "●",
    warn: "▲",
    success: "✓",
  };

  return (
    <section
      id="processing"
      className="relative z-10 w-full max-w-2xl mx-auto px-6 mb-10 animate-fade-in"
    >
      <div className="glass-card p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-widest text-dt-text-sec">
            Log de Computação
          </h3>
          <span className="text-xs font-mono text-dt-amber">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-dt-blue/50 rounded-full overflow-hidden">
          <div
            className="progress-bar-fill h-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text */}
        <p className="text-xs font-mono text-dt-text-sec">
          Comprimindo 7.500.000 anos no modo demonstração…
        </p>

        {/* Logs */}
        <div className="space-y-1.5 font-mono text-xs bg-black/60 border border-white/5 rounded-md p-3 max-h-48 overflow-y-auto shadow-inner">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 animate-log-appear ${levelColor[log.level]}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="shrink-0 mt-px text-[10px] opacity-70">
                {levelIcon[log.level]}
              </span>
              <span className="text-dt-text-muted mr-1.5 shrink-0">
                [{log.timestamp}]
              </span>
              {/* REACT BITS: Wrap this span with <ScrambledText> or <GlitchText> */}
              <span className="drop-shadow-md">{log.message}</span>
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center gap-2 text-dt-green/80 mt-1">
              <span className="shrink-0 mt-px text-[10px] opacity-70">●</span>
              <span className="inline-block w-2 h-3.5 bg-dt-green/80 shadow-[0_0_8px_rgba(124,255,178,0.8)]" style={{ animation: "typing-cursor 0.8s step-end infinite" }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
