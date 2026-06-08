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

  const navItems = [
    { label: "Servicios",   href: "#services"   },
    { label: "Proceso",     href: "#process"    },
    { label: "Portafolio",  href: "#portfolio"  },
    { label: "Precios",     href: "#pricing"    },
    { label: "Contacto",    href: "#contact"    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav shadow-lg shadow-black/5 dark:shadow-black/30" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-18 flex items-center justify-between h-16 lg:h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center group flex-shrink-0">
          <img
            src="/logo.png"
            alt="Xcalex Logo"
            className="h-10 lg:h-16 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-3.5 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: lang + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="#contact"
            id="nav-cta-btn"
            className="inline-flex items-center px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-300"
            style={{ boxShadow: "0 0 24px rgba(59,130,246,0.3)" }}
          >
            {t("consultoria")}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-350 ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="px-6 pt-2 pb-6 flex flex-col gap-1 border-t border-slate-100 dark:border-white/5"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="dark:hidden" style={{ display: "contents" }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-slate-600 hover:text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div
            className="hidden dark:block"
            style={{
              background: "rgba(2,2,10,0.96)",
              margin: "-8px -24px -24px",
              padding: "8px 24px 24px",
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex px-3 py-3 text-slate-400 hover:text-blue-400 text-sm font-medium rounded-lg hover:bg-blue-500/10 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-3 w-full py-3.5 text-[11px] font-black text-white bg-blue-600 hover:bg-blue-500 rounded-xl text-center transition-all uppercase tracking-[0.2em]"
          >
            {t("reserva_consultoria")}
          </a>
        </div>
      </div>
    </header>
  );
}
