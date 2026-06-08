"use client";

import { useState, useEffect } from "react";

const PHONE = "573171268276"; // sin + ni espacios
const MESSAGE = encodeURIComponent("Hola Xcalex, me interesa conocer más sobre sus servicios 👋");
const WA_URL = `https://wa.me/${PHONE}?text=${MESSAGE}`;

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulse, setPulse] = useState(true);

  /* Aparece después de 2s */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  /* Tooltip auto-aparece a los 5s y se oculta a los 9s */
  useEffect(() => {
    if (!visible) return;
    const show = setTimeout(() => setShowTooltip(true),  3000);
    const hide = setTimeout(() => setShowTooltip(false), 7000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [visible]);

  /* Detiene el pulso después de 8s */
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes wa-enter { from{opacity:0;transform:scale(0.5) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes wa-pulse { 0%{box-shadow:0 0 0 0 rgba(37,211,102,0.55)} 70%{box-shadow:0 0 0 18px rgba(37,211,102,0)} 100%{box-shadow:0 0 0 0 rgba(37,211,102,0)} }
        @keyframes wa-tooltip { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes wa-bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .wa-btn   { animation: wa-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .wa-pulse { animation: wa-pulse 1.8s ease-out infinite; }
        .wa-tip   { animation: wa-tooltip 0.3s ease both; }
        .wa-icon  { animation: wa-bounce 2.5s ease-in-out 3s infinite; }
      `}</style>

      <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3">

        {/* Tooltip */}
        {showTooltip && (
          <div
            className="wa-tip flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[13px] font-semibold text-white shadow-2xl"
            style={{
              background: "linear-gradient(135deg,#075e54,#128c7e)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            <span className="text-base">👋</span>
            ¿Hablamos por WhatsApp?
            <button
              onClick={() => setShowTooltip(false)}
              className="ml-1 text-white/60 hover:text-white text-xs leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        )}

        {/* Botón principal */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`wa-btn w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200 ${pulse ? "wa-pulse" : ""}`}
          style={{
            background: "linear-gradient(135deg,#25d366,#128c7e)",
            boxShadow: "0 8px 24px rgba(37,211,102,0.45)",
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => {}}
          aria-label="Contactar por WhatsApp"
        >
          {/* WhatsApp SVG oficial */}
          <svg
            className="wa-icon"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 2C8.268 2 2 8.268 2 16c0 2.466.666 4.776 1.824 6.766L2 30l7.447-1.793A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 01-5.894-1.612l-.422-.25-4.42 1.063 1.1-4.296-.277-.44A11.56 11.56 0 014.4 16C4.4 9.59 9.59 4.4 16 4.4 22.41 4.4 27.6 9.59 27.6 16S22.41 27.6 16 27.6zm6.344-8.668c-.347-.174-2.055-1.013-2.374-1.129-.32-.116-.552-.174-.784.174-.232.347-.9 1.129-1.104 1.36-.203.232-.406.261-.753.087-.347-.174-1.465-.54-2.79-1.72-1.031-.918-1.727-2.052-1.93-2.399-.202-.347-.022-.535.152-.708.156-.156.347-.406.521-.61.174-.202.232-.346.347-.578.116-.231.058-.434-.029-.608-.087-.174-.784-1.89-1.074-2.588-.282-.68-.57-.588-.784-.598l-.667-.012c-.232 0-.608.087-.927.434-.318.347-1.217 1.19-1.217 2.9 0 1.71 1.246 3.363 1.42 3.595.173.231 2.452 3.743 5.942 5.25.83.359 1.479.573 1.984.733.833.265 1.592.228 2.191.138.668-.1 2.055-.84 2.346-1.652.29-.812.29-1.508.203-1.653-.087-.145-.318-.232-.666-.406z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
