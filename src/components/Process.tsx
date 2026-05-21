"use client";

import { useInView } from "@/hooks/useInView";
import { PhoneCall, Users, Rocket, ArrowRight } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("Process");
  const { ref, inView } = useInView({ threshold: 0.08 });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const steps = [
    { key: "step1", icon: PhoneCall, color: "rgb(59,130,246)",  bg: "rgba(59,130,246,0.1)"  },
    { key: "step2", icon: Users,     color: "rgb(139,92,246)",  bg: "rgba(139,92,246,0.1)"  },
    { key: "step3", icon: Rocket,    color: "rgb(16,185,129)",  bg: "rgba(16,185,129,0.1)"  },
  ];

  return (
    <>
      <section
        id="process"
        ref={ref}
        className={`relative py-28 lg:py-36 bg-white dark:bg-[#07070f] border-y border-slate-100 dark:border-white/[0.05] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
      >
        {/* Subtle glow */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 dark:opacity-100"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)",
            filter: "blur(64px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── Left: sticky header + image ── */}
            <div className="lg:sticky lg:top-28">
              <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
                Nuestro Proceso
              </p>
              <h2 className="text-4xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-8">
                {t("title").split(",").map((part, i, arr) => (
                  <span key={i} className="block">
                    {part.trim()}
                    {i < arr.length - 1 ? "," : <span className="text-blue-500">.</span>}
                  </span>
                ))}
              </h2>

              {/* Image with clip path */}
              <div className="relative w-full h-[340px] rounded-2xl overflow-hidden hidden sm:block shadow-2xl shadow-slate-200/60 dark:shadow-black/60">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop"
                  alt="Equipo Xcalex"
                  className="w-full h-full object-cover"
                  style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%, 15% 50%)" }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, transparent 60%)",
                  }}
                />
              </div>
            </div>

            {/* ── Right: Steps ── */}
            <div className="flex flex-col gap-0 pt-2">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="group relative flex gap-6 pb-10 last:pb-0">
                    {/* Connector line */}
                    {i < steps.length - 1 && (
                      <div
                        className="absolute left-6 top-14 bottom-0 w-px"
                        style={{
                          background: "linear-gradient(to bottom, rgba(59,130,246,0.2), rgba(59,130,246,0.04))",
                        }}
                      />
                    )}

                    {/* Icon bubble */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: step.bg,
                          color: step.color,
                          boxShadow: `0 0 0 0 ${step.bg}`,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1">
                      <p className="text-[9px] font-black tracking-[0.28em] uppercase mb-2"
                         style={{ color: step.color }}>
                        {t(`steps.${step.key}.num`)}
                      </p>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 leading-snug">
                        {t(`steps.${step.key}.title`)}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                        {t(`steps.${step.key}.desc`)}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* CTA */}
              <div className="mt-10 pt-10 border-t border-slate-100 dark:border-white/[0.06]">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="group inline-flex items-center gap-2.5 px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300"
                  style={{ boxShadow: "0 0 28px rgba(59,130,246,0.3)" }}
                >
                  {t("cta")}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
