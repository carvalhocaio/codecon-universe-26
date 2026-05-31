"use client";

/**
 * Hero — Compact hero section with title, subtitle, and status badges.
 */

export default function Hero() {
  return (
    <header className="relative z-10 pt-12 pb-8 px-6 text-center">
      {/* Badges */}
      <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-dt-blue/60 border border-dt-border text-dt-green tracking-wide">
          v42.0.0
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-dt-blue/60 border border-dt-border text-dt-green tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dt-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-dt-green" />
          </span>
          /dont_panic operacional
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-dt-text leading-tight animate-fade-in-up">
        Deep Thought{" "}
        <span className="bg-gradient-to-r from-dt-green to-cyan-400 bg-clip-text text-transparent">
          as a Service
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="mt-4 text-base sm:text-lg text-dt-text-sec max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        Respostas de nível enterprise para a incerteza fundamental da existência.
      </p>

      {/* Decorative line */}
      <div
        className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-dt-green/40 to-transparent animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      />
    </header>
  );
}
