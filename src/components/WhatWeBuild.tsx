"use client";

import { useInView } from "@/hooks/useInView";

const solutions = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "CRM a medida",
    desc: "Gestión de clientes, pipeline de ventas, seguimiento de oportunidades y reportes en tiempo real.",
    accent: "#3b82f6",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h2M7 12h4M13 8h4M13 12h2" />
      </svg>
    ),
    label: "Software contable",
    desc: "Facturación electrónica, contabilidad, conciliaciones bancarias y reportes financieros.",
    accent: "#10b981",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    label: "E-Commerce",
    desc: "Tiendas online con catálogos, carrito, pagos integrados y panel de administración.",
    accent: "#f59e0b",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
    label: "Bots con IA",
    desc: "Asistentes virtuales para WhatsApp, Messenger y web que venden y atienden 24/7.",
    accent: "#25d366",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: "Automatizaciones",
    desc: "Flujos automáticos que conectan tus apps, eliminan tareas repetitivas y ahorran horas cada día.",
    accent: "#8b5cf6",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    label: "Apps móviles",
    desc: "Aplicaciones iOS y Android personalizadas para tu negocio o tus clientes.",
    accent: "#ec4899",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: "Landing pages",
    desc: "Páginas de aterrizaje diseñadas para convertir visitantes en clientes desde el primer clic.",
    accent: "#f97316",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    label: "IA personalizada",
    desc: "Modelos y herramientas de inteligencia artificial entrenados con los datos de tu empresa.",
    accent: "#a78bfa",
  },
];

export default function WhatWeBuild() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`relative py-28 lg:py-36 bg-white dark:bg-[#02020a] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.28em] uppercase">
            Lo que construimos
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black text-slate-900 dark:text-white tracking-tighter leading-[1.05] mb-5">
            Software que{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
              resuelve problemas reales
            </span>
            <span className="text-blue-500">.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-[16px] leading-relaxed font-medium">
            Desde un bot de ventas hasta un sistema contable completo — diseñamos y desarrollamos cada solución desde cero para que encaje exactamente en tu operación.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutions.map((item, i) => (
            <div
              key={item.label}
              className="group relative p-6 rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] hover:border-slate-200 dark:hover:border-white/[0.12] hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 cursor-default"
              style={{
                transitionDelay: inView ? `${i * 50}ms` : "0ms",
              }}
            >
              {/* Accent line top */}
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${item.accent}80, transparent)` }}
              />

              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  color: item.accent,
                  background: `${item.accent}15`,
                }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <h3 className="text-slate-900 dark:text-white font-black text-[15px] mb-2 tracking-tight">
                {item.label}
              </h3>
              <p className="text-slate-500 dark:text-slate-500 text-[13px] leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-slate-400 dark:text-slate-600 text-[12px] font-black uppercase tracking-[0.3em]">
            ¿Tu solución no está en la lista?{" "}
            <a
              href="#contact"
              className="text-blue-500 hover:text-blue-400 transition-colors underline underline-offset-2"
            >
              Cuéntanos tu idea
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
