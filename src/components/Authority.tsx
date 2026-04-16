"use client";

import { useInView } from "@/hooks/useInView";
import { useTranslations } from "next-intl";

export default function Authority() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const t = useTranslations("Authority");

  return (
    <section
      id="about"
      ref={ref}
      className={`relative bg-white dark:bg-[#020617] py-28 lg:py-40 transition-colors duration-500 overflow-hidden reveal ${inView ? 'in-view' : ''}`}
    >
      {/* Subtle left glow accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none opacity-50 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: manifesto */}
          <div>
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
              {t("badge")}
            </p>
            <blockquote className="text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-10">
              "{t("quote_p1")}{" "}
              <span className="text-slate-400 dark:text-slate-500 font-medium">
                {t("quote_p2")}"
              </span>
            </blockquote>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black text-sm italic">
                XC
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider">{t("team")}</p>
                <p className="text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-widest">{t("role")}</p>
              </div>
            </div>
          </div>

          {/* Right: authority pillars */}
          <div className="flex flex-col gap-6">
            {[
              {
                id: "philosophy",
                label: t("pillars.philosophy.title"),
                content: t("pillars.philosophy.desc"),
              },
              {
                id: "alliance",
                label: t("pillars.alliance.title"),
                content: t("pillars.alliance.desc"),
              },
              {
                id: "standards",
                label: t("pillars.standards.title"),
                content: t("pillars.standards.desc"),
              },
            ].map((p) => (
              <div
                key={p.id}
                className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-600/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300"
              >
                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400 mb-4">
                  {p.label}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-medium">{p.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
