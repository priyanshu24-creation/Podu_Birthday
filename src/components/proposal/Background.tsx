import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 aurora-bg"
        style={{ animation: "aurora-shift 20s ease-in-out infinite" }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 70% 60%, oklch(0.50 0.25 350 / 0.4), transparent 55%)",
          animation: "aurora-shift 25s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.10 0.04 320 / 0.6) 80%)",
        }}
      />
    </div>
  );
}

export function Stars() {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const [stars, setStars] = useState<{ x: number; y: number; s: number; d: number }[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: isMobile ? 18 : 36 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 0.5,
      d: Math.random() * 4 + 2,
    }));
    setStars(arr);
  }, [isMobile]);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            animation: shouldReduceMotion ? "none" : `twinkle ${s.d}s ease-in-out infinite`,
            animationDelay: shouldReduceMotion ? undefined : `${Math.random() * 5}s`,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </div>
  );
}

export function FloatingHearts() {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const [hearts, setHearts] = useState<{ x: number; d: number; del: number; size: number }[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: isMobile ? 4 : 8 }, () => ({
      x: Math.random() * 100,
      d: Math.random() * 15 + 15,
      del: Math.random() * 20,
      size: Math.random() * 14 + 10,
    }));
    setHearts(arr);
  }, [isMobile]);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute text-primary/40"
          style={{
            left: `${h.x}%`,
            bottom: 0,
            fontSize: h.size,
            animation: shouldReduceMotion ? "none" : `float-up ${h.d}s linear infinite`,
            animationDelay: shouldReduceMotion ? undefined : `${h.del}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
