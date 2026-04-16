"use client";

import { useInView } from "@/hooks/useInView";
import { PhoneCall, Users, Rocket } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("Process");
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const steps = [
    { key: "step1", icon: PhoneCall },
    { key: "step2", icon: Users },
    { key: "step3", icon: Rocket },
  ];

  return (
    <>
      <section 
        id="process" 
        ref={ref}
        className={`relative bg-slate-50 dark:bg-[#010409] py-24 lg:py-32 transition-colors duration-500 reveal ${inView ? 'in-view' : ''} border-y border-slate-100 dark:border-slate-800 overflow-hidden`}
      >
      {/* Decorative background curve */}
      <div 
        className="absolute bottom-0 right-0 w-full h-[80%] bg-white dark:bg-[#020617] rounded-tl-[100px] lg:rounded-tl-[300px] pointer-events-none transition-colors duration-500"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div className="flex-1 lg:max-w-lg lg:sticky lg:top-32 self-start flex flex-col gap-12">
            <div>
              <h2 className="text-4xl lg:text-[56px] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-2">
                {t("title").split(',').map((part, index, array) => (
                  <span key={index} className="block">
                    {part.trim()}{index === array.length - 1 ? <span className="text-blue-600 dark:text-blue-400">.</span> : ","}
                  </span>
                ))}
              </h2>
            </div>

            {/* Masked Image (X Shape) */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mt-8 hidden sm:block shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop"
                alt="Equipo Xcalex trabajando"
                className="w-full h-full object-cover"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%, 15% 50%)' 
                }}
              />
            </div>
          </div>

          {/* Right Column - Vertical Timeline */}
          <div className="flex-1 pt-8 lg:pt-0">
            <div className="relative border-l-2 border-dashed border-slate-300 dark:border-slate-700 ml-6 pb-8">
              
              <div className="flex flex-col gap-16 pb-12">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="relative pl-12 sm:pl-16 group">
                      {/* Icon Bubble */}
                      <div className="absolute -left-[25px] top-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-slate-50 dark:border-[#020617] group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/30">
                        <Icon size={20} />
                      </div>

                      {/* Content */}
                      <div>
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-2">
                          {t(`steps.${step.key}.num`)}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                          {t(`steps.${step.key}.title`)}
                        </h3>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                          {t(`steps.${step.key}.desc`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Line Connection to Button */}
              <div className="absolute bottom-0 left-[-2px] w-8 h-px border-b-2 border-dashed border-slate-300 dark:border-slate-700" />
              
              <div className="absolute -bottom-5 left-10">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
                >
                  {t("cta")}
                </button>
              </div>
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
