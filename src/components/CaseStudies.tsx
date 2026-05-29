"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const casesData = [
  {
    key: "acciones",
    accent: "#16a34a",
    accentBg: "rgba(22,163,74,0.1)",
    image: "/landing/acciones/acciones2.png",
    link: "https://acciones.superozonoglobal.com",
  },
  {
    key: "transferencia",
    accent: "#059669",
    accentBg: "rgba(5,150,105,0.1)",
    image: "/landing/transferencia/transferencia1.png",
    link: "https://transferencia.superozonoglobal.com",
  },
  {
    key: "certificaciones",
    accent: "#2563eb",
    accentBg: "rgba(37,99,235,0.1)",
    image: "/landing/certificaciones/certificaciones1.png",
    link: "https://certificaciones.superozonoglobal.com",
  },
];

function CaseCard({
  itemKey,
  accent,
  accentBg,
  image,
  link,
}: {
  itemKey: string;
  accent: string;
  accentBg: string;
  image: string;
  link: string;
}) {
  const t = useTranslations("CaseStudies");
  const [hovered, setHovered] = useState(false);
  const tags = t.raw(`items.${itemKey}.tags`) as string[];

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 bg-slate-50 dark:bg-white/[0.025]"
      style={{
        border: "1px solid rgba(15,23,42,0.07)",
        minHeight: 440,
        boxShadow: hovered ? `0 32px 64px rgba(0,0,0,0.18), 0 0 40px ${accentBg}` : undefined,
        transform: hovered ? "translateY(-6px)" : "none",
        transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: hovered ? 0.18 : 0,
          transform: hovered ? "scale(1.04)" : "scale(1.08)",
        }}
      />

      {/* Dark overlay on hover */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(2,2,10,0.92) 0%, rgba(2,2,10,0.7) 100%)`
            : "transparent",
        }}
      />

      {/* Accent glow strip at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-between h-full p-8" style={{ minHeight: 440 }}>
        {/* Top */}
        <div>
          <p
            className="text-[10px] font-black tracking-[0.28em] uppercase mb-5 transition-colors duration-400"
            style={{ color: hovered ? accent : accent }}
          >
            {t(`items.${itemKey}.industry`)}
          </p>
          <h3
            className="font-black text-xl lg:text-2xl leading-snug transition-colors duration-400 max-w-[90%]"
            style={{ color: hovered ? "#ffffff" : "rgb(15,23,42)" }}
          >
            {t(`items.${itemKey}.title`)}
          </h3>
        </div>

        {/* Description — revealed on hover */}
        <div
          className="transition-all duration-500 mt-6"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(14px)",
          }}
        >
          <p className="text-slate-300 text-[14px] leading-relaxed font-medium mb-5">
            {t(`items.${itemKey}.desc`)}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold px-3 py-1.5 rounded-full"
                style={{
                  background: accentBg,
                  color: accent,
                  border: `1px solid ${accent}35`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: arrow */}
        <div className="flex items-end justify-end mt-auto pt-8">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400"
            style={{
              border: `1px solid ${hovered ? accent + "60" : "rgba(15,23,42,0.12)"}`,
              background: hovered ? accentBg : "transparent",
              color: hovered ? accent : "rgb(148,163,184)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const t = useTranslations("CaseStudies");
  const { ref, inView } = useInView({ threshold: 0.08 });

  return (
    <section
      id="case-studies"
      ref={ref}
      className={`relative py-28 lg:py-36 bg-slate-50 dark:bg-[#02020a] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
              {t("badge")}
            </p>
            <h2 className="text-4xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
              {t("title")}
              <span className="text-blue-500">.</span>
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 lg:max-w-[280px] font-medium leading-relaxed text-[15px]">
            {t("description")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {casesData.map((c) => (
            <CaseCard
              key={c.key}
              itemKey={c.key}
              accent={c.accent}
              accentBg={c.accentBg}
              image={c.image}
              link={c.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
