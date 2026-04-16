import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Footer.legal"); // Usamos algo que ya tengamos o hardcode temporal
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#020617]">
      <div className="text-center">
        <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4">404</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Page not found / Página no encontrada</p>
        <a href="/" className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl transition-transform hover:scale-105">
          Go Home / Volver al inicio
        </a>
      </div>
    </div>
  );
}
