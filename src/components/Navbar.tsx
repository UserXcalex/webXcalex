"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // We recreate nav items inline so they update properly with translations
  const navItems = [
    { label: t("servicios"), href: "#services" },
    { label: t("soluciones"), href: "#solutions" },
    { label: t("proceso"), href: "#process" },
    { label: t("casos_de_exito"), href: "#case-studies" },
    { label: t("nosotros"), href: "#about" },
    { label: t("contacto"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav shadow-2xl" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img 
            src="/logo.png" 
            alt="Xcalex Logo" 
            className="h-12 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium tracking-wide transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-6 pl-6 border-l border-slate-100 dark:border-slate-800">
            <LanguageSwitcher />
            <a
              href="#contact"
              id="nav-cta-btn"
              className="px-5 py-2.5 text-sm font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
            >
              {t("consultoria")}
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher />
          <button
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden glass-nav border-t border-slate-100 dark:border-slate-800 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-all duration-200"
          >
            {t("reserva_consultoria")}
          </a>
        </div>
      </div>
    </header>
  );
}
