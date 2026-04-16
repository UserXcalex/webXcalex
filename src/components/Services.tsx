"use client";

import { useInView } from "@/hooks/useInView";
import { Code2, BrainCircuit, Globe2, Palette, DatabaseZap, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("Services");
  const { ref, inView } = useInView({ threshold: 0.1 });

  const serviceData = [
    {
      icon: Code2,
      key: "software",
    },
    {
      icon: BrainCircuit,
      key: "ai",
    },
    {
      icon: Globe2,
      key: "web",
    },
    {
      icon: Palette,
      key: "ux",
    },
    {
      icon: DatabaseZap,
      key: "crm",
    },
    {
      icon: TrendingUp,
      key: "growth",
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className={`py-24 lg:py-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden reveal ${inView ? 'in-view' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 lg:mb-24">
          <div className="max-w-2xl">
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
              {t("badge")}
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              {t("title_start")}{" "}
              <span className="text-blue-600 dark:text-blue-400">{t("title_accent")}</span>.
            </h2>
          </div>
          <p className="lg:max-w-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.key}
                className="card-gradient group rounded-3xl p-10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-600/20 transition-all duration-300">
                    <Icon size={22} className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-400 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-full">
                    {t(`items.${s.key}.tag`)}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t(`items.${s.key}.title`)}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-medium">
                  {t(`items.${s.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
