"use client";

import { useInView } from "@/hooks/useInView";
import { useTranslations } from "next-intl";

export default function Authority() {
  const { ref, inView } = useInView({ threshold: 0.08 });
  const t = useTranslations("Authority");

  const pillars = [
    { id: "philosophy", emoji: "◈" },
    { id: "alliance",   emoji: "◎" },
    { id: "standards",  emoji: "◉" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className={`relative py-28 lg:py-40 bg-slate-50 dark:bg-[#02020a] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Glow accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/3 w-[700px] h-[700px] rounded-full pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: Quote ── */}
          <div>
            <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-10">
              {t("badge")}
            </p>

            <blockquote className="mb-10">
              <p className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-black text-slate-900 dark:text-white leading-[1.12] tracking-tight">
                &ldquo;{t("quote_p1")}{" "}
                <span className="text-slate-400 dark:text-slate-500 font-normal">
                  {t("quote_p2")}&rdquo;
                </span>
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center font-black text-sm italic text-white dark:text-slate-900"
                style={{ boxShadow: "0 0 24px rgba(59,130,246,0.2)" }}
              >
                XC
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider">{t("team")}</p>
                <p className="text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.2em]">{t("role")}</p>
              </div>
            </div>

            {/* Decorative quote mark */}
            <div
              className="mt-16 hidden lg:block text-[120px] font-black leading-none opacity-[0.04] dark:opacity-[0.06] select-none"
              style={{ color: "#3b82f6", fontFamily: "Georgia, serif" }}
            >
              &ldquo;
            </div>
          </div>

          {/* ── Right: Pillars ── */}
          <div className="flex flex-col gap-5">
            {pillars.map((p) => (
              <div
                key={p.id}
                className="group p-8 rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-white dark:bg-white/[0.025] hover:border-blue-500/20 dark:hover:border-blue-500/25 hover:shadow-lg hover:shadow-slate-100/80 dark:hover:shadow-black/30 transition-all duration-300 cursor-default"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-blue-500 dark:text-blue-400 text-lg">{p.emoji}</span>
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400">
                    {t(`pillars.${p.id}.title`)}
                  </p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed font-medium">
                  {t(`pillars.${p.id}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
