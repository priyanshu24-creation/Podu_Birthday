import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let rx = 0,
      ry = 0,
      tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx - 4}px, ${ty - 4}px)`;
      }
      if (Math.random() > 0.78) {
        idRef.current += 1;
        const id = idRef.current;
        setTrail((p) => [...p.slice(-12), { id, x: tx, y: ty }]);
        setTimeout(() => setTrail((p) => p.filter((t) => t.id !== id)), 900);
      }
    };
    const loop = () => {
      rx += (tx - rx) * 0.15;
      ry += (ty - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      }
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-primary/60 mix-blend-screen"
        style={{ boxShadow: "0 0 20px oklch(0.72 0.22 350 / 0.6)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-primary"
        style={{ boxShadow: "0 0 12px oklch(0.72 0.22 350)" }}
      />
      {trail.map((t) => (
        <span
          key={t.id}
          className="pointer-events-none fixed z-[99] text-primary/70"
          style={{
            left: t.x - 6,
            top: t.y - 6,
            fontSize: 12,
            animation: "float-up 0.9s ease-out forwards",
          }}
        >
          ♥
        </span>
      ))}
    </>
  );
}

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, oklch(0.72 0.22 350 / 0.18), transparent 60%)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}
