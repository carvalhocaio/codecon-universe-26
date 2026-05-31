"use client";

import { useEffect, useState } from "react";
import { mockDontPanic, type HealthCheck } from "@/lib/mocks";

/**
 * DontPanic — Health check display / easter egg section.
 */
export default function DontPanic() {
  const [health, setHealth] = useState<HealthCheck | null>(null);

  useEffect(() => {
    mockDontPanic().then(setHealth);
  }, []);

  return (
    <section
      id="dont-panic"
      className="relative z-10 w-full max-w-2xl mx-auto px-6 mb-10"
    >
      <div className="glass-card p-5 border-dt-green/10">
        {/* Header bar */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dt-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-dt-green"></span>
            </div>
            <span className="text-xs font-mono font-semibold text-dt-green tracking-wide uppercase">
              dont_panic()
            </span>
          </div>
          <div className="flex-1 h-px bg-dt-border" />
          <span className="text-[10px] font-mono text-dt-text-muted">
            GET /dont_panic → 200 OK
          </span>
        </div>

        {/* Health message */}
        <p className="text-sm text-dt-text-sec leading-relaxed font-mono">
          {health?.message || "Verificando status do sistema…"}
        </p>

        {/* JSON-like response preview */}
        <div className="mt-4 p-3 rounded-lg bg-dt-bg/80 border border-dt-border">
          <pre className="text-[11px] font-mono text-dt-text-muted leading-relaxed overflow-x-auto">
            <code>
{`{
  "status": "${health?.status || "…"}",
  "dont_panic": ${health?.dont_panic ?? "…"},
  "uptime": "${health?.uptime || "…"}",
  "answer": 42,
  "towel": true
}`}
            </code>
          </pre>
        </div>

        {/* Large DON'T PANIC text */}
        <div className="mt-5 text-center">
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-dt-green/30 select-none uppercase">
            Não Entre em Pânico
          </p>
        </div>
      </div>
    </section>
  );
}
