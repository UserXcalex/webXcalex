"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const planKeys = ["starter", "growth", "enterprise"] as const;

export default function Pricing() {
  const t = useTranslations("Pricing");
  const { ref, inView } = useInView({ threshold: 0.08 });
  const [annual, setAnnual] = useState(false);

  const planConfig = {
    starter: {
      gradient: "from-slate-500 to-slate-400",
      accentColor: "rgb(99,102,241)",
      accentBg: "rgba(99,102,241,0.08)",
      accentBorder: "rgba(99,102,241,0.2)",
      featured: false,
    },
    growth: {
      gradient: "from-blue-500 to-violet-500",
      accentColor: "rgb(59,130,246)",
      accentBg: "rgba(59,130,246,0.08)",
      accentBorder: "rgba(59,130,246,0.35)",
      featured: true,
    },
    enterprise: {
      gradient: "from-violet-500 to-fuchsia-500",
      accentColor: "rgb(139,92,246)",
      accentBg: "rgba(139,92,246,0.08)",
      accentBorder: "rgba(139,92,246,0.2)",
      featured: false,
    },
  };

  return (
    <section
      id="pricing"
      ref={ref}
      className={`relative py-28 lg:py-36 bg-white dark:bg-[#07070f] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
            {t("badge")}
          </p>
          <h2 className="text-4xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.06] mb-5">
            {t("title_start")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
              {t("title_accent")}
            </span>
            <span className="text-blue-500">.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed max-w-xl mx-auto font-medium mb-10">
            {t("description")}
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.07]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-[12px] font-black uppercase tracking-wider transition-all duration-200 ${
                !annual
                  ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {t("toggle_monthly")}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[12px] font-black uppercase tracking-wider transition-all duration-200 ${
                annual
                  ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {t("toggle_annual")}
              <span className="bg-green-500/15 text-green-600 dark:text-green-400 text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-wider">
                {t("save_badge")}
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {planKeys.map((planKey) => {
            const cfg = planConfig[planKey];
            const features = t.raw(`plans.${planKey}.features`) as string[];
            const isEnterprise = planKey === "enterprise";

            return (
              <div
                key={planKey}
                className="relative flex flex-col rounded-2xl transition-all duration-400"
                style={{
                  background: cfg.featured
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,1)",
                  border: `1px solid ${cfg.featured ? cfg.accentBorder : "rgba(15,23,42,0.07)"}`,
                  boxShadow: cfg.featured
                    ? `0 0 0 1px ${cfg.accentBorder}, 0 32px 64px rgba(59,130,246,0.1)`
                    : "none",
                  transform: cfg.featured ? "scale(1.02)" : "scale(1)",
                }}
              >
                {/* Dark mode inner bg */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 dark:opacity-100 pointer-events-none"
                  style={{
                    background: cfg.featured
                      ? "rgba(59,130,246,0.04)"
                      : "rgba(255,255,255,0.025)",
                    border: `1px solid ${cfg.featured ? cfg.accentBorder : "rgba(255,255,255,0.06)"}`,
                  }}
                />

                {/* Most popular badge */}
                {cfg.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
                      style={{
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        boxShadow: "0 4px 16px rgba(59,130,246,0.4)",
                      }}
                    >
                      <Sparkles size={10} />
                      {t("most_popular")}
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex flex-col flex-1 p-7 pt-8">
                  {/* Plan name + gradient accent */}
                  <div className="mb-6">
                    <div
                      className={`inline-block text-[10px] font-black tracking-[0.3em] uppercase mb-3 bg-gradient-to-r ${cfg.gradient} bg-clip-text text-transparent`}
                    >
                      {t(`plans.${planKey}.name`)}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mb-3">
                      {isEnterprise ? (
                        <span
                          className={`text-4xl font-black bg-gradient-to-r ${cfg.gradient} bg-clip-text text-transparent`}
                        >
                          {t("custom_price")}
                        </span>
                      ) : (
                        <>
                          <span className="text-[13px] font-bold text-slate-400 dark:text-slate-500 self-start mt-2">
                            {t("currency")}
                          </span>
                          <span
                            className={`text-[42px] font-black tracking-tight leading-none bg-gradient-to-br ${cfg.gradient} bg-clip-text text-transparent`}
                          >
                            {annual
                              ? t(`plans.${planKey}.price_annual`)
                              : t(`plans.${planKey}.price_monthly`)}
                          </span>
                          <span className="text-[13px] text-slate-400 dark:text-slate-500 font-medium self-end mb-1">
                            {annual
                              ? t("custom_period")
                              : t(`plans.${planKey}.period`)}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed font-medium">
                      {t(`plans.${planKey}.tagline`)}
                    </p>
                  </div>

                  {/* Divider */}
                  <div
                    className="w-full h-px mb-6"
                    style={{
                      background: `linear-gradient(90deg, ${cfg.accentBorder}, transparent)`,
                    }}
                  />

                  {/* Features */}
                  <div className="flex flex-col gap-3 flex-1 mb-8">
                    {features.map((feature) => (
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
                      cfg.featured
                        ? {
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            color: "#fff",
                            boxShadow: "0 0 28px rgba(59,130,246,0.3)",
                          }
                        : {
                            background: cfg.accentBg,
                            color: cfg.accentColor,
                            border: `1px solid ${cfg.accentBorder}`,
                          }
                    }
                  >
                    {isEnterprise ? t("cta_enterprise") : t("cta_start")}
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 dark:text-slate-600 text-[11px] font-bold uppercase tracking-widest mt-12">
          Sin contratos largos · Sin sorpresas · 100% enfocado en resultados
        </p>
      </div>
    </section>
  );
}
