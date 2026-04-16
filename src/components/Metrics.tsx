"use client";

import { useInView } from "@/hooks/useInView";
import { useTranslations } from "next-intl";

function CircularMetric({
  value,
  label,
  sub,
  circleText,
  index,
}: {
  value: string;
  label: string;
  sub: string;
  circleText: string;
  index: number;
}) {
  const id = `cp-${index}`;
  // Responsive: 160px on mobile, 240px on desktop
  const mobileSize = 160;
  const desktopSize = 240;
  const mobileR = 68;
  const desktopR = 104;

  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer w-full">
      {/* Circle + rotating text — mobile size */}
      <div
        className="relative block lg:hidden"
        style={{ width: mobileSize, height: mobileSize }}
      >
        <svg
          width={mobileSize}
          height={mobileSize}
          viewBox={`0 0 ${mobileSize} ${mobileSize}`}
          className="absolute inset-0"
          style={{ animation: "spin-slow 20s linear infinite" }}
          aria-hidden="true"
        >
          <defs>
            <path
              id={`${id}-m`}
              d={`M ${mobileSize/2},${mobileSize/2 - mobileR} a ${mobileR},${mobileR} 0 1,1 -0.01,0`}
            />
          </defs>
          <text fontSize="8" fontWeight="800" letterSpacing="2.5" className="fill-slate-400 dark:fill-slate-600">
            <textPath href={`#${id}-m`}>{circleText.repeat(2)}</textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-400">
            {value}
          </span>
        </div>
      </div>

      {/* Circle + rotating text — desktop size */}
      <div
        className="relative hidden lg:block"
        style={{ width: desktopSize, height: desktopSize }}
      >
        <svg
          width={desktopSize}
          height={desktopSize}
          viewBox={`0 0 ${desktopSize} ${desktopSize}`}
          className="absolute inset-0"
          style={{ animation: "spin-slow 20s linear infinite" }}
          aria-hidden="true"
        >
          <defs>
            <path
              id={`${id}-d`}
              d={`M ${desktopSize/2},${desktopSize/2 - desktopR} a ${desktopR},${desktopR} 0 1,1 -0.01,0`}
            />
          </defs>
          <text fontSize="9.5" fontWeight="800" letterSpacing="3" className="fill-slate-400 dark:fill-slate-600">
            <textPath href={`#${id}-d`}>{circleText.repeat(2)}</textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-400">
            {value}
          </span>
        </div>
      </div>

      {/* Label below circle */}
      <div className="text-center max-w-[160px]">
        <p className="text-slate-900 dark:text-white font-black text-xs sm:text-sm uppercase tracking-tight leading-snug mb-1">
          {label}
        </p>
        <p className="text-slate-500 dark:text-slate-500 text-[11px] leading-relaxed font-medium">
          {sub}
        </p>
      </div>
    </div>
  );
}

export default function Metrics() {
  const t = useTranslations("Metrics");
  const { ref, inView } = useInView({ threshold: 0.1 });

  const metricStats = [
    {
      value: "3×",
      key: "launch",
    },
    {
      value: "60%",
      key: "friction",
    },
    {
      value: "99.9%",
      key: "sla",
    },
    {
      value: "40+",
      key: "delivered",
    },
  ];

  return (
    <section
      id="outcomes"
      ref={ref}
      className={`relative py-28 lg:py-36 bg-slate-50 dark:bg-[#010409] border-y border-slate-100 dark:border-slate-800 transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
            {t("badge")}
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            {t("title")}
            <span className="text-blue-600 dark:text-blue-400">.</span>
          </h2>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-2 sm:gap-x-4 place-items-center">
          {metricStats.map((m, i) => (
            <CircularMetric
              key={i}
              index={i}
              value={m.value}
              label={t(`items.${m.key}.label`)}
              sub={t(`items.${m.key}.sub`)}
              circleText={t(`items.${m.key}.circle`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
