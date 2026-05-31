"use client";

import { useEffect, useRef } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  REACT BITS SWAP POINT: BackgroundEffect                    ║
 * ║  Replace this component with one of:                        ║
 * ║  - <Galaxy />                                               ║
 * ║  - <Particles />                                            ║
 * ║  - <Aurora />                                               ║
 * ║  - <Hyperspeed />                                           ║
 * ║  from React Bits when installed.                             ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  brightness: number;
}

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    const STAR_COUNT = 280;
    const SPEED = 0.3;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        prevX: 0,
        prevY: 0,
        brightness: Math.random(),
      }));
    };

    const animate = () => {
      ctx.fillStyle = "rgba(7, 10, 18, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const star of stars) {
        star.prevX = (star.x / star.z) * cx + cx;
        star.prevY = (star.y / star.z) * cy + cy;

        star.z -= SPEED;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          star.z = canvas.width;
          star.brightness = Math.random();
        }

        const sx = (star.x / star.z) * cx + cx;
        const sy = (star.y / star.z) * cy + cy;

        const size = Math.max(0, (1 - star.z / canvas.width) * 2.5);
        const alpha = Math.max(0, (1 - star.z / canvas.width) * star.brightness);

        const hue = star.brightness > 0.7 ? "160, 255, 200" : "200, 220, 255";

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${hue}, ${alpha * 0.3})`;
        ctx.lineWidth = size * 0.5;
        ctx.moveTo(star.prevX, star.prevY);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${hue}, ${alpha})`;
        ctx.arc(sx, sy, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initStars();
    animate();

    const handleResize = () => {
      resize();
      initStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
