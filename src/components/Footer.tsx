"use client";

import {
  Linkedin, Facebook, Instagram, Youtube, Mail, Phone, Loader2, CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { useTranslations } from "next-intl";

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
  </svg>
);

const socials = [
  { icon: Linkedin,  href: "#" },
  { icon: Facebook,  href: "#" },
  { icon: XIcon,     href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube,   href: "#" },
  { icon: TikTokIcon,href: "#" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const footerNavKeys = ["discover", "resources", "careers"] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch(
        "https://superozonoglobal.app.n8n.cloud/webhook-test/datos/leads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "footer_newsletter", date: new Date().toISOString() }),
        }
      );
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="relative bg-white dark:bg-[#02020a] border-t border-slate-100 dark:border-white/[0.05] transition-colors duration-500">

      {/* Top glow strip */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px opacity-0 dark:opacity-100"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 min-h-[520px]">

          {/* ── Left: Links ── */}
          <div className="py-16 lg:py-20 lg:pr-16 lg:border-r border-slate-100 dark:border-white/[0.05]">
            {/* Logo */}
            <div className="mb-12">
              <img
                src="/logo.png"
                alt="Xcalex Logo"
                className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Nav */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {footerNavKeys.map((key) => {
                const items = t.raw(`nav.${key}.items`) as string[];
                return (
                  <div key={key}>
                    <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider mb-5 flex items-center gap-1">
                      {t(`nav.${key}.title`)}
                      <span className="text-blue-500">.</span>
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {items.map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white text-[13px] font-medium transition-colors duration-200"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Legal */}
            <div className="mt-16 pt-8 border-t border-slate-100 dark:border-white/[0.05]">
              <div className="flex flex-wrap gap-4 mb-4 text-[11px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700">
                <a href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">{t("legal.privacy")}</a>
                <span>|</span>
                <a href="/terms" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">{t("legal.terms")}</a>
                <span>|</span>
                <a href="/do-not-sell" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">{t("legal.do_not_sell")}</a>
              </div>
              <p className="text-[11px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">
                Xcalex © {new Date().getFullYear()}. {t("legal.rights")}
              </p>
            </div>
          </div>

          {/* ── Right: Contact sidebar ── */}
          <div className="py-16 lg:py-20 lg:pl-12 flex flex-col gap-10">

            {/* Contact */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-1">
                {t("contact.title")}<span className="text-blue-500">.</span>
              </h4>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3.5 text-[11px] font-black text-white uppercase tracking-[0.2em] rounded-xl hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    boxShadow: "0 0 24px rgba(59,130,246,0.25)",
                  }}
                >
                  {t("contact.cta")}
                </button>
                <a
                  href="tel:+573128663134"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/20 font-bold text-[13px] transition-all duration-200"
                >
                  <Phone size={15} className="text-blue-500" />
                  +57 (312) 866-3134
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-[13px] leading-relaxed mb-5">
                {t("newsletter.desc")}
              </p>
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    placeholder={status === "success" ? t("newsletter.btn_success") : t("newsletter.placeholder")}
                    className="w-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all pr-14 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="absolute right-2 top-2 bottom-2 w-9 rounded-lg flex items-center justify-center transition-all duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400"
                  >
                    {status === "loading" ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : status === "success" ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : (
                      <Mail size={14} />
                    )}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 pl-1">
                    {t("newsletter.error_msg")}
                  </p>
                )}
              </form>
            </div>

            {/* Socials */}
            <div className="mt-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600 mb-4">
                {t("contact.socials")}
              </p>
              <div className="flex gap-2">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-9 h-9 rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-slate-500 dark:text-slate-500 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600 transition-all duration-200"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </footer>
  );
}
