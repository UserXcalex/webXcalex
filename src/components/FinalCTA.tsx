"use client";

import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FinalCTA() {
  const t = useTranslations("FinalCTA");
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setStatus("loading");
    try {
      const response = await fetch("https://superozonoglobal.app.n8n.cloud/webhook-test/datos/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "final_cta_form",
          date: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "" });
        setTimeout(() => {
          setStatus("idle");
          setShowForm(false);
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative bg-slate-50 dark:bg-[#020617] py-28 lg:py-40 transition-colors duration-500 overflow-hidden reveal ${inView ? 'in-view' : ''}`}
    >
      {/* Center glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Decorative ring graphic */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-slate-100 dark:border-slate-800/50 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-slate-100 dark:border-slate-800/50 pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
          {t("badge")}
        </p>
        <h2 className="text-5xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1] mb-8">
          {t("title_start")}{" "}
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400 bg-clip-text text-transparent">
            {t("title_accent")}<span className="text-blue-600 dark:text-blue-400 text-initial">.</span>
          </span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-14 font-medium">
          {t("description")}
        </p>

          {!showForm ? (
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button
                onClick={() => setShowForm(true)}
                id="final-cta-primary"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1"
              >
                {t("cta_start")}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
              <button
                onClick={() => setShowForm(true)}
                id="final-cta-secondary"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-300"
              >
                {t("cta_talk")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto text-left flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <input
                type="text"
                placeholder={t("placeholder_name")}
                required
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                disabled={status === "loading" || status === "success"}
                className={`w-full bg-white dark:bg-[#020617] border ${status === "error" ? "border-red-500" : "border-slate-200 dark:border-slate-800"} rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all disabled:opacity-50`}
              />
              <input
                type="email"
                placeholder={t("placeholder_email")}
                required
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                disabled={status === "loading" || status === "success"}
                className={`w-full bg-white dark:bg-[#020617] border ${status === "error" ? "border-red-500" : "border-slate-200 dark:border-slate-800"} rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all disabled:opacity-50`}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full py-5 bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-3 disabled:bg-slate-300 dark:disabled:bg-slate-800"
              >
                {status === "loading" ? t("btn_loading") : status === "success" ? t("btn_success") : t("btn_submit")}
              </button>
              {status === "error" && (
                <p className="text-red-500 text-xs font-bold text-center mt-2">
                  {t("error_msg")}
                </p>
              )}
            </form>
          )}

        <p className="mt-12 text-slate-400 dark:text-slate-500 text-[10px] font-black tracking-widest uppercase">
          {t("footer_msg")}
        </p>
      </div>
    </section>
  );
}
