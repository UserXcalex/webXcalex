"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  // Reconstruct arrays from translations
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

  // Cycle phrases every 2.5s with a flip animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % cyclingPhrases.length);
        setFlipping(false);
      }, 350); // half of animation duration
    }, 2800);
    return () => clearInterval(interval);
  }, [cyclingPhrases.length]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; alphaDir: number;
    }> = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.floor((window.innerWidth * window.innerHeight) / 22000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width * 0.5,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.3 + 0.05,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const maxDist = 120;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.alphaDir * 0.002;
        if (p.alpha >= 0.4 || p.alpha <= 0.03) p.alphaDir *= -1;
        if (p.x < 0) p.x = canvas.width * 0.5;
        if (p.x > canvas.width * 0.5) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${p.alpha * 0.7})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${(1 - dist / maxDist) * 0.07})`;
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-500"
    >
      {/* Flip animation styles */}
      <style>{`
        @keyframes flip-out {
          0%   { transform: perspective(600px) rotateX(0deg); opacity: 1; }
          100% { transform: perspective(600px) rotateX(-90deg); opacity: 0; }
        }
        @keyframes flip-in {
          0%   { transform: perspective(600px) rotateX(90deg); opacity: 0; }
          100% { transform: perspective(600px) rotateX(0deg); opacity: 1; }
        }
        .phrase-flip-out {
          animation: flip-out 0.35s ease-in forwards;
          transform-origin: bottom center;
        }
        .phrase-flip-in {
          animation: flip-in 0.35s ease-out forwards;
          transform-origin: top center;
        }
      `}</style>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-50"
        aria-hidden="true"
      />

      {/* Hero Image — right side blending into bg */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
          alt="Equipo Xcalex"
          className="w-full h-full object-cover object-center"
        />
        {/* Left gradient fade */}
        <div className="absolute inset-0 dark:hidden"
          style={{ background: "linear-gradient(to right, white 0%, white 10%, transparent 45%)" }} />
        <div className="absolute inset-0 hidden dark:block"
          style={{ background: "linear-gradient(to right, #020617 0%, #020617 10%, transparent 45%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 dark:hidden"
          style={{ background: "linear-gradient(to bottom, transparent 0%, white 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 hidden dark:block"
          style={{ background: "linear-gradient(to bottom, transparent 0%, #020617 100%)" }} />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 dark:hidden"
          style={{ background: "linear-gradient(to bottom, white 0%, transparent 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-24 hidden dark:block"
          style={{ background: "linear-gradient(to bottom, #020617 0%, transparent 100%)" }} />
      </div>

      {/* Content — left column */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 lg:pt-36 pb-20 lg:pb-24 w-full">
        <div className="max-w-3xl lg:max-w-[62%]">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-blue-600/10 dark:border-blue-500/20 bg-blue-600/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            {t("badge")}
          </div>

          {/* Headline with cycling phrase */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[58px] font-black leading-[1.1] tracking-[-0.02em] text-slate-900 dark:text-white mb-6">
            <span className="block">{t("build")}</span>
            {/* CYCLING PHRASE — flip animation */}
            <span
              className="block overflow-hidden whitespace-nowrap"
              style={{ perspective: "600px" }}
            >
              <span
                key={phraseIndex}
                className={`inline-block whitespace-nowrap bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400 bg-clip-text text-transparent pb-1 ${flipping ? "phrase-flip-out" : "phrase-flip-in"}`}
              >
                {cyclingPhrases[phraseIndex]}
              </span>
            </span>
            <span className="block">{t("smart")}</span>
            <span className="block">{t("with_xcalex")}</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mb-9 font-medium">
            {t("description")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
            <a
              href="#contact"
              id="hero-primary-cta"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
            >
              {t("cta_consulting")}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#services"
              id="hero-secondary-cta"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300"
            >
              {t("cta_capabilities")}
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {trustSignals.map((s) => (
              <div
                key={s}
                className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[9px] font-black tracking-widest uppercase"
              >
                <span className="w-4 h-[1px] bg-blue-600/30" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-300 dark:text-slate-600">
        <span className="text-[10px] tracking-[0.3em] uppercase font-black">{t("scroll")}</span>
        <ChevronDown size={14} className="animate-bounce opacity-40" />
      </div>
    </section>
  );
}
