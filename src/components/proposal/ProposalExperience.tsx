import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Gift, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuroraBackground, Stars, FloatingHearts } from "./Background";
import { CustomCursor, MouseGlow } from "./Cursor";
import photo1 from "@/assets/photos/Picture_1.jpeg";
import photo2 from "@/assets/photos/Picture_2.jpeg";
import photo3 from "@/assets/photos/Picture_3.jpeg";
import photo4 from "@/assets/photos/Picture_4.jpeg";
import photo5 from "@/assets/photos/Picture_5.jpeg";
import photo6 from "@/assets/photos/Picture_6.jpeg";
import photo7 from "@/assets/photos/Picture_7.jpeg";
import photo8 from "@/assets/photos/Picture_8.jpeg";
import photo9 from "@/assets/photos/Picture_9.jpeg";
import photo10 from "@/assets/photos/Picture_10.jpeg";
import photo11 from "@/assets/photos/Picture_11.jpeg";
import photo12 from "@/assets/photos/Picture_12.jpeg";
import photo13 from "@/assets/photos/Picture_13.jpeg";
import photo14 from "@/assets/photos/Picture_14.jpeg";
import photo15 from "@/assets/photos/Picture_15.jpeg";
import photo16 from "@/assets/photos/Picture_16.jpeg";

/* ---------- Loading ---------- */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="text-6xl text-primary"
        style={{ filter: "drop-shadow(0 0 30px oklch(0.72 0.22 350))" }}
      >
        ♥
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-xl font-medium text-gradient-rose"
      >
        crafting something for you…
      </motion.p>
    </motion.div>
  );
}

const SECTIONS = [
  { id: "hero", label: "Start" },
  { id: "birthday", label: "Birthday" },
  { id: "story", label: "Our Story" },
  { id: "gallery", label: "Memories" },
  { id: "letter", label: "Letter" },
  { id: "reasons", label: "Reasons" },
  { id: "surprise", label: "Surprise" },
  { id: "ask", label: "The Question" },
];

function SectionNavigator({ currentIndex, onNext }: { currentIndex: number; onNext: () => void }) {
  if (currentIndex >= 6) return null;

  const isLast = currentIndex >= SECTIONS.length - 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-white/15 bg-background/55 px-3 py-3 shadow-[0_18px_40px_-20px_oklch(0.2_0.04_330/0.4)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <div className="hidden min-w-24 flex-col text-left text-[10px] uppercase tracking-[0.35em] text-foreground/40 sm:flex">
          <span>{SECTIONS[currentIndex]?.label ?? "Start"}</span>
        </div>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-violet-400 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_-10px_oklch(0.72_0.22_350/0.45)] transition-transform hover:scale-[1.02]"
        >
          {isLast ? "Restart" : "Next"}
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

/* ---------- Magnetic button ---------- */
function MagneticButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        ref.current!.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
      whileTap={{ scale: 0.96 }}
      className={`group relative overflow-hidden rounded-full px-10 py-4 text-base font-medium tracking-wide transition-all ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

/* ---------- Sections ---------- */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.35em] text-primary/80 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_oklch(0.72_0.22_350)]" />
        {eyebrow}
      </div>
      <h2 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-foreground/70"
      >
        <Sparkles size={12} className="text-primary" />a letter, written in pixels
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="mx-auto max-w-5xl text-center text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-7xl lg:text-8xl"
      >
        <span className="block">Happy Birthday,</span>
        <span className="mt-2 block text-gradient-rose italic">My Putum Burii</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/70 md:text-xl"
      >
        Today the world is a little brighter because you exist.
        <br />
        <span className="text-2xl font-medium text-gradient-rose">
          I built this whole thing just for you — stay till the end.
        </span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 1 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <div className="glass rounded-full border border-primary/20 px-4 py-2 text-sm text-foreground/70">
          crafted with heart ✨
        </div>
        <div className="glass rounded-full border border-white/10 px-4 py-2 text-sm text-foreground/70">
          scroll slowly • there is more to find
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-12"
      >
        <MagneticButton
          onClick={() =>
            document.getElementById("birthday")?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-gradient-to-r from-rose-400 via-primary to-violet-400 text-primary-foreground glow-rose"
        >
          <span className="flex items-center gap-2">
            Open Your Cake 🎂
            <motion.span
              animate={{ y: [0, -4, 0], rotate: [-6, 6, -3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="text-base"
            >
              💗
            </motion.span>
          </span>
        </MagneticButton>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-foreground/40"
      >
        <ChevronRight className="rotate-90" />
      </motion.div>
    </section>
  );
}

/* ---------- Birthday ---------- */
function Balloons({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const balloonCount = reducedMotion ? 8 : 18;
  const balloons = Array.from({ length: balloonCount }, (_, i) => ({
    x: Math.random() * 100,
    d: Math.random() * 10 + 12,
    del: Math.random() * 8,
    size: Math.random() * 28 + 28,
    hue: [350, 320, 290, 15, 60][i % 5],
    sway: Math.random() * 30 + 10,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: "110%" }}
          animate={reducedMotion ? { y: "-120%" } : { y: "-120%", x: [0, b.sway, -b.sway, 0] }}
          transition={
            reducedMotion
              ? { y: { duration: b.d, delay: b.del, repeat: Infinity, ease: "linear" } }
              : {
                  y: { duration: b.d, delay: b.del, repeat: Infinity, ease: "linear" },
                  x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }
          }
          className="absolute"
          style={{ left: `${b.x}%`, width: b.size }}
        >
          <div
            className="rounded-full"
            style={{
              width: b.size,
              height: b.size * 1.2,
              background: `radial-gradient(circle at 30% 30%, oklch(0.92 0.18 ${b.hue}), oklch(0.55 0.25 ${b.hue}))`,
              boxShadow: `0 0 30px oklch(0.60 0.25 ${b.hue} / 0.6)`,
            }}
          />
          <div className="mx-auto h-10 w-px bg-foreground/40" />
        </motion.div>
      ))}
    </div>
  );
}

const CANDLE_COLORS: [string, string][] = [
  ["#f472b6", "#ec4899"],
  ["#a78bfa", "#7c3aed"],
  ["#fbbf24", "#f59e0b"],
  ["#34d399", "#10b981"],
  ["#60a5fa", "#3b82f6"],
];

function Candle({ index, lit, onBlow }: { index: number; lit: boolean; onBlow: () => void }) {
  const [bursts, setBursts] = useState<number[]>([]);
  const prevLit = useRef(lit);
  useEffect(() => {
    if (prevLit.current && !lit) {
      const id = Date.now() + index;
      setBursts((b) => [...b, id]);
      setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1600);
    }
    prevLit.current = lit;
  }, [lit, index]);
  const [base, tip] = CANDLE_COLORS[index];
  return (
    <button
      onClick={onBlow}
      className="group relative flex flex-col items-center"
      style={{ cursor: "none" }}
    >
      <div className="relative h-8 w-5">
        <AnimatePresence>
          {lit && (
            <>
              {/* outer halo */}
              <motion.div
                key="halo"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 0.9, 0.6, 1, 0.7], scale: [1, 1.15, 0.95, 1.1, 1] }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,193,7,0.55), transparent 70%)",
                  filter: "blur(2px)",
                }}
              />
              {/* flame body */}
              <motion.div
                key="flame"
                initial={{ opacity: 0, scale: 0, y: 4 }}
                animate={{
                  opacity: 1,
                  scaleY: [1, 1.25, 0.85, 1.15, 0.95, 1.1, 1],
                  scaleX: [1, 0.85, 1.1, 0.9, 1.05, 0.95, 1],
                  rotate: [-6, 4, -3, 5, -4, 3, -6],
                  x: [-0.5, 0.8, -0.6, 0.7, -0.4, 0.5, -0.5],
                  y: [0, -1.5, 0.5, -1, 0, -0.8, 0],
                }}
                exit={{ opacity: 0, scale: 0, y: -24 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-0 h-7 w-3 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 75%, #fff7c2 0%, #ffd54f 35%, #ffb347 60%, #ff5722 95%)",
                  boxShadow: "0 -4px 22px #ff9800, 0 0 28px #ffd54f, 0 0 8px #fff",
                  transformOrigin: "50% 100%",
                  filter: "blur(0.3px)",
                }}
              />
              {/* tiny blue base */}
              <motion.div
                key="base"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.7, 1, 0.8], scaleY: [1, 1.2, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="absolute left-1/2 bottom-1 h-2 w-1.5 -translate-x-1/2 rounded-full"
                style={{ background: "radial-gradient(circle, #93c5fd, transparent 70%)" }}
              />
            </>
          )}
        </AnimatePresence>

        {/* per-blowout effects */}
        {bursts.map((id) => (
          <CandleBlowFX key={id} />
        ))}
      </div>

      {/* wick */}
      <div className="h-1.5 w-[2px] bg-foreground/70" />
      {/* candle stick */}
      <div
        className="mt-0 h-16 w-3 rounded-sm"
        style={{
          background: `linear-gradient(${base}, ${tip})`,
          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.25)",
        }}
      />
    </button>
  );
}

function CandleBlowFX() {
  // sparks: random directions
  const sparks = Array.from({ length: 10 }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.6;
    const dist = 22 + Math.random() * 22;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 8,
      color: ["#fff7c2", "#ffd54f", "#ffb347", "#ff7043"][i % 4],
      delay: Math.random() * 0.05,
    };
  });
  // smoke puffs
  const puffs = [0, 1, 2];
  return (
    <>
      {sparks.map((s, i) => (
        <motion.span
          key={`s${i}`}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: s.x, y: s.y, scale: 0.2 }}
          transition={{ duration: 0.7 + Math.random() * 0.3, delay: s.delay, ease: "easeOut" }}
          className="pointer-events-none absolute left-1/2 top-2 h-1 w-1 -translate-x-1/2 rounded-full"
          style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
        />
      ))}
      {puffs.map((p) => (
        <motion.span
          key={`p${p}`}
          initial={{ opacity: 0.7, scale: 0.4, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 2.2, x: (p - 1) * 6, y: -28 - p * 8 }}
          transition={{ duration: 1.2 + p * 0.15, delay: 0.05 + p * 0.08, ease: "easeOut" }}
          className="pointer-events-none absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full"
          style={{ background: "rgba(220,220,230,0.55)", filter: "blur(3px)" }}
        />
      ))}
      {/* shockwave */}
      <motion.span
        initial={{ opacity: 0.8, scale: 0.2 }}
        animate={{ opacity: 0, scale: 2.6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full"
        style={{ border: "1px solid rgba(255,213,79,0.7)" }}
      />
    </>
  );
}

function Cake({ litCount, onBlow }: { litCount: number; onBlow: (i: number) => void }) {
  const candles = [0, 1, 2, 3, 4];
  const [shakes, setShakes] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; c: string }[]>([]);
  const handleShake = () => {
    setShakes((s) => s + 1);
    const id = Date.now();
    const palette = ["#f472b6", "#a78bfa", "#fbbf24", "#34d399", "#60a5fa", "#fb7185", "#fff"];
    const next = Array.from({ length: 10 }).map((_, i) => ({
      id: id + i,
      x: 30 + Math.random() * 260,
      y: 110 + Math.random() * 200,
      c: palette[i % palette.length],
    }));
    setSparkles((p) => [...p, ...next]);
    setTimeout(() => setSparkles((p) => p.filter((s) => !next.find((n) => n.id === s.id))), 1100);
    confetti({
      particleCount: 18,
      spread: 48,
      startVelocity: 16,
      scalar: 0.65,
      origin: { y: 0.55 },
      colors: ["#f9a8d4", "#fbbf24", "#a78bfa", "#fff"],
    });
  };
  return (
    <motion.div
      key={shakes}
      animate={shakes ? { rotate: [0, -3, 4, -3, 2, -1, 0], y: [0, -4, 3, -2, 1, 0] } : {}}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="relative mx-auto"
      style={{ width: 320, height: 360 }}
    >
      {/* glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, oklch(0.85 0.18 60 / 0.5), transparent 60%)",
          filter: "blur(10px)",
        }}
      />
      {/* candles */}
      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-end gap-4">
        {candles.map((i) => {
          const lit = i < litCount;
          return <Candle key={i} index={i} lit={lit} onBlow={() => onBlow(i)} />;
        })}
      </div>
      {/* top tier */}
      <motion.div
        animate={
          shakes
            ? {
                y: [0, -6, 5, -3, 2, 0],
                scaleY: [1, 0.92, 1.06, 0.97, 1.02, 1],
                scaleX: [1, 1.06, 0.94, 1.03, 0.98, 1],
              }
            : { y: [0, -2, 0] }
        }
        transition={
          shakes ? { duration: 0.6, ease: "easeInOut" } : { duration: 3, repeat: Infinity }
        }
        className="absolute left-1/2 top-[92px] h-20 w-44 -translate-x-1/2 rounded-t-2xl rounded-b-md"
        style={{
          background: "linear-gradient(180deg, #ffe1ee 0%, #ffb6c8 40%, #ff8db0 100%)",
          boxShadow: "0 10px 30px oklch(0.45 0.2 350 / 0.6), inset 0 -8px 12px rgba(0,0,0,0.15)",
          transformOrigin: "50% 100%",
        }}
      >
        {/* drip frosting */}
        <svg
          viewBox="0 0 200 30"
          className="absolute -bottom-3 left-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q15,30 30,10 Q50,30 70,5 Q90,28 110,8 Q135,30 155,5 Q175,28 200,8 L200,0 Z"
            fill="#ff8db0"
          />
        </svg>
      </motion.div>
      {/* middle tier */}
      <motion.div
        animate={
          shakes ? { scaleY: [1, 0.94, 1.05, 0.98, 1], scaleX: [1, 1.05, 0.95, 1.02, 1] } : {}
        }
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="absolute left-1/2 top-[178px] h-20 w-60 -translate-x-1/2 rounded-md"
        style={{
          background: "linear-gradient(180deg, #fff 0%, #ffe6f0 40%, #f9a8d4 100%)",
          boxShadow: "0 12px 30px oklch(0.45 0.2 320 / 0.5), inset 0 -8px 12px rgba(0,0,0,0.15)",
          transformOrigin: "50% 100%",
        }}
      >
        {/* sprinkles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-2 w-[3px] rounded-full"
            style={{
              left: `${((i * 13) % 95) + 2}%`,
              top: `${((i * 17) % 70) + 10}%`,
              background: ["#f472b6", "#a78bfa", "#fbbf24", "#34d399", "#60a5fa", "#fb7185"][i % 6],
              transform: `rotate(${(i * 37) % 180}deg)`,
            }}
          />
        ))}
      </motion.div>
      {/* base tier */}
      <motion.div
        animate={
          shakes ? { scaleY: [1, 0.96, 1.04, 0.99, 1], scaleX: [1, 1.03, 0.97, 1.01, 1] } : {}
        }
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="absolute left-1/2 top-[262px] h-24 w-72 -translate-x-1/2 rounded-md"
        style={{
          background: "linear-gradient(180deg, #fff 0%, #f3e8ff 40%, #c084fc 100%)",
          boxShadow: "0 20px 40px oklch(0.30 0.2 290 / 0.7), inset 0 -10px 14px rgba(0,0,0,0.2)",
          transformOrigin: "50% 100%",
        }}
      />
      {/* plate */}
      <div
        className="absolute left-1/2 top-[348px] h-3 w-80 -translate-x-1/2 rounded-full bg-foreground/30"
        style={{ filter: "blur(2px)" }}
      />

      {/* tap-to-shake overlay (covers tiers only, leaves candle buttons free) */}
      <button
        type="button"
        onClick={handleShake}
        aria-label="Tap the cake to shake it"
        className="absolute left-1/2 top-[90px] h-[270px] w-[300px] -translate-x-1/2 rounded-2xl"
        style={{ cursor: "none", background: "transparent" }}
      />

      {/* sparkle particles from shake */}
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], y: s.y - 40 - Math.random() * 30 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute left-0 top-0 h-2 w-2 rounded-full"
            style={{ background: s.c, boxShadow: `0 0 8px ${s.c}, 0 0 14px ${s.c}` }}
          />
        ))}
      </div>

      {/* tiny hint */}
      <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        tap the cake
      </div>
    </motion.div>
  );
}

const HAPPY = "HAPPY".split("");
const BIRTHDAY = "BIRTHDAY".split("");

function Birthday() {
  const isMobile = useIsMobile();
  const [lit, setLit] = useState(5);
  const [wished, setWished] = useState(false);
  const [shake, setShake] = useState(false);

  const blow = (i: number) => {
    if (i >= lit) return;
    setLit(i);
    setShake(true);
    setTimeout(() => setShake(false), 400);
    confetti({
      particleCount: 24,
      spread: 60,
      origin: { y: 0.4 },
      colors: ["#f472b6", "#a78bfa", "#fbbf24", "#34d399", "#60a5fa"],
    });
    if (i === 0) {
      setTimeout(() => {
        setWished(true);
        // big celebration
        const colors = ["#f9a8d4", "#fb7185", "#c084fc", "#a78bfa", "#fcd34d", "#34d399"];
        let n = 0;
        const burst = setInterval(() => {
          confetti({
            particleCount: 50,
            spread: 280,
            startVelocity: 24,
            origin: { x: Math.random(), y: Math.random() * 0.5 + 0.1 },
            colors,
          });
          if (++n > 5) clearInterval(burst);
        }, 350);
      }, 600);
    }
  };

  const blowAll = () => {
    for (let i = lit - 1; i >= 0; i--) {
      setTimeout(() => blow(i), (lit - 1 - i) * 220);
    }
  };

  return (
    <section id="birthday" className="relative overflow-hidden px-6 py-32">
      <Balloons reducedMotion={isMobile} />
      <div className="relative mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-xs uppercase tracking-[0.4em] text-primary"
        >
          today is your day
        </motion.p>
        <h2 className="flex flex-wrap justify-center gap-x-4 text-5xl font-semibold leading-[1.1] sm:text-6xl md:gap-x-8 md:text-8xl">
          <span className="whitespace-nowrap">
            {HAPPY.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotate: -20, scale: 0.6 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 14 }}
                className="inline-block text-gradient-rose"
                style={{ textShadow: "0 0 40px oklch(0.72 0.22 350 / 0.55)" }}
              >
                {c}
              </motion.span>
            ))}
          </span>
          <span className="whitespace-nowrap">
            {BIRTHDAY.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotate: -20, scale: 0.6 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: (HAPPY.length + 1 + i) * 0.06,
                  type: "spring",
                  stiffness: 200,
                  damping: 14,
                }}
                className="inline-block text-gradient-rose"
                style={{ textShadow: "0 0 40px oklch(0.72 0.22 350 / 0.55)" }}
              >
                {c}
              </motion.span>
            ))}
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-4 text-2xl font-medium text-gradient-rose md:text-3xl"
        >
          to the prettiest soul I know ✨
        </motion.p>

        <motion.div
          animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative mx-auto mt-16"
        >
          {/* sparkles around cake */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute text-primary"
              style={{
                left: `${10 + ((i * 67) % 80)}%`,
                top: `${(i * 41) % 90}%`,
                fontSize: 12 + (i % 4) * 4,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            >
              ✦
            </motion.span>
          ))}
          <Cake litCount={lit} onBlow={blow} />
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-4">
          {!wished ? (
            <>
              <p className="text-xl font-medium text-foreground/80">
                {lit === 5
                  ? "make a wish, then tap the candles 🎂"
                  : lit > 0
                    ? `${lit} candle${lit > 1 ? "s" : ""} left…`
                    : ""}
              </p>
              <MagneticButton
                onClick={blowAll}
                className="bg-gradient-to-r from-amber-300 via-rose-400 to-violet-400 text-primary-foreground glow-rose"
              >
                <span className="flex items-center gap-2">
                  Blow Them All Out 💨
                  <motion.span
                    animate={{ x: [0, 3, -2, 0], y: [0, -2, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-base"
                  >
                    ✨
                  </motion.span>
                </span>
              </MagneticButton>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-shell mx-auto max-w-2xl space-y-6 rounded-[2rem] px-8 py-10 text-center"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <motion.p
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.6, repeat: Infinity }}
                className="flex items-center justify-center gap-3 text-3xl font-semibold md:text-5xl"
              >
                <span>wish</span>
                <span className="text-gradient-rose">granted</span>
                <span className="text-3xl text-primary">✨</span>
              </motion.p>
              <p className="mx-auto max-w-lg text-base leading-relaxed text-foreground/70 md:text-lg">
                But your birthday gift isn't a cake — it's everything that comes next. I made it all
                for you.
              </p>
              <button
                onClick={() =>
                  document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center gap-2 text-xl font-medium text-primary underline-offset-4 hover:underline"
              >
                unwrap the rest <span aria-hidden="true">↓</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

const STORY = [
  {
    k: "01",
    t: "The first time I noticed you",
    b: "Something quiet shifted. The room kept moving, but I didn't. You felt like a place I already knew.",
    img: photo1,
    position: "center 34%",
  },
  {
    k: "02",
    t: "Every little thing I admire",
    b: "Your laugh that arrives a half-second early. The way you listen with your whole face. Tiny things, all of them loud.",
    img: photo15,
    position: "center 42%",
  },
  {
    k: "03",
    t: "The moments that made me smile",
    b: "Texts I reread. Inside jokes I keep close. Ordinary Tuesdays that suddenly weren't ordinary anymore.",
    img: photo5,
    position: "center 34%",
  },
  {
    k: "04",
    t: "Why you're different",
    b: "You don't try to be remarkable. You just are. Easily. Without effort. Like sunlight choosing a window.",
    img: photo11,
    position: "center 44%",
  },
  {
    k: "05",
    t: "Why you matter to me",
    b: "Because somewhere between hello and now, you became my favorite reason to look up from my phone.",
    img: photo6,
    position: "center 42%",
  },
  {
    k: "06",
    t: "Why life feels brighter",
    b: "Colors are louder. Music hits harder. Even my coffee tastes better. It's you. It's been you.",
    img: photo9,
    position: "center 36%",
  },
];

function Story() {
  return (
    <section id="story" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our Story"
          title="a small timeline of you"
          subtitle="A gentle walk through the little moments that made you unforgettable."
        />
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
          <div className="space-y-16 md:space-y-28">
            {STORY.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 ? "md:[direction:rtl]" : ""}`}
              >
                <div className="section-shell relative rounded-3xl p-8 md:p-10 [direction:ltr]">
                  <div className="absolute -top-4 left-8 rounded-full bg-gradient-to-r from-rose-400 to-violet-400 px-4 py-1 text-xs font-medium tracking-widest text-primary-foreground">
                    {s.k}
                  </div>
                  <h3 className="text-3xl font-semibold md:text-4xl">{s.t}</h3>
                  <p className="mt-4 leading-relaxed text-foreground/70">{s.b}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.03, rotate: i % 2 ? -2 : 2 }}
                  className="section-shell relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl p-2 [direction:ltr] md:max-w-md"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <img
                    src={s.img}
                    alt={s.t}
                    loading="lazy"
                    className="h-full w-full rounded-2xl object-cover"
                    style={{ objectPosition: s.position }}
                  />
                  <div className="absolute inset-x-2 bottom-2 rounded-b-2xl bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-lg font-medium text-white/95">chapter {s.k}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
const GALLERY = [
  { url: photo1, caption: "that smile", span: "row-span-2", position: "center 34%" },
  { url: photo6, caption: "together", span: "col-span-2", position: "center 42%" },
  { url: photo10, caption: "golden hour", span: "row-span-2", position: "center 36%" },
  { url: photo15, caption: "sunlit grace", span: "row-span-2", position: "center 40%" },
  { url: photo4, caption: "sparkler nights", span: "col-span-2", position: "center center" },
  { url: photo9, caption: "soft sunday", span: "row-span-2", position: "center 34%" },
  { url: photo5, caption: "us", span: "row-span-2", position: "center 35%" },
  { url: photo3, caption: "midnight talk", span: "col-span-2", position: "center 38%" },
  { url: photo11, caption: "quiet joy", span: "row-span-2", position: "center 42%" },
  { url: photo2, caption: "festival colors", span: "row-span-2", position: "center 38%" },
  { url: photo16, caption: "mirror glow", span: "row-span-2", position: "center 32%" },
  { url: photo7, caption: "walking home", span: "row-span-2", position: "center 34%" },
  { url: photo8, caption: "cheek to cheek", span: "row-span-2", position: "center 34%" },
  { url: photo12, caption: "little calls", span: "row-span-2", position: "center top" },
  { url: photo14, caption: "sweet chaos", span: "row-span-2", position: "center top" },
  { url: photo13, caption: "soft hello", span: "row-span-2", position: "center top" },
].map((g, i) => ({
  id: i,
  ...g,
  tilt: (i % 3) - 1,
}));

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="gallery" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Memory Gallery"
          title="moments I'd keep forever"
          subtitle="A little collection of the glances, smiles, and quiet magic that stay with me."
        />
        <div className="grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[180px] md:grid-cols-4 md:gap-5">
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -8, rotate: g.tilt * 2, scale: 1.03 }}
              onClick={() => setOpen(g.id)}
              className={`group relative overflow-hidden rounded-2xl section-shell p-2 text-left ${g.span}`}
              style={{ rotate: `${g.tilt}deg`, boxShadow: "var(--shadow-soft)" }}
            >
              <div className="h-full w-full overflow-hidden rounded-xl">
                <img
                  src={g.url}
                  alt={g.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: g.position }}
                />
              </div>
              <div className="absolute inset-x-2 bottom-2 rounded-b-xl bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-3 pt-10 text-sm font-medium text-white/95">
                {g.caption}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-background/80 p-6 backdrop-blur-xl"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass max-w-2xl rounded-3xl p-4"
            >
              <div className="w-full overflow-hidden rounded-2xl">
                <img
                  src={GALLERY[open].url}
                  alt={GALLERY[open].caption}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
              <p className="mt-4 text-center text-2xl font-semibold text-gradient-rose">
                {GALLERY[open].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Letter ---------- */
const LETTER_LINES = [
  "Dear Mumma,",
  "এই যে তুমি বার বার চলে যাই বলো",
  "ধরো তুমি চলে গেছো",
  "খানিকক্ষণ পর ফিরে এসে যদি দেখো",
  "কষ্টে ভিজে যাচ্ছে আমার বুক",
  "আমার চোখের দিকে তাকিয়ে",
  "তুমি কি তখন মুখ লুকাতে পারবে?",
  "",
  "বলো পারবে?",
  "",
  "আর এসে দেখো যদি",
  "হাতে আমার ভেজা রুমাল,",
  "তখনও অপেক্ষায় আমি, যাইনি কোথাও",
  "যদি বলি, এলে কেন?",
  "চাই না তোমায়, চলে যাও যেখানে ছিলে",
  "আমাকে জড়িয়ে না ধরে তখন তুমি",
  "পারবে?",
  "",
  "বলো পারবে?",
  "",
  "এই যে আমাদের কাছে",
  "আমিও আসি আর তুমিও আসো",
  "এ কথা তো জানে দশজনে",
  "ভালবাসাবাসি কতখানি আছে",
  "তোমার আমার",
  "এতো ভালবাসা ছেড়ে",
  "তুমি কি কোথাও যেতে পারবে?",
  "",
  "বলো যেতে পারবে?",
  "",
  "ইতি",
  "তোমার Tuktuk",
];

function Letter() {
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (!opened) return;
    if (visible >= LETTER_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 520);
    return () => clearTimeout(t);
  }, [opened, visible]);

  return (
    <section id="letter" className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="A Letter"
          title="written by hand, sort of"
          subtitle="A quiet note, opened one line at a time."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-shell relative overflow-hidden rounded-[2rem] p-8 md:p-14"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          {!opened ? (
            <button
              onClick={() => setOpened(true)}
              className="group flex w-full flex-col items-center gap-6 py-12"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="text-6xl"
                style={{ filter: "drop-shadow(0 0 30px oklch(0.72 0.22 350 / 0.7))" }}
              >
                💌
              </motion.div>
              <span className="text-2xl font-semibold text-gradient-rose">click to open</span>
            </button>
          ) : (
            <div className="space-y-5 text-xl leading-relaxed text-foreground/90 md:text-2xl">
              {LETTER_LINES.slice(0, visible).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={
                    i === LETTER_LINES.length - 1
                      ? "text-gradient-rose pt-4 text-2xl md:text-3xl"
                      : ""
                  }
                >
                  {line}
                </motion.p>
              ))}
              {visible < LETTER_LINES.length && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block h-7 w-[2px] bg-primary align-middle"
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Reasons ---------- */
const REASONS = [
  { e: "❤️", t: "Your smile", b: "It restarts my whole day." },
  { e: "🌷", t: "Your kindness", b: "It changes the rooms you walk into." },
  { e: "✨", t: "Your laugh", b: "I'd build a city around the sound." },
  { e: "🌙", t: "Your personality", b: "Calm, sharp, soft, brave. All of it." },
  { e: "☕", t: "Ordinary days", b: "You turn them into something cinematic." },
  { e: "💫", t: "Just… you", b: "I keep running out of better words." },
];
function Reasons() {
  return (
    <section id="reasons" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Reasons"
          title="six of many reasons"
          subtitle="Because a heart like yours deserves more than one sentence."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              whileHover={{ y: -8, rotate: -1 }}
              animate={{ y: [0, -4, 0] }}
              className="group relative overflow-hidden rounded-3xl section-shell p-8"
              style={{ animation: `none` }}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 30% 0%, oklch(0.72 0.22 350 / 0.25), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="text-4xl">{r.e}</div>
                <h3 className="mt-4 text-2xl font-semibold">{r.t}</h3>
                <p className="mt-2 text-foreground/70">{r.b}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Surprise ---------- */
function Surprise({ onOpenQuestion }: { onOpenQuestion: () => void }) {
  const openGift = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      startVelocity: 35,
      origin: { y: 0.58 },
      colors: ["#f9a8d4", "#c084fc", "#fb7185", "#fcd34d", "#fff"],
    });
    setTimeout(onOpenQuestion, 650);
  };

  return (
    <section id="surprise" className="relative grid min-h-screen place-items-center px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          eyebrow="A Surprise"
          title="there's one more thing"
          subtitle="Tap the gift box when you're ready."
        />
        <div className="relative grid place-items-center py-10">
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-60 w-60 rounded-full bg-primary/15 blur-2xl"
          />
          <motion.button
            onClick={openGift}
            whileHover={{ scale: 1.08, rotate: -3 }}
            whileTap={{ scale: 0.9, rotate: 6 }}
            className="gift-bounce relative grid h-44 w-44 place-items-center rounded-[2rem] bg-gradient-to-br from-rose-300 via-pink-400 to-violet-400 text-6xl shadow-[0_22px_54px_-24px_oklch(0.72_0.22_350/0.75)] sm:h-52 sm:w-52"
            aria-label="Click here to open the gift box"
          >
            <Gift size={82} className="text-white drop-shadow-lg" />
            <span
              className="absolute -inset-4 rounded-[2.4rem] border border-primary/35"
              style={{ animation: "twinkle 1.6s ease-in-out infinite" }}
            />
            <span className="absolute -bottom-14 whitespace-nowrap rounded-full border border-primary/20 bg-white/35 px-5 py-2 text-sm font-semibold text-primary shadow-lg backdrop-blur-md sm:text-base">
              click here to open the box
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

/* ---------- The Ask ---------- */
type EmojiDrop = {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
};

const NO_TEASES = [
  "too slow 😛",
  "nope, try again 💅",
  "I have tiny legs but big dreams",
  "permission denied by destiny",
  "the no button resigned",
  "almost... hehe",
];

function makeEmojiShower() {
  const emojis = ["💖", "💕", "💗", "💓", "💞", "😘", "💋"];
  return Array.from({ length: 64 }, (_, i) => ({
    id: Date.now() + i,
    emoji: emojis[i % emojis.length],
    x: Math.random() * 100,
    delay: Math.random() * 1.1,
    duration: 2.8 + Math.random() * 1.6,
    size: 18 + Math.random() * 20,
    rotate: (Math.random() - 0.5) * 160,
  }));
}

function celebrate() {
  const colors = ["#f9a8d4", "#fb7185", "#c084fc", "#a78bfa", "#fcd34d"];
  const burstCount = 5;
  for (let i = 0; i < burstCount; i += 1) {
    setTimeout(() => {
      confetti({
        particleCount: 28,
        spread: 190,
        startVelocity: 24,
        scalar: 0.78,
        ticks: 140,
        origin: { x: Math.random(), y: Math.random() * 0.45 + 0.08 },
        colors,
      });
    }, i * 160);
  }
}

function Ask() {
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState<"yes" | "notyet" | null>(null);
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0, s: 1, r: 0 });
  const [emojiShower, setEmojiShower] = useState<EmojiDrop[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(t);
  }, []);

  const sayYes = () => {
    setAnswer("yes");
    setEmojiShower(makeEmojiShower());
    celebrate();
    setTimeout(() => setEmojiShower([]), 5000);
  };

  const dodge = () => {
    const maxX = Math.min(window.innerWidth * 0.34, 340);
    const maxY = Math.min(window.innerHeight * 0.22, 190);
    const direction = dodges % 2 === 0 ? 1 : -1;
    const x = direction * (90 + Math.random() * maxX);
    const y = (Math.random() - 0.48) * maxY * 2;
    const s = Math.max(0.68, 1 - Math.min(dodges, 6) * 0.045);
    const r = direction * (180 + Math.random() * 340);
    setPos({ x, y, s, r });
    setDodges((d) => d + 1);
  };

  return (
    <section
      id="ask"
      className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-32"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.45 0.25 350 / 0.5), transparent 60%)",
          animation: "aurora-shift 10s ease-in-out infinite",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {emojiShower.map((drop) => (
          <motion.span
            key={drop.id}
            initial={{ y: "-12vh", opacity: 0, rotate: 0, scale: 0.6 }}
            animate={{ y: "112vh", opacity: [0, 1, 0.9, 0], rotate: drop.rotate }}
            transition={{ duration: drop.duration, delay: drop.delay, ease: "easeIn" }}
            className="absolute top-0 will-change-transform"
            style={{ left: `${drop.x}%`, fontSize: drop.size }}
          >
            {drop.emoji}
          </motion.span>
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <AnimatePresence mode="wait">
          {answer === "yes" ? (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-8xl"
              >
                💖
              </motion.div>
              <h2 className="text-5xl font-semibold leading-[1.18] md:text-7xl">
                You just made me the{" "}
                <em className="gradient-text-safe text-gradient-rose">happiest person alive.</em>
              </h2>
              <p className="mx-auto max-w-2xl text-2xl font-medium leading-relaxed text-gradient-rose md:text-3xl">
                I love you so much, Mummaa. Happy Birthday, Babyy. You are my favorite yes forever.
              </p>
            </motion.div>
          ) : answer === "notyet" ? (
            <motion.div
              key="not"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-7xl">🙈</div>
              <h2 className="text-4xl font-semibold md:text-5xl">
                I'll keep hoping, because{" "}
                <em className="text-gradient-rose">you're worth waiting for</em> ❤️
              </h2>
              <button
                onClick={() => {
                  setAnswer(null);
                  setDodges(0);
                  setPos({ x: 0, y: 0, s: 1 });
                }}
                className="text-sm uppercase tracking-widest text-foreground/60 underline-offset-4 hover:text-primary hover:underline"
              >
                take me back
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs uppercase tracking-[0.5em] text-primary"
              >
                I have something to ask you…
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mx-auto flex max-w-xl justify-center rounded-full border border-primary/20 bg-white/5 px-4 py-2 text-sm text-foreground/70 backdrop-blur"
              >
                take your time, choose with your heart
              </motion.div>
              <AnimatePresence>
                {revealed && (
                  <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.4 }}
                    className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.1] md:text-7xl"
                    style={{ textShadow: "0 0 60px oklch(0.72 0.22 350 / 0.6)" }}
                  >
                    <span className="block">Will you be my</span>
                    <span className="mt-2 flex items-center justify-center gap-4 text-gradient-rose">
                      <span>girlfriend</span>
                      <motion.span
                        animate={{ y: [0, -4, 0], rotate: [-8, 8, -4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/35 text-4xl leading-none text-primary shadow-[0_0_30px_oklch(0.72_0.22_350/0.35)] backdrop-blur"
                        aria-hidden="true"
                      >
                        ?
                      </motion.span>
                    </span>
                  </motion.h2>
                )}
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <MagneticButton
                  onClick={sayYes}
                  className="bg-gradient-to-r from-rose-400 via-primary to-violet-400 px-12 py-5 text-lg text-primary-foreground glow-rose"
                >
                  <span className="flex items-center gap-2">
                    YES <Heart fill="currentColor" size={18} />
                  </span>
                </MagneticButton>
                <motion.button
                  onMouseEnter={dodge}
                  onFocus={dodge}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    dodge();
                  }}
                  onTouchStart={(event) => {
                    event.preventDefault();
                    dodge();
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    dodge();
                  }}
                  animate={{ x: pos.x, y: pos.y, scale: pos.s, rotate: pos.r }}
                  transition={{ type: "spring", stiffness: 420, damping: 14 }}
                  className="select-none rounded-full glass px-10 py-5 text-base font-semibold text-foreground/80 hover:text-primary"
                >
                  NO 🙈
                </motion.button>
              </motion.div>
              {dodges > 0 && (
                <motion.p
                  key={dodges}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-foreground/45"
                >
                  {NO_TEASES[(dodges - 1) % NO_TEASES.length]}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Parallax wrapper ---------- */
function ParallaxAccent() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  return (
    <motion.div style={{ y }} className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen">
      <div
        className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.25 350 / 0.4), transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute right-[10%] top-[40%] h-96 w-96 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.50 0.25 290 / 0.35), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </motion.div>
  );
}

/* ---------- Main ---------- */
export function ProposalExperience() {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPerformanceSensitivePage = currentIndex >= 6;

  useEffect(() => {
    const sectionIds = SECTIONS.map((section) => section.id);
    const currentId = sectionIds[currentIndex];
    if (!currentId) return;
    document
      .getElementById(currentId)
      ?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
  }, [currentIndex, shouldReduceMotion]);

  const handleNext = () => {
    setCurrentIndex((index) => (index >= SECTIONS.length - 1 ? 0 : index + 1));
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <AuroraBackground />
      <Stars />
      <FloatingHearts />
      {!isPerformanceSensitivePage && !isMobile && !shouldReduceMotion && <MouseGlow />}
      {!isPerformanceSensitivePage && !isMobile && !shouldReduceMotion && <CustomCursor />}
      <SectionNavigator currentIndex={currentIndex} onNext={handleNext} />
      <main className="relative">
        <section className={currentIndex === 0 ? "block" : "hidden"}>
          <Hero />
        </section>
        <section className={currentIndex === 1 ? "block" : "hidden"}>
          <Birthday />
        </section>
        <section className={currentIndex === 2 ? "block" : "hidden"}>
          <Story />
        </section>
        <section className={currentIndex === 3 ? "block" : "hidden"}>
          <Gallery />
        </section>
        <section className={currentIndex === 4 ? "block" : "hidden"}>
          <Letter />
        </section>
        <section className={currentIndex === 5 ? "block" : "hidden"}>
          <Reasons />
        </section>
        <section className={currentIndex === 6 ? "block" : "hidden"}>
          <Surprise onOpenQuestion={() => setCurrentIndex(7)} />
        </section>
        <section className={currentIndex === 7 ? "block" : "hidden"}>
          <Ask />
        </section>
        <footer className="relative px-6 py-16 text-center">
          <p className="text-xl font-medium text-gradient-rose">— made entirely for you ♥</p>
        </footer>
      </main>
    </>
  );
}
