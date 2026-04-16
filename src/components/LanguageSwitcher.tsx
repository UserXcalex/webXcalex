"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "es" : "en";
    
    // next-intl middleware routes are like: /es/about, /en/about
    // We just need to replace the first segment if it matches a locale, 
    // or push to /nextLocale if we are on root or root-like.
    let newPath = pathname;
    if (pathname.startsWith(`/${locale}`)) {
      newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    } else {
      newPath = `/${nextLocale}${pathname}`;
    }
    
    router.push(newPath);
    router.refresh();
  };

  return (
    <button 
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
    >
      <span className={locale === "es" ? "text-blue-600 dark:text-blue-400" : ""}>ES</span>
      <span className="text-slate-300 dark:text-slate-700">/</span>
      <span className={locale === "en" ? "text-blue-600 dark:text-blue-400" : ""}>EN</span>
    </button>
  );
}
