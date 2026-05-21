"use client";

import { useInView } from "@/hooks/useInView";
import { useTranslations } from "next-intl";

const metricStats = [
  { value: "3×",    key: "launch",    gradient: "from-blue-500 to-blue-400",    glow: "rgba(59,130,246,0.18)",  border: "rgba(59,130,246,0.2)"  },
  { value: "60%",   key: "friction",  gradient: "from-violet-500 to-violet-400", glow: "rgba(139,92,246,0.18)", border: "rgba(139,92,246,0.2)" },
  { value: "99.9%", key: "sla",       gradient: "from-emerald-500 to-cyan-400",  glow: "rgba(16,185,129,0.18)", border: "rgba(16,185,129,0.2)" },
  { value: "40+",   key: "delivered", gradient: "from-orange-500 to-amber-400",  glow: "rgba(249,115,22,0.18)", border: "rgba(249,115,22,0.2)" },
];

export default function Metrics() {
  const t = useTranslations("Metrics");
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="outcomes"
      ref={ref}
      className={`relative py-28 lg:py-36 bg-slate-50 dark:bg-[#02020a] border-y border-slate-100 dark:border-white/[0.05] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Central glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
            {t("badge")}
          </p>
          <h2 className="text-4xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.06]">
            {t("title")}
            <span className="text-blue-500">.</span>
          </h2>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {metricStats.map((m, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center rounded-2xl p-8 lg:p-10 bg-white dark:bg-white/[0.025] border transition-all duration-400 cursor-default"
              style={{
                borderColor: "rgba(15,23,42,0.07)",
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = m.border;
                el.style.boxShadow = `0 0 32px ${m.glow}, 0 16px 48px rgba(15,23,42,0.07)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(15,23,42,0.07)";
                el.style.boxShadow = "0 1px 4px rgba(15,23,42,0.04)";
              }}
            >
              {/* Glow dot */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full opacity-0 dark:opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: m.glow.replace("0.18", "1") }}
              />

              {/* Value */}
              <span
                className={`text-5xl lg:text-[64px] font-black tracking-tighter leading-none mb-5 bg-gradient-to-br ${m.gradient} bg-clip-text text-transparent`}
              >
                {m.value}
              </span>

              {/* Label */}
              <p className="text-slate-900 dark:text-white font-black text-[13px] uppercase tracking-wide leading-snug mb-2">
                {t(`items.${m.key}.label`)}
              </p>

              {/* Sub */}
              <p className="text-slate-400 dark:text-slate-500 text-[12px] leading-relaxed font-medium">
                {t(`items.${m.key}.sub`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
