"use client";

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  REACT BITS SWAP POINT: Dashboard metrics                   ║
 * ║  Replace numeric values with <CountUp /> from React Bits    ║
 * ║  for animated counting effects on mount.                    ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

interface MetricCard {
  label: string;
  value: string;
  mono?: boolean;
  accent?: "green" | "amber" | "default";
}

const METRICS: MetricCard[] = [
  { label: "Tempo de Ativ.", value: "7.500.000 anos", accent: "green" },
  { label: "Disponibilidade", value: "100%", accent: "green" },
  { label: "Versão da API", value: "v42.0.0", mono: true },
  { label: "Dependência Core", value: "ANSWER = 42", mono: true, accent: "amber" },
  { label: "Health Check", value: "GET /dont_panic", mono: true },
  { label: "Status", value: "dont_panic(): healthy", mono: true, accent: "green" },
];

export default function Dashboard() {
  const accentClasses: Record<string, string> = {
    green: "text-dt-green",
    amber: "text-dt-amber",
    default: "text-dt-text",
  };

  return (
    <section
      id="dashboard"
      className="relative z-10 w-full max-w-4xl mx-auto px-6 mb-12"
    >
      <h2 className="text-xs font-mono uppercase tracking-widest text-dt-text-sec mb-4 text-center">
        Métricas do Sistema
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className="glass-card p-4 animate-fade-in-up group relative overflow-hidden cursor-default"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            {/* Top highlight bar on hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-dt-green/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            
            <p className="text-[11px] font-mono uppercase tracking-wider text-dt-text-muted mb-1.5 flex items-center gap-2">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${metric.accent === "green" ? "bg-dt-green/60 group-hover:bg-dt-green group-hover:shadow-[0_0_8px_rgba(124,255,178,0.8)]" : metric.accent === "amber" ? "bg-dt-amber/60 group-hover:bg-dt-amber group-hover:shadow-[0_0_8px_rgba(255,209,102,0.8)]" : "bg-dt-text-muted/50 group-hover:bg-dt-text-sec"} transition-all duration-300`} />
              {metric.label}
            </p>
            {/* REACT BITS: Wrap value with <CountUp> for numeric values */}
            <p
              className={`text-sm font-semibold pl-3.5 ${
                metric.mono ? "font-mono" : ""
              } metric-value ${accentClasses[metric.accent || "default"]} group-hover:translate-x-1 group-hover:scale-[1.02] transition-all duration-300 drop-shadow-sm`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
