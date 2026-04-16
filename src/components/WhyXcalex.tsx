"use client";

import { useInView } from "@/hooks/useInView";
import { Lightbulb, Zap, Layers, PenTool, BarChart2, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhyXcalex() {
  const t = useTranslations("WhyXcalex");
  const { ref, inView } = useInView({ threshold: 0.1 });

  const differentiators = [
    { icon: Lightbulb, key: "strategy" },
    { icon: Zap, key: "speed" },
    { icon: Layers, key: "scaling" },
    { icon: PenTool, key: "design" },
    { icon: BarChart2, key: "business" },
    { icon: Workflow, key: "automation" },
  ];

  return (
    <section 
      id="solutions" 
      ref={ref}
      className={`relative py-24 lg:py-32 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden reveal ${inView ? 'in-view' : ''}`}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: copy */}
          <div className="lg:sticky lg:top-28">
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
              {t("badge")}
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
              {t("title_start")} <span className="text-blue-600 dark:text-blue-400">{t("title_accent")}</span> {t("title_end")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 max-w-lg">
              {t("desc1")}
            </p>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
              {t("desc2")}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors duration-200 group underline underline-offset-4 decoration-2 decoration-blue-600/20"
            >
              {t("cta")}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>

          {/* Right: differentiator list */}
          <div className="flex flex-col gap-6">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.key}
                  className="group flex gap-6 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-600/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/5 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                    <Icon size={22} className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-black text-lg mb-2">
                      {t(`items.${d.key}.title`)}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                      {t(`items.${d.key}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
