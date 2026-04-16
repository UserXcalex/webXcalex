import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function TermsOfService() {
  const t = useTranslations("Legal");

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 lg:pt-48">
        <p className="text-blue-600 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Xcalex Legal
        </p>
        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-12">
          {t("terms_title")}<span className="text-blue-600">.</span>
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">1. {t("acceptance")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {t("acceptance_p")}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">2. {t("utilization")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {t("utilization_p")}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">3. {t("property")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {t("property_p")}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">4. {t("liability")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {t("liability_p")}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">5. {t("law")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {t("law_p")}
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
