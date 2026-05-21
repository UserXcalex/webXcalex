"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Rocket, Shield, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const cyclingPhrases = [
    t("phrases.infra"),
    t("phrases.software"),
    t("phrases.ai"),
    t("phrases.platforms"),
    t("phrases.experiences"),
  ];

  const trustSignals = [
    t("trust.execution"),
    t("trust.custom"),
    t("trust.architecture"),
    t("trust.brands"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % cyclingPhrases.length);
        setFlipping(false);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [cyclingPhrases.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; alphaDir: number; colorIdx: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      [59, 130, 246],
      [139, 92, 246],
      [96, 165, 250],
    ];

    const count = Math.floor((window.innerWidth * window.innerHeight) / 16000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.05,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        colorIdx: Math.floor(Math.random() * colors.length),
      });
    }

    const maxDist = 130;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.alphaDir * 0.003;
        if (p.alpha >= 0.55 || p.alpha <= 0.03) p.alphaDir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const [r, g, b] = colors[p.colorIdx];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / maxDist) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const bottomStats = [
    { icon: Rocket, value: "3×", label: t("trust.execution") },
    { icon: Shield, value: "99.9%", label: "SLA Garantizado" },
    { icon: Zap, value: "40+", label: "Sistemas Entregados" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-white dark:bg-[#02020a] transition-colors duration-500"
    >
      <style>{`
        @keyframes flip-out {
          0%   { transform: perspective(600px) rotateX(0deg); opacity: 1; }
          100% { transform: perspective(600px) rotateX(-90deg); opacity: 0; }
        }
        @keyframes flip-in {
          0%   { transform: perspective(600px) rotateX(90deg); opacity: 0; }
          100% { transform: perspective(600px) rotateX(0deg); opacity: 1; }
        }
        .phrase-flip-out { animation: flip-out 0.35s ease-in forwards; transform-origin: bottom center; }
        .phrase-flip-in  { animation: flip-in  0.35s ease-out forwards; transform-origin: top center; }

        @keyframes hero-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .h-l1 { animation: hero-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .h-l2 { animation: hero-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
        .h-l3 { animation: hero-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.32s both; }
        .h-sub{ animation: hero-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.48s both; }
        .h-cta{ animation: hero-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.62s both; }
        .h-tr { animation: hero-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.76s both; }
        .h-card{animation: hero-up 1.1s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
        .h-bar { animation: hero-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.9s both; }
      `}</style>

      {/* Light mode: soft gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 70% 40%, rgba(219,234,254,0.55) 0%, rgba(238,242,255,0.3) 40%, transparent 70%)",
        }}
      />
      {/* Light mode: subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Dark mode: grid texture */}
      <div className="absolute inset-0 grid-bg opacity-0 dark:opacity-100 pointer-events-none" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-15 dark:opacity-55"
        aria-hidden="true"
      />

      {/* Dark mode glows only */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)",
          filter: "blur(56px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-40 w-[550px] h-[550px] rounded-full pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-12 w-full">
          <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-8 items-center">

            {/* ── Left: Copy ── */}
            <div className="max-w-3xl">

              {/* Badge */}
              <div className="h-l1 inline-flex items-center gap-2 px-3.5 py-1.5 mb-7 rounded-full border border-blue-500/20 dark:border-blue-500/25 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.28em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                {t("badge")}
              </div>

              {/* Headline */}
              <h1 className="font-black leading-[1.04] tracking-[-0.03em] text-slate-900 dark:text-white mb-7"
                  style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.25rem)" }}>
                <span className="h-l1 block">{t("build")}</span>
                <span
                  className="h-l2 block overflow-hidden"
                  style={{ perspective: "600px" }}
                >
                  <span
                    key={phraseIndex}
                    className={`inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-violet-500 dark:from-blue-400 dark:via-blue-300 dark:to-violet-400 bg-clip-text text-transparent pb-1 ${flipping ? "phrase-flip-out" : "phrase-flip-in"}`}
                  >
                    {cyclingPhrases[phraseIndex]}
                  </span>
                </span>
                <span className="h-l3 block">{t("smart")}</span>
                <span className="h-l3 block">{t("with_xcalex")}</span>
              </h1>

              {/* Sub */}
              <p className="h-sub text-base lg:text-[17px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[500px] mb-10 font-medium">
                {t("description")}
              </p>

              {/* CTAs */}
              <div className="h-cta flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href="#contact"
                  id="hero-primary-cta"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: "0 0 32px rgba(59,130,246,0.35), 0 4px 16px rgba(59,130,246,0.25)" }}
                >
                  {t("cta_consulting")}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a
                  href="#services"
                  id="hero-secondary-cta"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/80 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-500/40 font-black text-[11px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300 bg-transparent hover:bg-blue-500/5"
                >
                  {t("cta_capabilities")}
                </a>
              </div>

              {/* Trust signals */}
              <div className="h-tr flex flex-wrap gap-x-6 gap-y-2">
                {trustSignals.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[9px] font-black tracking-[0.28em] uppercase"
                  >
                    <span className="w-4 h-px bg-blue-500/40" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Floating Dashboard ── */}
            <div className="hidden lg:flex h-card justify-center">
              <div className="relative w-full max-w-[440px] animate-float-slow">

                {/* Main dashboard card */}
                <div
                  className="relative bg-white dark:bg-[#0c1428]/95 backdrop-blur-2xl rounded-2xl p-5"
                  style={{
                    border: "1px solid rgba(15,23,42,0.08)",
                    boxShadow: "0 4px 24px rgba(59,130,246,0.08), 0 24px 64px rgba(15,23,42,0.1)",
                  }}
                >
                  {/* Window bar */}
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-wider">xcalex.analytics</span>
                  </div>

                  {/* Metric cards */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: "Conversión", val: "+47%", color: "text-green-600 dark:text-green-400" },
                      { label: "Proyectos",  val: "40+",  color: "text-blue-600 dark:text-blue-400" },
                      { label: "SLA",        val: "99.9%",color: "text-violet-600 dark:text-violet-400" },
                    ].map((m) => (
                      <div key={m.label} className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 text-center border border-slate-100 dark:border-white/5">
                        <div className={`text-base font-black ${m.color}`}>{m.val}</div>
                        <div className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 tracking-wide uppercase">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="bg-slate-50/50 dark:bg-white/[0.03] rounded-xl p-3 mb-3 border border-slate-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rendimiento</span>
                      <span className="text-[10px] font-black text-green-600 dark:text-green-400">↑ 23% MoM</span>
                    </div>
                    <div className="h-14 flex items-end gap-1">
                      {[28, 45, 35, 60, 42, 72, 55, 82, 65, 88, 70, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${h}%`,
                            background: i >= 10
                              ? "linear-gradient(to top, #3b82f6, #818cf8)"
                              : "rgba(59,130,246,0.15)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Status row */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-slate-500 dark:text-slate-500 font-medium">Sistemas activos</span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-600">3 proyectos en vivo</span>
                  </div>
                </div>

                {/* Floating badge: deploy */}
                <div
                  className="absolute -top-4 -right-4 bg-white dark:bg-[#0c1428]/95 backdrop-blur-xl rounded-xl px-3.5 py-2.5 animate-float-del"
                  style={{
                    border: "1px solid rgba(59,130,246,0.15)",
                    boxShadow: "0 4px 16px rgba(59,130,246,0.1), 0 8px 24px rgba(15,23,42,0.08)",
                  }}
                >
                  <div className="text-[9px] text-slate-400 mb-0.5 uppercase tracking-wider font-bold">Nuevo Deploy</div>
                  <div className="text-[11px] font-black text-slate-800 dark:text-white">E-commerce Pro ✓</div>
                </div>

                {/* Floating badge: performance */}
                <div
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-[#0c1428]/95 backdrop-blur-xl rounded-xl px-3.5 py-2.5 animate-float"
                  style={{
                    border: "1px solid rgba(139,92,246,0.15)",
                    boxShadow: "0 4px 16px rgba(139,92,246,0.08), 0 8px 24px rgba(15,23,42,0.08)",
                  }}
                >
                  <div className="text-[9px] text-slate-400 mb-0.5 uppercase tracking-wider font-bold">Performance</div>
                  <div className="text-[11px] font-black text-green-600 dark:text-green-400">● 3× más rápido</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom stats strip ── */}
      <div className="h-bar relative z-10 border-t border-slate-100 dark:border-white/[0.05] bg-white/90 dark:bg-white/[0.025] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-center gap-8 sm:gap-16 flex-wrap">
          {bottomStats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900 dark:text-white font-black text-lg leading-none">{s.value}</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-[0.22em]">{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 right-8 z-10 hidden sm:flex flex-col items-center gap-1 text-slate-300 dark:text-slate-700">
        <span className="text-[9px] tracking-[0.3em] uppercase font-black">{t("scroll")}</span>
        <ChevronDown size={12} className="animate-bounce opacity-40" />
      </div>
    </section>
  );
}
