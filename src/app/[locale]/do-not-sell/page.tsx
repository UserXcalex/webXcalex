"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function DoNotSell() {
  const t = useTranslations("Legal");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) return;
    // Request logic
    setEmail("");
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 lg:pt-48">
        <p className="text-blue-600 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Xcalex Legal
        </p>
        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-12">
          {t("do_not_sell_title")}<span className="text-blue-600">.</span>
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{t("rights")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {t("what_this_means_p")}
            </p>
          </section>

          <section className="mb-10 p-8 border-2 border-slate-900 dark:border-white/10 rounded-3xl bg-slate-50 dark:bg-slate-900/50">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">{t("opt_out")}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              {t("opt_out_desc")}
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{t("contact")}</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all"
                />
              </div>
              <button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                {t("opt_out")}
              </button>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{t("what_this_means")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {t("intro_p")}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{t("contact")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Email: <span className="text-blue-600 font-bold">legal@xcalex.com</span>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
