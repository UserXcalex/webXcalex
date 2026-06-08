"use client";

import { useInView } from "@/hooks/useInView";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LeadSuccessAnimation from "./LeadSuccessAnimation";

export default function FinalCTA() {
  const t = useTranslations("FinalCTA");
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [leadPhase, setLeadPhase] = useState<"sending" | "success" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    setStatus("loading");
    setLeadPhase("sending");
    try {
      const res = await fetch(
        "https://superozonoglobal.app.n8n.cloud/webhook/datos/leads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, source: "final_cta_form", date: new Date().toISOString() }),
        }
      );
      if (res.ok) {
        setStatus("success");
        setLeadPhase("success");
        setFormData({ name: "", email: "" });
        setTimeout(() => { setStatus("idle"); setShowForm(false); }, 3500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
    <LeadSuccessAnimation
      phase={leadPhase}
      onDone={() => setLeadPhase(null)}
      title="¡Consultoría solicitada!"
      subtitle="Revisaremos tu solicitud y te contactaremos muy pronto."
    />
    <section
      id="contact"
      ref={ref}
      className={`relative py-32 lg:py-44 bg-slate-50 dark:bg-[#02020a] transition-colors duration-500 overflow-hidden reveal ${inView ? "in-view" : ""}`}
    >
      {/* Layered glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-slate-200/60 dark:border-white/[0.04] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-slate-200/60 dark:border-white/[0.04] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-blue-500/10 dark:border-blue-500/10 pointer-events-none"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.28em] uppercase">
          <Sparkles size={10} />
          {t("badge")}
        </div>

        {/* Headline */}
        <h2 className="text-[clamp(2.8rem,7vw,6rem)] font-black text-slate-900 dark:text-white tracking-tighter leading-[1] mb-7">
          {t("title_start")}{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 dark:from-blue-400 dark:via-blue-300 dark:to-violet-400 bg-clip-text text-transparent">
            {t("title_accent")}
          </span>
          <span className="text-blue-500">.</span>
        </h2>

        <p className="text-slate-500 dark:text-slate-400 text-[15px] lg:text-[17px] leading-relaxed max-w-xl mx-auto mb-12 font-medium">
          {t("description")}
        </p>

        {/* CTAs or Form */}
        {!showForm ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              id="final-cta-primary"
              className="group inline-flex items-center justify-center gap-2.5 px-10 py-5 text-white font-black text-[11px] uppercase tracking-[0.22em] rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                boxShadow: "0 0 40px rgba(59,130,246,0.35), 0 8px 24px rgba(59,130,246,0.2)",
              }}
            >
              {t("cta_start")}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => setShowForm(true)}
              id="final-cta-secondary"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/80 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 font-black text-[11px] uppercase tracking-[0.22em] rounded-2xl transition-all duration-300 hover:bg-blue-500/5"
            >
              {t("cta_talk")}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto flex flex-col gap-3"
            style={{ animation: "hero-up 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <input
              type="text"
              placeholder={t("placeholder_name")}
              required
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              disabled={status === "loading" || status === "success"}
              className="w-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px] font-medium disabled:opacity-50"
            />
            <input
              type="email"
              placeholder={t("placeholder_email")}
              required
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              disabled={status === "loading" || status === "success"}
              className="w-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px] font-medium disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full py-4 font-black text-[11px] uppercase tracking-[0.22em] text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  status === "success"
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                boxShadow: "0 0 28px rgba(59,130,246,0.25)",
              }}
            >
              {status === "loading"
                ? t("btn_loading")
                : status === "success"
                ? t("btn_success")
                : t("btn_submit")}
            </button>
            {status === "error" && (
              <p className="text-red-500 text-xs font-bold text-center mt-1">{t("error_msg")}</p>
            )}
          </form>
        )}

        <p className="mt-12 text-slate-400 dark:text-slate-600 text-[10px] font-black tracking-[0.3em] uppercase">
          {t("footer_msg")}
        </p>
      </div>
    </section>
    </>
  );
}
