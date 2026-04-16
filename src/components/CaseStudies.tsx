"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";

const casesData = [
  {
    key: "fintech",
    accent: "#3b82f6",
    illustration: (
      <svg viewBox="0 0 120 90" fill="none" className="w-28 h-20">
        <circle cx="30" cy="60" r="24" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="90" cy="30" r="18" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="52" y1="50" x2="74" y2="38" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="30" cy="60" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="90" cy="30" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="80" cy="72" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="38" y1="66" x2="70" y2="70" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    key: "saas",
    accent: "#6366f1",
    illustration: (
      <svg viewBox="0 0 120 90" fill="none" className="w-28 h-20">
        <circle cx="60" cy="22" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="68" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="96" cy="68" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="60" y1="36" x2="60" y2="52" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="60" y1="52" x2="24" y2="56" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="60" y1="52" x2="96" y2="56" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="60" cy="22" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="68" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="96" cy="68" r="5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    key: "ecommerce",
    accent: "#8b5cf6",
    illustration: (
      <svg viewBox="0 0 120 90" fill="none" className="w-28 h-20">
        <rect x="10" y="28" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="78" y="28" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="60" cy="44" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="42" y1="44" x2="46" y2="44" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="74" y1="44" x2="78" y2="44" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="26" cy="44" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="94" cy="44" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="60" cy="44" r="5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

function CaseCard({ itemKey, accent, illustration }: { itemKey: string, accent: string, illustration: React.ReactNode }) {
  const t = useTranslations("CaseStudies");
  const [hovered, setHovered] = useState(false);

  // Get raw tags array from translations
  // Note: next-intl doesn't return arrays directly with t(), we need to use t.raw if configured or just iterate.
  // Since we haven't configured raw, we'll try to iterate or assume fixed tags if they are usually technical.
  // Actually, I'll use a simple trick: t.raw('items.key.tags') if available, or just map manually.
  // For now I'll use t.raw which is standard for arrays in next-intl.
  const tags = t.raw(`items.${itemKey}.tags`) as string[];

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 min-h-[420px] flex flex-col cursor-pointer transition-shadow duration-300"
      style={{ boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.18)" : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 600)}
    >
      {/* === Dark Reveal Overlay from bottom-right === */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(3,7,18,0.0) 0%, rgba(3,7,18,0.97) 80%)",
          clipPath: hovered ? "circle(170% at 100% 100%)" : "circle(0% at 100% 100%)",
          transition: "clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Card Content */}
      <div className="relative z-20 flex flex-col justify-between flex-1 p-8">

        {/* Top: Industry + Title */}
        <div>
          <p
            className="text-[9px] font-black tracking-[0.25em] uppercase mb-5 transition-colors duration-500"
            style={{ color: hovered ? "rgba(255,255,255,0.6)" : accent }}
          >
            {t(`items.${itemKey}.industry`)}
          </p>
          <h3
            className="font-black text-xl lg:text-2xl leading-snug transition-colors duration-500 max-w-[88%]"
            style={{ color: hovered ? "#ffffff" : "rgb(15,23,42)" }}
          >
            {t(`items.${itemKey}.title`)}
          </h3>
        </div>

        {/* Description (revealed on hover) */}
        <div
          className="transition-all duration-500 mt-6"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(14px)",
          }}
        >
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            {t(`items.${itemKey}.desc`)}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold px-3 py-1.5 rounded-full transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Illustration + Eye */}
        <div className="flex items-end justify-between mt-auto pt-10">
          {/* Decorative illustration */}
          <div
            className="transition-all duration-500"
            style={{ color: hovered ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.12)" }}
          >
            {illustration}
          </div>

          {/* Eye trigger */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
            style={{
              border: hovered ? "2px solid rgba(255,255,255,0.25)" : "2px solid rgb(226,232,240)",
              background: hovered ? "rgba(255,255,255,0.1)" : "transparent",
              color: hovered ? "rgba(255,255,255,0.9)" : "rgb(148,163,184)",
            }}
          >
            <Eye size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const t = useTranslations("CaseStudies");
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="case-studies"
      ref={ref}
      className={`relative bg-white dark:bg-[#020617] py-28 lg:py-36 transition-colors duration-500 reveal ${inView ? "in-view" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
              {t("badge")}
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              {t("title")}<span className="text-blue-600 dark:text-blue-400">.</span>
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 lg:max-w-xs font-medium leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {casesData.map((c, i) => (
            <CaseCard key={c.key} itemKey={c.key} accent={c.accent} illustration={c.illustration} />
          ))}
        </div>
      </div>
    </section>
  );
}
