"use client";

import Aurora from "@/components/reactbits/Aurora";

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Aurora
        colorStops={["#040d1a", "#0a3060", "#051a10"]}
        amplitude={1.0}
        blend={0.5}
        speed={0.4}
      />
    </div>
  );
}
