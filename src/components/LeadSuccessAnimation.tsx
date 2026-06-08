"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Confetti
───────────────────────────────────────────── */
type Particle = {
  x: number; y: number; vx: number; vy: number;
  color: string; size: number;
  rotation: number; rotationSpeed: number;
  opacity: number; shape: "rect" | "circle";
};

const COLORS = ["#3b82f6","#8b5cf6","#a78bfa","#60a5fa","#34d399","#fbbf24","#f472b6","#fff"];

function ConfettiCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const fired = useRef(false);

  useEffect(() => {
    if (!active || fired.current) return;
    fired.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height * 0.35;

    const particles: Particle[] = Array.from({ length: 100 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 5 + Math.random() * 10;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 7 + Math.random() * 9,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        opacity: 1,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.38; p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.013;
        if (p.opacity <= 0) return;
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      });
      if (alive) raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

/* ─────────────────────────────────────────────
   Animated checkmark
───────────────────────────────────────────── */
function AnimatedCheck() {
  return (
    <svg viewBox="0 0 56 56" width="72" height="72">
      <style>{`
        @keyframes ring-draw  { from{stroke-dashoffset:175} to{stroke-dashoffset:0} }
        @keyframes check-draw { from{stroke-dashoffset:50}  to{stroke-dashoffset:0} }
        @keyframes ring-pulse { 0%,100%{filter:drop-shadow(0 0 4px #3b82f6)} 50%{filter:drop-shadow(0 0 12px #8b5cf6)} }
        .svg-ring  { stroke-dasharray:175; stroke-dashoffset:175; animation: ring-draw 0.55s cubic-bezier(0.65,0,0.45,1) forwards, ring-pulse 2s ease-in-out 0.6s infinite; }
        .svg-check { stroke-dasharray:50;  stroke-dashoffset:50;  animation: check-draw 0.4s cubic-bezier(0.65,0,0.45,1) 0.5s forwards; }
      `}</style>
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
      <circle className="svg-ring" cx="28" cy="28" r="26"
        fill="none" stroke="url(#g1)" strokeWidth="2.5" strokeLinecap="round"/>
      <polyline className="svg-check" points="16,28 24,36 40,20"
        fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main component
   phase: "sending" → shows progress bar
   phase: "success" → shows checkmark + confetti
───────────────────────────────────────────── */
type Phase = "sending" | "success";

type Props = {
  phase: Phase | null;           // null = hidden
  onDone: () => void;
  title?: string;
  subtitle?: string;
};

export default function LeadSuccessAnimation({
  phase, onDone,
  title    = "¡Lead recibido!",
  subtitle = "Nos pondremos en contacto contigo muy pronto.",
}: Props) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Progress bar while sending */
  useEffect(() => {
    if (phase === "sending") {
      setProgress(0);
      // Ramps to ~85% quickly, then slows waiting for real response
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 85) { clearInterval(intervalRef.current!); return p; }
          return p + (85 - p) * 0.07 + 0.4;
        });
      }, 40);
    }
    if (phase === "success") {
      // Jump to 100%
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase]);

  /* Auto-close after success */
  useEffect(() => {
    if (phase !== "success") return;
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  if (!phase) return null;

  const isSending = phase === "sending";
  const isSuccess = phase === "success";

  return (
    <div
      className="fixed inset-0 z-[9997] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(2,2,10,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        animation: "xcl-fade-in 0.3s ease both",
      }}
      onClick={isSuccess ? onDone : undefined}
    >
      <style>{`
        @keyframes xcl-fade-in   { from{opacity:0} to{opacity:1} }
        @keyframes xcl-card-up   { from{opacity:0;transform:translateY(24px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes xcl-text-up   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes xcl-glow-beat { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        @keyframes xcl-spin-bar  { from{transform:translateX(-100%)} to{transform:translateX(400%)} }
        @keyframes xcl-prog-fill { from{width:0%} to{width:100%} }
      `}</style>

      {/* Card */}
      <div
        className="relative w-full overflow-hidden rounded-3xl flex flex-col items-center text-center px-8 py-10"
        style={{
          maxWidth: 400,
          backgroundColor: "#0d0d1e",
          border: "1px solid rgba(59,130,246,0.25)",
          boxShadow: "0 0 0 1px rgba(139,92,246,0.12), 0 40px 80px rgba(0,0,0,0.7), 0 0 80px rgba(59,130,246,0.07)",
          animation: "xcl-card-up 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti — only on success */}
        <ConfettiCanvas active={isSuccess} />

        {/* Glow orb */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 200, height: 200, top: -60, left: "50%", transform: "translateX(-50%)",
            background: isSuccess
              ? "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            animation: "xcl-glow-beat 2.2s ease-in-out infinite",
            transition: "background 0.5s",
          }}
        />

        {/* Icon area */}
        <div className="relative z-10 mb-5 h-20 flex items-center justify-center">
          {isSending ? (
            /* Spinner while sending */
            <div
              className="w-16 h-16 rounded-full border-[3px] border-white/10 border-t-blue-500"
              style={{ animation: "spin 0.8s linear infinite" }}
            />
          ) : (
            <AnimatedCheck />
          )}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-black text-white tracking-tight mb-2 relative z-10"
          style={{ animation: "xcl-text-up 0.4s ease 0.15s both" }}
        >
          {isSending ? "Enviando tu solicitud" : title}
          <span className="text-blue-400">.</span>
        </h3>

        {/* Subtitle */}
        <p
          className="text-slate-400 text-[13px] font-medium leading-relaxed mb-7 relative z-10"
          style={{ animation: "xcl-text-up 0.4s ease 0.25s both" }}
        >
          {isSending ? "Un momento, estamos procesando tu información…" : subtitle}
        </p>

        {/* Progress bar */}
        <div
          className="relative z-10 w-full h-[3px] rounded-full overflow-hidden"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            animation: "xcl-text-up 0.4s ease 0.3s both",
          }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #a78bfa)",
              transition: phase === "success" ? "width 0.4s ease" : "width 0.1s linear",
            }}
          />
          {/* Shimmer on the bar */}
          {isSending && (
            <div
              className="absolute top-0 h-full w-1/4 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                animation: "xcl-spin-bar 1.2s ease-in-out infinite",
              }}
            />
          )}
        </div>

        {/* Bottom label */}
        <p
          className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 relative z-10"
          style={{ animation: "xcl-text-up 0.4s ease 0.35s both" }}
        >
          {isSending ? `${Math.round(progress)}% — procesando…` : "Cerrando automáticamente…"}
        </p>
      </div>
    </div>
  );
}
