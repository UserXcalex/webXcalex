"use client";

import { useInView } from "@/hooks/useInView";
import { Code2, BrainCircuit, Globe2, Palette, DatabaseZap, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const serviceData = [
  { icon: Code2,       key: "software", num: "01", accentColor: "rgb(59,130,246)"  },
  { icon: BrainCircuit,key: "ai",       num: "02", accentColor: "rgb(139,92,246)"  },
  { icon: Globe2,      key: "web",      num: "03", accentColor: "rgb(34,211,238)"  },
  { icon: Palette,     key: "ux",       num: "04", accentColor: "rgb(249,115,22)"  },
  { icon: DatabaseZap, key: "crm",      num: "05", accentColor: "rgb(16,185,129)"  },
  { icon: TrendingUp,  key: "growth",   num: "06", accentColor: "rgb(245,158,11)"  },
];

export default function Services() {
  const t = useTranslations("Services");
  const { ref, inView } = useInView({ threshold: 0.08 });

  return (
    <section
      id="services"
      ref={ref}
      className={`py-28 lg:py-36 bg-slate-50 dark:bg-[#02020a] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 lg:mb-24">
          <div className="max-w-2xl">
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
              {t("badge")}
            </p>
            <h2 className="text-4xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
              {t("title_start")}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                {t("title_accent")}
              </span>
              <span className="text-blue-500">.</span>
            </h2>
          </div>
          <p className="lg:max-w-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-[15px]">
            {t("description")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceData.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.key}
                className="group relative rounded-2xl p-8 cursor-pointer transition-all duration-400 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,1)",
                  border: "1px solid rgba(15,23,42,0.07)",
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = `${s.accentColor.replace("rgb", "rgba").replace(")", ",0.3)")}`;
                  el.style.boxShadow = `0 0 32px ${s.accentColor.replace("rgb", "rgba").replace(")", ",0.07)")}, 0 16px 48px rgba(15,23,42,0.07)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(15,23,42,0.07)";
                  el.style.boxShadow = "0 1px 4px rgba(15,23,42,0.04)";
                }}
              >
                {/* Dark mode version via CSS class approach */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 dark:opacity-100 transition-all duration-400 pointer-events-none"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                />

                {/* Number */}
                <span className="relative z-10 block text-[11px] font-black tracking-[0.3em] text-slate-300 dark:text-slate-700 mb-7 uppercase">
                  {s.num}
                </span>

                {/* Icon */}
                <div
                  className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-7 transition-all duration-300"
                  style={{
                    background: `${s.accentColor.replace("rgb", "rgba").replace(")", ",0.1)")}`,
                  }}
                >
                  <Icon
                    size={22}
                    style={{ color: s.accentColor }}
                    className="transition-all duration-300"
                  />
                </div>

                {/* Tag */}
                <div className="relative z-10 flex items-center justify-between mb-5">
                  <h3 className="text-[17px] font-black text-slate-900 dark:text-white leading-snug pr-4">
                    {t(`items.${s.key}.title`)}
                  </h3>
                  <span
                    className="flex-shrink-0 text-[9px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border"
                    style={{
                      color: s.accentColor,
                      borderColor: `${s.accentColor.replace("rgb", "rgba").replace(")", ",0.25)")}`,
                      background: `${s.accentColor.replace("rgb", "rgba").replace(")", ",0.07)")}`,
                    }}
                  >
                    {t(`items.${s.key}.tag`)}
                  </span>
                </div>

                <p className="relative z-10 text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed font-medium">
                  {t(`items.${s.key}.desc`)}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${s.accentColor.replace("rgb", "rgba").replace(")", ",0.8)")}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
