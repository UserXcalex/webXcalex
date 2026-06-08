"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Check, ArrowRight, Sparkles, Globe, Bot, ShoppingCart } from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Plan = {
  name: string;
  price: string;
  originalPrice?: string;
  promoLabel?: string;
  period: string;
  tagline: string;
  featured: boolean;
  custom?: boolean;
  features: string[];
  delivery?: string;
};

type Category = {
  id: string;
  label: string;
  icon: React.ElementType;
  plans: Plan[];
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const CATEGORIES: Category[] = [
  {
    id: "landing",
    label: "Landing Pages",
    icon: Globe,
    plans: [
      {
        name: "Básica",
        price: "750.000",
        originalPrice: "1.100.000",
        promoLabel: "32% OFF · Promo Limitada",
        period: "/ proyecto",
        tagline: "Para lanzar tu presencia digital con impacto real desde el primer día.",
        featured: false,
        delivery: "Entrega: 3 a 5 días hábiles",
        features: [
          "Diseño profesional y responsivo (móvil y PC)",
          "Información de empresa o servicio",
          "Sección de servicios o productos",
          "Información de contacto",
          "Botón directo a WhatsApp",
          "Hosting profesional incluido",
          "Optimización de velocidad de carga",
        ],
      },
      {
        name: "Profesional",
        price: "1.200.000",
        originalPrice: "1.900.000",
        promoLabel: "37% OFF · Promo Limitada",
        period: "/ proyecto",
        tagline: "Diseñada para convertir visitas en clientes con copywriting estratégico.",
        featured: true,
        delivery: "Entrega: 5 a 8 días hábiles",
        features: [
          "Todo lo de la Básica",
          "Redacción profesional de textos persuasivos",
          "Secciones estratégicas para conversión",
          "Preguntas frecuentes (FAQ)",
          "Animaciones y transiciones modernas",
          "Optimización SEO básica para Google",
          "Integración de imágenes optimizadas en la nube",
          "Diseño orientado a ventas y captación de clientes",
        ],
      },
      {
        name: "Premium",
        price: "1.800.000",
        originalPrice: "2.700.000",
        promoLabel: "33% OFF · Promo Limitada",
        period: "/ proyecto",
        tagline: "La solución completa para posicionarte y crecer con autoridad digital.",
        featured: false,
        delivery: "Entrega: 8 a 12 días hábiles",
        features: [
          "Todo lo de la Profesional",
          "Formularios de contacto y captación de leads",
          "Galería de imágenes o proyectos realizados",
          "Testimonios de clientes",
          "Presentación del equipo de trabajo",
          "Blog o sección de artículos",
          "Integración con Google Analytics",
          "Configuración para redes sociales",
          "Estrategia de posicionamiento y conversión",
        ],
      },
    ],
  },
  {
    id: "bots",
    label: "Bots con IA",
    icon: Bot,
    plans: [
      {
        name: "XAIA Web — Pago Único",
        price: "500.000",
        originalPrice: "800.000",
        promoLabel: "38% OFF · Promo Limitada",
        period: "pago único · sin mensualidad",
        tagline: "Tu asistente XAIA configurado con la información de tu empresa, para siempre.",
        featured: false,
        features: [
          "Widget XAIA instalado en tu página web",
          "Información de tu empresa cargada",
          "Responde preguntas frecuentes 24/7",
          "Captura de leads automática",
          "Personalización de marca (colores, nombre)",
          "Sin mensualidad — tuyo de por vida",
          "Instalación con 1 línea de código",
        ],
      },
      {
        name: "XAIA Web — Mensual",
        price: "150.000",
        originalPrice: "230.000",
        promoLabel: "35% OFF · Promo Limitada",
        period: "/ mes · sin costo de setup",
        tagline: "Bot activo todos los meses con soporte y actualizaciones incluidas.",
        featured: false,
        features: [
          "Todo lo del plan Pago Único",
          "Sin pago inicial de setup",
          "Actualizaciones de contenido incluidas",
          "Soporte técnico mensual",
          "Cancela cuando quieras",
        ],
      },
      {
        name: "Bot WhatsApp & Messenger",
        price: "1.990.000",
        originalPrice: "2.800.000",
        promoLabel: "29% OFF · Promo Limitada",
        period: "setup · $590.000/mes",
        tagline: "Bot de ventas multicanal que trabaja solo mientras tú descansas.",
        featured: true,
        features: [
          "Integración WhatsApp Business API",
          "Integración Meta Messenger",
          "Calificación automática de leads",
          "Envío de catálogos y precios",
          "Agendamiento de citas automático",
          "Seguimiento de prospectos (CRM)",
          "Flujos de n8n personalizados",
          "Hasta 2.000 conversaciones / mes",
          "Reportes de conversión mensuales",
        ],
      },
      {
        name: "Bot Empresarial",
        price: "A Medida",
        period: "personalizado",
        tagline: "Multicanal completo con IA avanzada, CRM y analytics profundos.",
        featured: false,
        custom: true,
        features: [
          "Todo lo del plan WhatsApp & Messenger",
          "XAIA Web + WhatsApp + Messenger integrados",
          "IA entrenada con el conocimiento de tu empresa",
          "Integraciones con tu CRM / ERP",
          "Conversaciones ilimitadas",
          "Panel de administración a medida",
          "Análisis de sentimiento y rendimiento",
          "SLA prioritario garantizado",
          "Acompañamiento estratégico mensual",
        ],
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: ShoppingCart,
    plans: [
      {
        name: "Tienda Básica",
        price: "3.200.000",
        period: "/ proyecto",
        tagline: "Empieza a vender en línea con una tienda profesional y lista para operar.",
        featured: false,
        delivery: "Entrega: 7 a 10 días hábiles",
        features: [
          "Tienda online responsiva (móvil y PC)",
          "Hasta 50 productos con variantes",
          "Carrito de compras y pasarela de pago",
          "Integración con WhatsApp para pedidos",
          "Panel de administración de productos",
          "SEO básico por producto",
          "Hosting y dominio primer año incluido",
        ],
      },
      {
        name: "Tienda Profesional",
        price: "5.900.000",
        originalPrice: "7.500.000",
        promoLabel: "21% OFF · Promo Limitada",
        period: "/ proyecto",
        tagline: "E-commerce completo con membresías, automatizaciones y experiencia premium.",
        featured: true,
        delivery: "Entrega: 15 a 20 días hábiles",
        features: [
          "Todo lo de la Tienda Básica",
          "Productos ilimitados con categorías avanzadas",
          "Sistema de membresías o niveles de cliente",
          "Blog o academia integrada",
          "Automatización de emails post-compra",
          "Integración con Google Analytics y Meta Pixel",
          "Recuperación de carrito abandonado",
          "Optimización de conversión (A/B ready)",
          "Soporte técnico 60 días",
        ],
      },
      {
        name: "E-Commerce Enterprise",
        price: "A Medida",
        period: "personalizado",
        tagline: "Plataforma escalable a medida para marcas con operación de alto volumen.",
        featured: false,
        custom: true,
        features: [
          "Todo lo de la Tienda Profesional",
          "Arquitectura headless / Next.js a medida",
          "Multitienda o multi-idioma",
          "Integración con ERP / inventario en tiempo real",
          "Bot de ventas XAIA integrado",
          "Dashboard de analytics avanzado",
          "Pasarelas de pago múltiples (Stripe, PayU, etc.)",
          "SLA 99.9% garantizado",
          "Equipo dedicado de ingeniería",
        ],
      },
    ],
  },
];

const CFG = {
  featured: {
    gradient: "from-blue-500 to-violet-500",
    accentColor: "rgb(59,130,246)",
    accentBg: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.35)",
  },
  normal: {
    gradient: "from-slate-500 to-slate-400",
    accentColor: "rgb(99,102,241)",
    accentBg: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.15)",
  },
  custom: {
    gradient: "from-violet-500 to-fuchsia-500",
    accentColor: "rgb(139,92,246)",
    accentBg: "rgba(139,92,246,0.08)",
    accentBorder: "rgba(139,92,246,0.2)",
  },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Pricing() {
  const { ref, inView } = useInView({ threshold: 0.08 });
  const [activeCategory, setActiveCategory] = useState("landing");

  const category = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section
      id="pricing"
      ref={ref}
      className={`relative py-28 lg:py-36 bg-white dark:bg-[#07070f] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-0 dark:opacity-100"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
            Planes & Servicios
          </p>
          <h2 className="text-4xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.06] mb-5">
            Inversión en{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
              Resultados Reales
            </span>
            <span className="text-blue-500">.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed max-w-xl mx-auto font-medium">
            Planes transparentes en pesos colombianos, sin sorpresas. Elige el servicio que necesitas tu empresa hoy.
          </p>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.07]">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all duration-250"
                  style={
                    isActive
                      ? { background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", color: "#fff", boxShadow: "0 4px 16px rgba(59,130,246,0.3)" }
                      : { color: "rgb(100,116,139)" }
                  }
                >
                  <Icon size={13} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Plans grid ── */}
        <div
          key={activeCategory}
          className={`grid grid-cols-1 gap-5 lg:gap-6 ${category.plans.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}
          style={{ animation: "pricingFadeIn 0.35s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <style>{`@keyframes pricingFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {category.plans.map((plan) => {
            const cfg = plan.featured ? CFG.featured : plan.custom ? CFG.custom : CFG.normal;

            return (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl transition-all duration-400"
                style={{
                  background: "rgba(255,255,255,1)",
                  border: `1px solid ${plan.featured ? cfg.accentBorder : "rgba(15,23,42,0.07)"}`,
                  boxShadow: plan.featured ? `0 0 0 1px ${cfg.accentBorder}, 0 32px 64px rgba(59,130,246,0.1)` : "none",
                  transform: plan.featured ? "scale(1.02)" : "scale(1)",
                }}
              >
                {/* Dark mode bg */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 dark:opacity-100 pointer-events-none"
                  style={{
                    background: plan.featured ? "rgba(59,130,246,0.04)" : "rgba(255,255,255,0.025)",
                    border: `1px solid ${plan.featured ? cfg.accentBorder : "rgba(255,255,255,0.06)"}`,
                  }}
                />

                {/* Badges top */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    <div
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
                      style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", boxShadow: "0 4px 16px rgba(59,130,246,0.4)" }}
                    >
                      <Sparkles size={10} />
                      Más Popular
                    </div>
                  </div>
                )}
                {plan.promoLabel && (
                  <div className="absolute -top-3.5 right-4 z-20">
                    <div
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white"
                      style={{ background: "linear-gradient(135deg,#f43f5e,#fb923c)", boxShadow: "0 4px 12px rgba(244,63,94,0.4)" }}
                    >
                      🔥 {plan.promoLabel}
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex flex-col flex-1 p-7 pt-8">
                  {/* Name */}
                  <div className="mb-6">
                    <div className={`inline-block text-[10px] font-black tracking-[0.3em] uppercase mb-3 bg-gradient-to-r ${cfg.gradient} bg-clip-text text-transparent`}>
                      {plan.name}
                    </div>

                    {/* Price */}
                    {plan.originalPrice && (
                      <p className="text-[12px] text-slate-400 dark:text-slate-500 font-bold line-through mb-0.5">
                        COP $ {plan.originalPrice}
                      </p>
                    )}
                    <div className="flex items-baseline gap-1.5 mb-1">
                      {plan.custom ? (
                        <span className={`text-4xl font-black bg-gradient-to-r ${cfg.gradient} bg-clip-text text-transparent`}>
                          {plan.price}
                        </span>
                      ) : (
                        <>
                          <span className="text-[12px] font-bold text-slate-400 dark:text-slate-500 self-start mt-2">COP $</span>
                          <span className={`text-[36px] font-black tracking-tight leading-none bg-gradient-to-br ${cfg.gradient} bg-clip-text text-transparent`}>
                            {plan.price}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-3">{plan.period}</p>

                    <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed font-medium">
                      {plan.tagline}
                    </p>

                    {plan.delivery && (
                      <p className="mt-2 text-[10px] font-black uppercase tracking-wider" style={{ color: cfg.accentColor }}>
                        ⏱ {plan.delivery}
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px mb-6" style={{ background: `linear-gradient(90deg,${cfg.accentBorder},transparent)` }} />

                  {/* Features */}
                  <div className="flex flex-col gap-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: cfg.accentBg }}
                        >
                          <Check size={11} style={{ color: cfg.accentColor }} strokeWidth={2.5} />
                        </div>
                        <span className="text-slate-600 dark:text-slate-400 text-[13px] font-medium leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
                    style={
                      plan.featured
                        ? { background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", color: "#fff", boxShadow: "0 0 28px rgba(59,130,246,0.3)" }
                        : { background: cfg.accentBg, color: cfg.accentColor, border: `1px solid ${cfg.accentBorder}` }
                    }
                  >
                    {plan.custom ? "Hablar con el Equipo" : "Empezar Ahora"}
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 dark:text-slate-600 text-[11px] font-bold uppercase tracking-widest mt-12">
          Sin contratos largos · Precios en pesos colombianos · 100% enfocado en resultados
        </p>
      </div>
    </section>
  );
}
