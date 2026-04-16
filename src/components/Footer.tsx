"use client";

import { 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { useTranslations } from "next-intl";

// SVG icons for brands not in lucide-react
const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
  </svg>
);

const socials = [
  { icon: Linkedin, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: XIcon, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: TikTokIcon, href: "#" },
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
      const response = await fetch("https://superozonoglobal.app.n8n.cloud/webhook-test/datos/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          source: "footer_newsletter",
          date: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      setStatus("error");
    }
  };

  return (
    <footer className="relative bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-slate-800 font-sans transition-colors duration-500">
      <div className="flex flex-col lg:flex-row min-h-[500px]">
        
        {/* Left Section: Links */}
        <div className="flex-1 px-6 lg:px-16 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-12 group">
              <img 
                src="/logo.png" 
                alt="Xcalex Logo" 
                className="h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {footerNavKeys.map((key) => {
                const items = t.raw(`nav.${key}.items`) as string[];
                return (
                  <div key={key}>
                    <h4 className="text-slate-900 dark:text-white font-black text-xl mb-8 flex items-center uppercase tracking-tight">
                      {t(`nav.${key}.title`)}<span className="text-blue-600 ml-0.5">.</span>
                    </h4>
                    <ul className="flex flex-col gap-4">
                      {items.map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors duration-200"
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

            <div className="mt-24 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <a href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t("legal.privacy")}</a>
              <span className="text-slate-200 dark:text-slate-800">|</span>
              <a href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t("legal.terms")}</a>
              <span className="text-slate-200 dark:text-slate-800">|</span>
              <a href="/do-not-sell" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t("legal.do_not_sell")}</a>
            </div>
            <p className="mt-8 text-[11px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">
              Xcalex © {new Date().getFullYear()}. {t("legal.rights")}
            </p>
          </div>
        </div>

        {/* Right Section: Lead Capture (Sidebar) */}
        <div className="w-full lg:w-[450px] bg-slate-50 dark:bg-[#010409] px-6 lg:px-12 py-16 lg:py-24 border-l border-slate-100 dark:border-slate-800">
          <div className="max-w-md mx-auto h-full flex flex-col">
            
            <div className="mb-16">
              <h4 className="text-slate-900 dark:text-white font-black text-xl mb-8 flex items-center uppercase tracking-tight">
                {t("contact.title")}<span className="text-blue-600 ml-0.5">.</span>
              </h4>
              <div className="flex flex-col gap-4 mb-8">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/20 transition-all duration-300 text-center"
                >
                  {t("contact.cta")}
                </button>
                <a href="tel:+15551234567" className="flex items-center gap-3 text-slate-900 dark:text-white font-black text-sm hover:text-blue-600 transition-colors pl-2">
                  <Phone size={18} className="text-blue-600" />
                  +57 (312) 866-3134
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mb-16">
              <p className="text-slate-900 dark:text-slate-300 font-bold text-sm leading-relaxed mb-8">
                {t("newsletter.desc")}
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative group">
                  <input
                    type="email"
                    id="footer-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    placeholder={status === "success" ? t("newsletter.btn_success") : t("newsletter.placeholder")}
                    className={`w-full bg-white dark:bg-slate-900 border ${status === "error" ? "border-red-500" : "border-slate-200 dark:border-slate-800"} rounded-xl px-4 py-4 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all disabled:opacity-70`}
                  />
                  <button 
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="absolute right-2 top-2 bottom-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center disabled:bg-slate-200 dark:disabled:bg-slate-800"
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : status === "success" ? (
                      <CheckCircle2 size={16} className="text-green-500" />
                    ) : (
                      <Mail size={16} />
                    )}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest pl-2">
                    {t("newsletter.error_msg")}
                  </p>
                )}
              </form>
            </div>

            {/* Socials */}
            <div className="mt-auto">
              <h4 className="text-slate-400 dark:text-slate-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                {t("contact.socials")}
              </h4>
              <div className="flex gap-4">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
      
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </footer>
  );
}
