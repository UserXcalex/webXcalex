"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { CONTENT, LINKS, type DevLocale } from "./content";
import DevTerminal from "./DevTerminal";
import DevPipeline from "./DevPipeline";
import { useInView } from "@/hooks/useInView";

/* ============================================================
   Helpers
   ============================================================ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-4 flex items-center gap-2">
      <span className="w-6 h-px bg-blue-400/60" />
      {children}
    </p>
  );
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

function RoleRotator({ roles }: { roles: readonly string[] }) {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setOut(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % roles.length);
        setOut(false);
      }, 350);
    }, 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span
      className={`inline-block gradient-text transition-all duration-300 ${
        out ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
      }`}
    >
      {roles[idx]}
    </span>
  );
}

function Avatar() {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28">
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-500 via-violet-500 to-emerald-400 adev-spin-slow opacity-80" />
      <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#02020a] bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/andres.png"
            alt="Andrés Cáceres"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-3xl font-black text-white tracking-tight">AC</span>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */

export default function AndresDev({ locale }: { locale: DevLocale }) {
  const t = CONTENT[locale];
  const spotRef = useRef<HTMLDivElement>(null);

  // Spotlight que sigue el mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = spotRef.current;
      if (!el) return;
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(59,130,246,0.07), transparent 60%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#02020a] text-slate-200 overflow-x-clip selection:bg-blue-500/30">
      <style>{ADEV_CSS}</style>

      {/* Fondo */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-60" />
      <div ref={spotRef} className="fixed inset-0 pointer-events-none z-[1]" />
      <div className="hero-glow fixed inset-0 z-[1]" />

      {/* ============ NAV ============ */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.05] bg-[#02020a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-mono text-sm font-bold text-white">
            <span className="text-blue-400">~/</span>andresdev
            <span className="adev-cursor-sm" />
          </a>
          <div className="hidden sm:flex items-center gap-7 text-[13px] font-semibold text-slate-400">
            <a href="#proyectos" className="hover:text-white transition-colors">{t.nav.projects}</a>
            <a href="#especialidad" className="hover:text-white transition-colors">{t.nav.pipeline}</a>
            <a href="#stack" className="hover:text-white transition-colors">{t.nav.stack}</a>
            <a href="#contacto" className="hover:text-white transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section id="top" className="relative z-[2] pt-32 lg:pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* Izquierda */}
          <div>
            <div className="adev-fade-up" style={{ animationDelay: "0ms" }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-300 text-xs font-bold tracking-wide">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {t.hero.available}
              </span>
            </div>

            <div className="adev-fade-up mt-7 flex items-center gap-5" style={{ animationDelay: "120ms" }}>
              <Avatar />
              <div>
                <p className="text-slate-400 font-medium">{t.hero.greeting}</p>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.05]">
                  {t.hero.name}
                  <span className="text-blue-500">.</span>
                </h1>
              </div>
            </div>

            <h2
              className="adev-fade-up mt-6 text-2xl sm:text-3xl font-extrabold h-[42px]"
              style={{ animationDelay: "240ms" }}
            >
              <RoleRotator roles={t.hero.roles} />
            </h2>

            <p
              className="adev-fade-up mt-5 text-slate-400 leading-relaxed max-w-lg"
              style={{ animationDelay: "360ms" }}
            >
              {t.hero.tagline}
            </p>

            <p
              className="adev-fade-up mt-4 flex items-center gap-1.5 text-[13px] text-slate-500"
              style={{ animationDelay: "420ms" }}
            >
              <MapPin className="w-3.5 h-3.5" /> Cúcuta, Colombia · UTC-5
            </p>

            <div className="adev-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "480ms" }}>
              <a
                href="#proyectos"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-[0_8px_32px_rgba(59,130,246,0.35)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
              >
                {t.hero.ctaProjects}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={LINKS.cv}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/[0.04] text-white text-sm font-bold transition-all hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                {t.hero.ctaCv}
              </a>
            </div>
          </div>

          {/* Derecha: terminal */}
          <div className="adev-fade-up" style={{ animationDelay: "300ms" }}>
            <DevTerminal title={t.terminal.title} profile={t.terminal} />
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold">{t.hero.scroll}</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative z-[2] px-6 pb-24">
        <Reveal className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.07]">
            {t.stats.map((s, i) => (
              <div key={i} className="bg-[#04040f] px-6 py-8 text-center">
                <p className="text-4xl font-black gradient-text-blue">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[12px] text-slate-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ SOBRE MÍ ============ */}
      <section className="relative z-[2] px-6 pb-28">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Kicker>{t.about.kicker}</Kicker>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {t.about.title}
              <span className="text-blue-500">.</span>
            </h2>
          </Reveal>
          {t.about.body.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <p className="mt-5 text-slate-400 leading-relaxed text-[15px]">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ PIPELINE / ESPECIALIDAD ============ */}
      <section id="especialidad" className="relative z-[2] px-6 pb-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {t.pipeline.kicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t.pipeline.title}
              <span className="text-blue-500">.</span>
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed text-[15px]">{t.pipeline.subtitle}</p>
          </Reveal>
          <Reveal delay={150}>
            <DevPipeline
              nodes={[t.pipeline.nodes.meta, t.pipeline.nodes.n8n, t.pipeline.nodes.crm, t.pipeline.nodes.wa]}
              caption={t.pipeline.caption}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ PROYECTOS ============ */}
      <section id="proyectos" className="relative z-[2] px-6 pb-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <Kicker>{t.projects.kicker}</Kicker>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t.projects.title}
              <span className="text-blue-500">.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {t.projects.items.map((proj, i) => (
              <Reveal key={proj.name} delay={(i % 2) * 120}>
                <article className="glass-card group relative rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-black text-white tracking-tight">{proj.name}</h3>
                    <span className="shrink-0 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border border-blue-400/30 bg-blue-400/[0.08] text-blue-300">
                      {proj.tag}
                    </span>
                  </div>

                  <div className="mt-5 space-y-4 text-[13.5px] leading-relaxed flex-1">
                    <div className="flex gap-3">
                      <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0 text-amber-400/80" />
                      <p className="text-slate-400">
                        <span className="font-bold text-amber-300/90">{t.projects.problemLabel}: </span>
                        {proj.problem}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Wrench className="w-4 h-4 mt-0.5 shrink-0 text-sky-400/80" />
                      <p className="text-slate-400">
                        <span className="font-bold text-sky-300/90">{t.projects.solutionLabel}: </span>
                        {proj.solution}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400/80" />
                      <p className="text-slate-400">
                        <span className="font-bold text-emerald-300/90">{t.projects.resultLabel}: </span>
                        {proj.result}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap gap-2">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold font-mono text-slate-400 bg-white/[0.04] border border-white/[0.07]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STACK ============ */}
      <section id="stack" className="relative z-[2] px-6 pb-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <Kicker>{t.stack.kicker}</Kicker>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t.stack.title}
              <span className="text-blue-500">.</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.stack.groups.map((group, i) => (
              <Reveal key={group.name} delay={i * 100}>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 h-full">
                  <p className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-400 mb-4">
                    {group.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:border-blue-400/40 hover:text-white transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACTO ============ */}
      <section id="contacto" className="relative z-[2] px-6 pb-20 scroll-mt-24">
        <Reveal className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-blue-500/[0.07] to-transparent px-8 py-14 text-center overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,130,246,0.12), transparent 70%)",
              }}
            />
            <Kicker>
              <span className="mx-auto">{t.contact.kicker}</span>
            </Kicker>
            <h2 className="relative text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t.contact.title}
              <span className="text-blue-500">.</span>
            </h2>
            <p className="relative mt-4 text-slate-400 text-[15px] max-w-xl mx-auto">{t.contact.subtitle}</p>

            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${LINKS.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 text-sm font-black hover:bg-slate-200 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                {t.contact.email}
              </a>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-300 text-sm font-black hover:bg-emerald-400/[0.15] transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                {t.contact.whatsapp}
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white text-sm font-black hover:bg-white/[0.05] transition-all hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-[2] border-t border-white/[0.05] px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-600">
          <p className="font-mono">
            {t.contact.footer} · <span className="text-slate-500">Next.js + Tailwind</span>
          </p>
          <a
            href={LINKS.xcalex}
            className="font-semibold text-slate-500 hover:text-blue-400 transition-colors"
          >
            xcalex.co ↗
          </a>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================
   CSS propio de la página (scoped por prefijo adev-)
   ============================================================ */
const ADEV_CSS = `
@keyframes adev-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.adev-fade-up { animation: adev-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both; }

@keyframes adev-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
.adev-cursor {
  display: inline-block;
  width: 8px; height: 16px;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: #60a5fa;
  animation: adev-blink 1.1s step-end infinite;
}
.adev-cursor-sm {
  display: inline-block;
  width: 6px; height: 12px;
  margin-left: 3px;
  background: #60a5fa;
  animation: adev-blink 1.1s step-end infinite;
}

@keyframes adev-spin { to { transform: rotate(360deg); } }
.adev-spin-slow { animation: adev-spin 8s linear infinite; }

/* Pipeline */
.adev-pipeline-live .adev-node {
  animation: adev-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes adev-node-pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--node-glow), 0 8px 24px rgba(0,0,0,0.4); }
  50%      { box-shadow: 0 0 0 10px transparent, 0 8px 32px var(--node-glow); }
}
.adev-pipeline-live .adev-node-pulse { animation: adev-node-pulse 3s ease-in-out infinite; }

@keyframes adev-packet {
  0%   { left: 0%;   opacity: 0; transform: translateY(-50%) scale(0.6); }
  12%  { opacity: 1; transform: translateY(-50%) scale(1); }
  88%  { opacity: 1; transform: translateY(-50%) scale(1); }
  100% { left: 100%; opacity: 0; transform: translateY(-50%) scale(0.6); }
}
.adev-packet {
  position: absolute;
  top: 50%; left: 0;
  width: 7px; height: 7px;
  border-radius: 9999px;
  background: #60a5fa;
  box-shadow: 0 0 10px 2px rgba(96,165,250,0.7);
  opacity: 0;
}
.adev-pipeline-live .adev-packet { animation: adev-packet 3s linear infinite; }

@keyframes adev-packet-v {
  0%   { top: 0%;   opacity: 0; transform: translateX(-50%) scale(0.6); }
  12%  { opacity: 1; transform: translateX(-50%) scale(1); }
  88%  { opacity: 1; transform: translateX(-50%) scale(1); }
  100% { top: 100%; opacity: 0; transform: translateX(-50%) scale(0.6); }
}
.adev-packet-v {
  position: absolute;
  left: 50%; top: 0;
  width: 7px; height: 7px;
  border-radius: 9999px;
  background: #60a5fa;
  box-shadow: 0 0 10px 2px rgba(96,165,250,0.7);
  opacity: 0;
}
.adev-pipeline-live .adev-packet-v { animation: adev-packet-v 3s linear infinite; }
`;
