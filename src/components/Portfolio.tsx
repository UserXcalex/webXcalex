"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { ArrowUpRight, ExternalLink, CheckCircle, Clock, Zap, Monitor, X, RefreshCw } from "lucide-react";

/* ─────────────────────────────────────────────
   Live Preview Modal
───────────────────────────────────────────── */
function LivePreviewModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "blocked">("loading");
  const [imgIdx, setImgIdx] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Timeout: si en 6s no cargó, asumimos bloqueado
  useEffect(() => {
    const t = setTimeout(() => {
      if (status === "loading") setStatus("blocked");
    }, 6000);
    return () => clearTimeout(t);
  }, [status]);

  // Auto-cycle screenshots en fallback
  useEffect(() => {
    if (status !== "blocked" || project.images.length <= 1) return;
    const id = setInterval(() => setImgIdx(i => (i + 1) % project.images.length), 3000);
    return () => clearInterval(id);
  }, [status, project.images.length]);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 lg:p-8"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          maxWidth: 1200,
          height: "88vh",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 0 1px rgba(${project.accentRgb},0.2), 0 32px 80px rgba(0,0,0,0.6)`,
        }}
      >
        {/* ── Browser chrome ── */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ background: "#0d0d1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Window buttons */}
          <div className="flex gap-1.5">
            <button onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
              title="Cerrar" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>

          {/* URL bar */}
          <div
            className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-mono text-slate-400 truncate"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: status === "loaded" ? "#4ade80" : status === "blocked" ? "#f59e0b" : "#3b82f6" }} />
            <span className="truncate">{project.link}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {status === "blocked" && (
              <button
                onClick={() => { setStatus("loading"); }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
                title="Reintentar"
              >
                <RefreshCw size={13} />
              </button>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider text-white transition-all"
              style={{ background: `rgba(${project.accentRgb},0.85)` }}
            >
              <ExternalLink size={11} />
              Abrir
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── Content area ── */}
        <div className="relative flex-1 overflow-hidden" style={{ background: "#f8fafc" }}>

          {/* Loading */}
          {status === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0d0d1a] z-10">
              <div
                className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin"
              />
              <p className="text-slate-500 text-[12px] font-mono tracking-widest uppercase">Cargando vista previa…</p>
              <p className="text-slate-700 text-[10px] font-mono">Si no carga, el sitio bloquea embedding</p>
            </div>
          )}

          {/* Blocked fallback — screenshot carousel */}
          {status === "blocked" && (
            <div className="absolute inset-0 flex flex-col bg-[#0d0d1a] z-10">
              {/* Notice */}
              <div
                className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold flex-shrink-0"
                style={{ background: `rgba(${project.accentRgb},0.12)`, color: project.accent, borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <Monitor size={12} />
                Este sitio tiene políticas de seguridad que impiden el embedding — mostrando capturas de pantalla reales
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1 underline underline-offset-2 opacity-80 hover:opacity-100">
                  Ver en vivo <ExternalLink size={10} />
                </a>
              </div>
              {/* Screenshots */}
              <div className="relative flex-1 overflow-hidden">
                {project.images.map((src, i) => (
                  <img key={src} src={src} alt={`${project.name} ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700"
                    style={{ opacity: i === imgIdx ? 1 : 0 }} />
                ))}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {project.images.map((_, i) => (
                      <button key={i} onClick={() => setImgIdx(i)}
                        className="rounded-full transition-all duration-300"
                        style={{ width: i === imgIdx ? 20 : 7, height: 7,
                          background: i === imgIdx ? project.accent : "rgba(255,255,255,0.25)" }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            ref={iframeRef}
            src={status !== "blocked" ? project.link : undefined}
            title={project.name}
            className="w-full h-full border-0"
            onLoad={() => setStatus("loaded")}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Project = {
  id: number;
  name: string;
  client: string;
  initials: string;
  cats: string[];
  catLabel: string;
  desc: string;
  images: string[];
  techs: string[];
  status: "live" | "dev" | "done";
  year: string;
  link: string;
  featured: boolean;
  accent: string;
  accentRgb: string;
};

/* ─────────────────────────────────────────────
   Filter categories
───────────────────────────────────────────── */
const CATS = [
  { id: "all",    label: "Todos"           },
  { id: "web",    label: "Desarrollo Web"  },
  { id: "ecomm",  label: "E-Commerce"      },
  { id: "ai",     label: "IA"              },
  { id: "auto",   label: "Automatización"  },
  { id: "brand",  label: "Branding"        },
  { id: "design", label: "Diseño"          },
  { id: "mkt",    label: "Marketing"       },
  { id: "bot",    label: "Bots"            },
];

/* ─────────────────────────────────────────────
   Projects (demo data — ready to be replaced)
───────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 12,
    name: "Portal Super Ozono Global",
    client: "Super Ozono Global",
    initials: "SO",
    cats: ["web", "ecomm"],
    catLabel: "E-Commerce · Portal de Marca",
    desc: "Portal completo de marca con tienda de productos agrícolas, mini-academia con certificación Advisor, sistema de membresías, pasarela de pagos integrada y blog editorial — todo en una sola experiencia de marca para el mercado agro latinoamericano.",
    images: [
      "/e-commerce/super-ozono/portal-intro.png",
      "/e-commerce/super-ozono/vista-tienda.png",
    ],
    techs: ["Next.js", "WooCommerce", "Stripe", "Tailwind CSS", "Vercel"],
    status: "live",
    year: "2025",
    link: "https://www.superozonoglobal.com/super-ozono/",
    featured: true,
    accent: "#f59e0b",
    accentRgb: "245,158,11",
  },
  {
    id: 13,
    name: "Biozono Group",
    client: "Biozono Group",
    initials: "BZ",
    cats: ["web", "ecomm"],
    catLabel: "E-Commerce · Agro Biotech",
    desc: "Portal e-commerce con tienda de productos agrobiotecnológicos (Bioinductor, Biosuelos, Bioinsectos, Biocida 2.0), sistema de membresías por niveles (Afiliado / Empresario / Ingeniería), certificación internacional y soporte multi-idioma para LATAM.",
    images: [
      "/e-commerce/Biozono/biozono-vista-principal.png",
      "/e-commerce/Biozono/vista-productos.png",
    ],
    techs: ["Next.js", "WooCommerce", "Tailwind CSS", "Vercel"],
    status: "live",
    year: "2025",
    link: "https://biozonogroup.com",
    featured: false,
    accent: "#22c55e",
    accentRgb: "34,197,94",
  },
  {
    id: 9,
    name: "Acciones Super Ozono",
    client: "Super Ozono Global",
    initials: "SO",
    cats: ["web", "mkt"],
    catLabel: "Landing · Inversión Agrícola",
    desc: "Landing page de captación de inversores para Super Ozono Global. Presenta la oportunidad de adquirir el 49% de las acciones de la empresa con expansión activa en LATAM, integrando formulario de asesoría conectado a automatización de leads.",
    images: ["/landing/acciones/acciones1.png", "/landing/acciones/acciones2.png"],
    techs: ["Next.js", "Tailwind CSS", "n8n", "Vercel"],
    status: "live",
    year: "2025",
    link: "https://acciones.superozonoglobal.com",
    featured: false,
    accent: "#16a34a",
    accentRgb: "22,163,74",
  },
  {
    id: 10,
    name: "Transferencia Tecnológica",
    client: "Super Ozono Global",
    initials: "SO",
    cats: ["web", "mkt"],
    catLabel: "Landing · Agro Tech",
    desc: "Plataforma de ventas de tecnología de ozono para el sector agrícola. Presenta planes Ejecutivo y Pro con resultados comprobados: +30% rendimiento del cultivo, -50% uso de agroquímicos y 0% residuos químicos.",
    images: ["/landing/transferencia/transferencia1.png", "/landing/transferencia/transferencia2.png"],
    techs: ["Next.js", "Tailwind CSS", "n8n", "Vercel"],
    status: "live",
    year: "2025",
    link: "https://transferencia.superozonoglobal.com",
    featured: false,
    accent: "#059669",
    accentRgb: "5,150,105",
  },
  {
    id: 11,
    name: "Certificaciones Super Ozono",
    client: "Super Ozono Global",
    initials: "SO",
    cats: ["web", "mkt"],
    catLabel: "Landing · Formación Agrícola",
    desc: "Landing de registro para webinar con certificación internacional en tecnología de ozono agrícola. Capta inscripciones para el programa que habilita a agricultores a dominar y liderar el mercado agro de alto rendimiento.",
    images: ["/landing/certificaciones/certificaciones1.png"],
    techs: ["Next.js", "Tailwind CSS", "n8n", "Vercel"],
    status: "live",
    year: "2025",
    link: "https://certificaciones.superozonoglobal.com",
    featured: false,
    accent: "#2563eb",
    accentRgb: "37,99,235",
  },
  {
    id: 1,
    name: "NexPay Dashboard",
    client: "NexPay Financial",
    initials: "NP",
    cats: ["web", "ai"],
    catLabel: "IA + Desarrollo Web",
    desc: "Plataforma de gestión financiera con IA integrada para análisis predictivo, alertas inteligentes y reportes en tiempo real para equipos de finanzas.",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"],
    techs: ["Next.js", "Python", "TensorFlow", "AWS"],
    status: "live",
    year: "2024",
    link: "#",
    featured: false,
    accent: "#3b82f6",
    accentRgb: "59,130,246",
  },
  {
    id: 2,
    name: "Arcova Store",
    client: "Arcova Capital",
    initials: "AC",
    cats: ["ecomm", "web"],
    catLabel: "E-Commerce Premium",
    desc: "Headless commerce de alta performance soportando 10k usuarios concurrentes. Conversión mejorada 2.1× y cargas 38% más rápidas.",
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop"],
    techs: ["Next.js", "Shopify", "GraphQL", "Redis"],
    status: "live",
    year: "2024",
    link: "#",
    featured: false,
    accent: "#22d3ee",
    accentRgb: "34,211,238",
  },
  {
    id: 3,
    name: "Stratum Intelligence",
    client: "Stratum AI",
    initials: "SA",
    cats: ["ai", "auto"],
    catLabel: "IA + Automatización",
    desc: "Sistema de automatización inteligente con LLMs para procesamiento autónomo de documentos, validaciones y decisiones operativas.",
    images: ["https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1600&auto=format&fit=crop"],
    techs: ["Python", "GPT-4o", "n8n", "PostgreSQL"],
    status: "live",
    year: "2024",
    link: "#",
    featured: false,
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
  },
  {
    id: 4,
    name: "Lumis Brand System",
    client: "Lumis Ventures",
    initials: "LV",
    cats: ["brand", "design"],
    catLabel: "Branding + Diseño",
    desc: "Sistema de identidad visual completo para venture capital. Logo, paleta, tipografía, guidelines y aplicaciones digitales.",
    images: ["https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=1600&auto=format&fit=crop"],
    techs: ["Figma", "Illustrator", "After Effects"],
    status: "done",
    year: "2023",
    link: "#",
    featured: false,
    accent: "#f59e0b",
    accentRgb: "245,158,11",
  },
  {
    id: 5,
    name: "VexorBot Assistant",
    client: "Vexor Systems",
    initials: "VS",
    cats: ["bot", "ai"],
    catLabel: "Bot Inteligente",
    desc: "Asistente conversacional con IA desplegado en WhatsApp, web y Telegram con resolución autónoma del 74% de consultas.",
    images: ["https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1600&auto=format&fit=crop"],
    techs: ["Python", "WhatsApp API", "OpenAI", "MongoDB"],
    status: "live",
    year: "2024",
    link: "#",
    featured: false,
    accent: "#10b981",
    accentRgb: "16,185,129",
  },
  {
    id: 6,
    name: "Opallion Growth",
    client: "Opallion",
    initials: "OP",
    cats: ["mkt", "auto"],
    catLabel: "Marketing Automatizado",
    desc: "Ecosistema de marketing digital con embudos automatizados, campañas inteligentes y analytics de conversión avanzados.",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"],
    techs: ["Meta Ads", "n8n", "GA4", "HubSpot"],
    status: "live",
    year: "2024",
    link: "#",
    featured: false,
    accent: "#f43f5e",
    accentRgb: "244,63,94",
  },
  {
    id: 7,
    name: "Nordex Platform",
    client: "Nordex Corp",
    initials: "NC",
    cats: ["web", "auto"],
    catLabel: "Plataforma Empresarial",
    desc: "Portal de gestión operativa con módulos de inventario, proyectos y reportes. Implementado en 60 días sin fricción.",
    images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"],
    techs: ["React", "Node.js", "PostgreSQL", "Docker"],
    status: "done",
    year: "2023",
    link: "#",
    featured: false,
    accent: "#6366f1",
    accentRgb: "99,102,241",
  },
  {
    id: 8,
    name: "Veract Design System",
    client: "Veract Labs",
    initials: "VL",
    cats: ["design", "web"],
    catLabel: "UI Design System",
    desc: "Design system completo con 200+ componentes React, tokens de diseño, Storybook y documentación interactiva para equipos de producto.",
    images: ["https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600&auto=format&fit=crop"],
    techs: ["Figma", "Storybook", "React", "TypeScript"],
    status: "live",
    year: "2024",
    link: "#",
    featured: false,
    accent: "#ec4899",
    accentRgb: "236,72,153",
  },
];

const STATS = [
  { value: 40, suffix: "+", label: "Proyectos completados" },
  { value: 25, suffix: "+", label: "Clientes activos"       },
  { value: 8,  suffix: "",  label: "Servicios ofrecidos"    },
  { value: 3,  suffix: "×", label: "ROI promedio del cliente"},
];

const STATUS_MAP = {
  live: { label: "En producción", color: "rgb(16,185,129)", bg: "rgba(16,185,129,0.1)",  icon: CheckCircle  },
  dev:  { label: "En desarrollo", color: "rgb(59,130,246)",  bg: "rgba(59,130,246,0.1)",  icon: Clock         },
  done: { label: "Completado",    color: "rgb(148,163,184)", bg: "rgba(148,163,184,0.1)", icon: Zap           },
};

/* ─────────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────────── */
function useCounter(target: number, inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const steps = Math.ceil(duration / 16);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCount(Math.round(target * (i / steps)));
      if (i >= steps) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ─────────────────────────────────────────────
   Stat card
───────────────────────────────────────────── */
function StatCard({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCounter(value, inView);
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-1">
        <span className="bg-gradient-to-br from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
          {count}
        </span>
        <span className="text-blue-500">{suffix}</span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-[12px] font-medium tracking-wide uppercase">{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Logo placeholder
───────────────────────────────────────────── */
function ClientLogo({ initials, accent, accentRgb, size = "sm" }: { initials: string; accent: string; accentRgb: string; size?: "sm" | "md" }) {
  const dim = size === "md" ? "w-12 h-12 text-sm" : "w-9 h-9 text-[11px]";
  return (
    <div
      className={`${dim} rounded-xl flex items-center justify-center font-black flex-shrink-0`}
      style={{
        background: `rgba(${accentRgb},0.12)`,
        border: `1px solid rgba(${accentRgb},0.25)`,
        color: accent,
      }}
    >
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Featured card (full-width horizontal)
───────────────────────────────────────────── */
function FeaturedCard({ p, onPreview }: { p: Project; onPreview: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const st = STATUS_MAP[p.status];
  const StatusIcon = st.icon;

  useEffect(() => {
    if (p.images.length <= 1) return;
    const id = setInterval(() => setImgIdx(i => (i + 1) % p.images.length), 3200);
    return () => clearInterval(id);
  }, [p.images.length]);

  return (
    <div
      className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 group"
      style={{
        border: `1px solid rgba(15,23,42,0.08)`,
        boxShadow: hovered
          ? `0 0 0 1px rgba(${p.accentRgb},0.2), 0 32px 80px rgba(${p.accentRgb},0.1), 0 8px 32px rgba(15,23,42,0.08)`
          : "0 2px 16px rgba(15,23,42,0.06)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid lg:grid-cols-[1fr_55%]">

        {/* ── Left: Content ── */}
        <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-between bg-white dark:bg-[#07070f]">
          {/* Top */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <ClientLogo initials={p.initials} accent={p.accent} accentRgb={p.accentRgb} size="md" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">{p.client}</p>
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ color: p.accent }}
                >
                  {p.catLabel}
                </span>
              </div>
              <div className="ml-auto">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ color: st.color, background: st.bg }}
                >
                  <StatusIcon size={9} />
                  {st.label}
                </span>
              </div>
            </div>

            <h3
              className="text-3xl lg:text-4xl xl:text-[42px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-5"
            >
              {p.name}
              <span style={{ color: p.accent }}>.</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-medium mb-8 max-w-sm">
              {p.desc}
            </p>

            {/* Techs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {p.techs.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full"
                  style={{
                    background: `rgba(${p.accentRgb},0.08)`,
                    color: p.accent,
                    border: `1px solid rgba(${p.accentRgb},0.2)`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-6 py-3.5 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${p.accent}, rgba(${p.accentRgb},0.7))`,
                boxShadow: `0 0 24px rgba(${p.accentRgb},0.3)`,
              }}
            >
              Ver Proyecto
              <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
            {p.link !== "#" && (
              <button
                onClick={onPreview}
                className="inline-flex items-center gap-2 px-5 py-3.5 font-black text-[11px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300 border"
                style={{
                  color: p.accent,
                  borderColor: `rgba(${p.accentRgb},0.3)`,
                  background: `rgba(${p.accentRgb},0.06)`,
                }}
              >
                <Monitor size={13} />
                Vista Previa
              </button>
            )}
            <span className="text-slate-400 dark:text-slate-600 text-[11px] font-bold uppercase tracking-wider">{p.year}</span>
          </div>
        </div>

        {/* ── Right: Image carousel ── */}
        <div className="relative overflow-hidden min-h-[300px] lg:min-h-0">
          {p.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${p.name} ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              style={{
                opacity: i === imgIdx ? 1 : 0,
                transform: i === imgIdx ? (hovered ? "scale(1.05)" : "scale(1)") : "scale(1.02)",
              }}
            />
          ))}
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, rgba(${p.accentRgb},0.15) 0%, transparent 60%)`,
              opacity: hovered ? 1 : 0.4,
            }}
          />
          {/* Featured badge */}
          <div className="absolute top-5 right-5">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white px-3 py-1.5 rounded-full backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              ★ Proyecto Destacado
            </span>
          </div>
          {/* Dots */}
          {p.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {p.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === imgIdx ? 18 : 6,
                    height: 6,
                    background: i === imgIdx ? p.accent : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Regular card
───────────────────────────────────────────── */
function ProjectCard({ p, onPreview }: { p: Project; onPreview: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const st = STATUS_MAP[p.status];
  const StatusIcon = st.icon;

  useEffect(() => {
    if (p.images.length <= 1) return;
    const id = setInterval(() => setImgIdx(i => (i + 1) % p.images.length), 3500);
    return () => clearInterval(id);
  }, [p.images.length]);

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        border: "1px solid rgba(15,23,42,0.08)",
        background: "#ffffff",
        boxShadow: hovered
          ? `0 0 0 1px rgba(${p.accentRgb},0.18), 0 24px 56px rgba(${p.accentRgb},0.08), 0 8px 24px rgba(15,23,42,0.06)`
          : "0 2px 8px rgba(15,23,42,0.05)",
        transform: hovered ? "translateY(-6px)" : "none",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dark mode inner */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none rounded-2xl"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
      />

      {/* ── Image area ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        {p.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${p.name} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              opacity: i === imgIdx ? 1 : 0,
              transform: i === imgIdx ? (hovered ? "scale(1.07)" : "scale(1)") : "scale(1.02)",
            }}
          />
        ))}
        {/* Dot indicators */}
        {p.images.length > 1 && (
          <div className="absolute bottom-2 right-3 flex gap-1 z-20">
            {p.images.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === imgIdx ? 12 : 5,
                  height: 5,
                  background: i === imgIdx ? p.accent : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className="text-[9px] font-black uppercase tracking-[0.22em] px-2.5 py-1.5 rounded-full backdrop-blur-md"
            style={{
              background: `rgba(${p.accentRgb},0.85)`,
              color: "#fff",
            }}
          >
            {p.catLabel}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end p-5 transition-all duration-400"
          style={{
            background: hovered
              ? `linear-gradient(to top, rgba(2,2,10,0.92) 0%, rgba(2,2,10,0.5) 50%, transparent 100%)`
              : "linear-gradient(to top, rgba(2,2,10,0.35) 0%, transparent 50%)",
          }}
        >
          <div
            className="transition-all duration-400"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <p className="text-white/85 text-[13px] leading-relaxed font-medium mb-3 line-clamp-2">
              {p.desc}
            </p>
            <div className="flex gap-2">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white px-3 py-2 rounded-lg transition-all duration-200"
                style={{ background: `rgba(${p.accentRgb},0.9)`, boxShadow: `0 0 16px rgba(${p.accentRgb},0.4)` }}
                onClick={(e) => e.stopPropagation()}
              >
                Ver <ExternalLink size={10} />
              </a>
              {p.link !== "#" && (
                <button
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white px-3 py-2 rounded-lg transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}
                  onClick={(e) => { e.stopPropagation(); onPreview(); }}
                >
                  <Monitor size={10} /> Preview
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="relative z-10 flex flex-col flex-1 p-5">
        {/* Client row */}
        <div className="flex items-center gap-2.5 mb-4">
          <ClientLogo initials={p.initials} accent={p.accent} accentRgb={p.accentRgb} />
          <div className="flex-1 min-w-0">
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider truncate">{p.client}</p>
          </div>
          <span
            className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full flex-shrink-0"
            style={{ color: st.color, background: st.bg }}
          >
            <StatusIcon size={8} />
            {st.label}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-black text-[16px] text-slate-900 dark:text-white leading-snug mb-3 transition-colors duration-300"
          style={{ color: hovered ? p.accent : undefined }}
        >
          {p.name}
        </h3>

        {/* Techs */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-100 dark:border-white/[0.05]">
          {p.techs.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md text-slate-500 dark:text-slate-500 bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.05]"
            >
              {tech}
            </span>
          ))}
          {p.techs.length > 3 && (
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 px-2 py-1">
              +{p.techs.length - 3}
            </span>
          )}
          <span className="ml-auto text-[10px] font-bold text-slate-300 dark:text-slate-700">{p.year}</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-300 rounded-b-2xl"
        style={{
          background: `linear-gradient(90deg, ${p.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function Portfolio() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.05 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });

  const [activeFilter, setActiveFilter] = useState("all");
  const [filterKey, setFilterKey] = useState(0);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const handleFilter = (id: string) => {
    if (id === activeFilter) return;
    setFilterKey((k) => k + 1);
    setActiveFilter(id);
  };

  const filtered = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.cats.includes(activeFilter));

  const featured = filtered.find((p) => p.featured && activeFilter === "all") ?? null;
  const grid     = featured ? filtered.filter((p) => !p.featured) : filtered;

  return (
    <>
    <section
      id="portfolio"
      ref={sectionRef}
      className={`relative py-28 lg:py-36 bg-slate-50 dark:bg-[#02020a] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
              Portafolio & Clientes
            </p>
            <h2 className="text-4xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
              Empresas que{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                transformamos
              </span>
              <span className="text-blue-500">.</span>
            </h2>
          </div>
          <p className="lg:max-w-[300px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-[15px]">
            Cada proyecto es la prueba de que tecnología bien ejecutada cambia negocios reales.
          </p>
        </div>

        {/* ── Stats row ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 p-8 rounded-2xl bg-white dark:bg-white/[0.025] border border-slate-100 dark:border-white/[0.06]"
          style={{ boxShadow: "0 2px 16px rgba(15,23,42,0.05)" }}
        >
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} inView={statsInView} />
          ))}
        </div>

        {/* ── Filter tabs ── */}
        <div className="relative mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {CATS.map((cat) => {
              const isActive = cat.id === activeFilter;
              const count = cat.id === "all"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.cats.includes(cat.id)).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleFilter(cat.id)}
                  className="flex-shrink-0 snap-start inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-250 whitespace-nowrap"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                          color: "#ffffff",
                          boxShadow: "0 0 20px rgba(59,130,246,0.3)",
                        }
                      : {
                          background: "transparent",
                          color: "rgb(100,116,139)",
                          border: "1px solid rgba(15,23,42,0.08)",
                        }
                  }
                >
                  {cat.label}
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-black"
                    style={
                      isActive
                        ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
                        : { background: "rgba(15,23,42,0.06)", color: "rgb(148,163,184)" }
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Scroll fade right */}
          <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-slate-50 dark:from-[#02020a] to-transparent pointer-events-none lg:hidden" />
        </div>

        {/* ── Projects grid ── */}
        <div
          key={filterKey}
          style={{ animation: "portfolioFadeIn 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <style>{`
            @keyframes portfolioFadeIn {
              from { opacity: 0; transform: translateY(16px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* Featured */}
          {featured && (
            <div className="mb-6">
              <FeaturedCard p={featured} onPreview={() => setPreviewProject(featured)} />
            </div>
          )}

          {/* Grid */}
          {grid.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {grid.map((p) => (
                <ProjectCard key={p.id} p={p} onPreview={() => setPreviewProject(p)} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-slate-400 dark:text-slate-600 font-bold text-sm uppercase tracking-widest">
                No hay proyectos en esta categoría aún.
              </p>
            </div>
          )}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="mt-16 rounded-2xl p-10 lg:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.06) 100%)",
            border: "1px solid rgba(59,130,246,0.12)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-4">
              ¿Listo para el siguiente nivel?
            </p>
            <h3 className="text-2xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Tu proyecto podría ser el próximo.
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium mb-8 max-w-md mx-auto">
              Conversemos sobre cómo podemos transformar tu empresa con tecnología de élite.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-black text-[11px] uppercase tracking-[0.2em] text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                boxShadow: "0 0 32px rgba(59,130,246,0.3)",
              }}
            >
              Iniciar Proyecto
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Live Preview Modal */}
    {previewProject && (
      <LivePreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    )}
    </>
  );
}
