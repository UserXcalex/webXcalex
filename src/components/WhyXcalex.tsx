"use client";

import { useInView } from "@/hooks/useInView";
import { Lightbulb, Zap, Layers, PenTool, BarChart2, Workflow, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const differentiators = [
  { icon: Lightbulb, key: "strategy",   color: "rgba(245,158,11,1)",  bg: "rgba(245,158,11,0.1)" },
  { icon: Zap,        key: "speed",      color: "rgba(59,130,246,1)",   bg: "rgba(59,130,246,0.1)" },
  { icon: Layers,     key: "scaling",    color: "rgba(34,211,238,1)",   bg: "rgba(34,211,238,0.1)" },
  { icon: PenTool,    key: "design",     color: "rgba(249,115,22,1)",   bg: "rgba(249,115,22,0.1)" },
  { icon: BarChart2,  key: "business",   color: "rgba(16,185,129,1)",   bg: "rgba(16,185,129,0.1)" },
  { icon: Workflow,   key: "automation", color: "rgba(139,92,246,1)",   bg: "rgba(139,92,246,0.1)" },
];

export default function WhyXcalex() {
  const t = useTranslations("WhyXcalex");
  const { ref, inView } = useInView({ threshold: 0.08 });

  return (
    <section
      id="solutions"
      ref={ref}
      className={`relative py-28 lg:py-36 bg-white dark:bg-[#07070f] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Subtle right glow */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)",
          filter: "blur(64px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr] gap-16 lg:gap-24 items-start">

          {/* ── Left: sticky copy ── */}
          <div className="lg:sticky lg:top-32">
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
              {t("badge")}
            </p>
            <h2 className="text-4xl lg:text-[48px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.06] mb-8">
              {t("title_start")}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                {t("title_accent")}
              </span>{" "}
              {t("title_end")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-5 text-[15px]">
              {t("desc1")}
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-[14px] leading-relaxed mb-10 font-medium">
              {t("desc2")}
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-black text-sm transition-colors duration-200"
            >
              {t("cta")}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            {/* Visual accent */}
            <div className="mt-16 hidden lg:block">
              <div
                className="rounded-2xl p-6 border border-slate-100 dark:border-white/[0.06]"
                style={{ background: "rgba(59,130,246,0.03)" }}
              >
                <div className="text-[11px] font-black tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-3">Diferencia Xcalex</div>
                <div className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  No hacemos proyectos. Construimos sistemas que escalan negocios.
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: differentiator cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.key}
                  className="group flex flex-col gap-4 p-6 rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-white dark:bg-white/[0.025] hover:border-blue-500/20 dark:hover:border-blue-500/25 hover:shadow-lg hover:shadow-slate-100/80 dark:hover:shadow-black/30 transition-all duration-300 cursor-default"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: d.bg, color: d.color }}
                  >
                    <Icon size={19} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-black text-[15px] mb-2 leading-snug">
                      {t(`items.${d.key}.title`)}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium leading-relaxed">
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
