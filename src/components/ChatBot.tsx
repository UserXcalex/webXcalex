"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

// ✅ PRODUCCIÓN
const XAIA_WEBHOOK_URL = "https://superozonoglobal.app.n8n.cloud/webhook/xcalex-xaia-chat";

type MessageRole = "user" | "xaia";

interface ChatMessage {
  id: number;
  role: MessageRole;
  text: string;
  whatsapp?: string;
}

export default function ChatBot() {
  const t = useTranslations("Chat");
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let msgId = useRef(0);

  // Greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: ++msgId.current,
        role: "xaia",
        text: t("greeting"),
      }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    // Stop pulse after first open
    if (isOpen) setPulse(false);
  }, [isOpen]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { id: ++msgId.current, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    console.log("[XAIA] 📤 Enviando mensaje con historial...");
    
    // Obtenemos los últimos 6 mensajes para dar contexto pero no saturar
    const history = messages.slice(-5).map(m => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text
    }));
    
    // Añadimos el mensaje actual al historial que enviamos
    history.push({ role: "user", content: text });

    try {
      const res = await fetch(XAIA_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text,
          history: history // Enviamos el array completo
        }),
      });

      console.log("[XAIA] 📡 HTTP Status:", res.status, res.statusText);

      const data = await res.json();
      console.log("[XAIA] 📥 Respuesta completa de n8n:", data);
      console.log("[XAIA] 💬 Mensaje de XAIA:", data.message);
      console.log("[XAIA] 🔀 Tipo:", data.type);
      if (data.whatsapp) console.log("[XAIA] 📱 WhatsApp URL:", data.whatsapp);

      const botMsg: ChatMessage = {
        id: ++msgId.current,
        role: "xaia",
        text: data.message,
        whatsapp: data.type === "transfer" ? data.whatsapp : undefined,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("[XAIA] ❌ Error de conexión:", err);
      setMessages((prev) => [
        ...prev,
        { id: ++msgId.current, role: "xaia", text: t("error") },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* === FLOATING BUTTON === */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip */}
        {!isOpen && pulse && (
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black px-3 py-1.5 rounded-lg animate-bounce shadow-lg">
            ¡Hola! ¿Tienes dudas? 👋
          </div>
        )}

        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Abrir chat XAIA"
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isOpen
              ? "bg-slate-800 dark:bg-slate-200 rotate-0 scale-100"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-110"
          }`}
        >
          {/* Pulse ring */}
          {pulse && !isOpen && (
            <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-40" />
          )}
          {isOpen ? (
            <X className="w-6 h-6 text-white dark:text-slate-900" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* === CHAT WINDOW === */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="bg-white dark:bg-[#0d1117] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800"
            style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3730a3 100%)" }}
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">X</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-sm leading-none">XAIA</p>
              <p className="text-blue-200 text-xs mt-0.5">{t("subtitle")}</p>
            </div>
            {/* Online dot */}
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-200 text-xs font-medium">{t("online")}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "xaia" && (
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-black text-xs">X</span>
                  </div>
                )}
                <div className={`max-w-[78%] flex flex-col gap-2`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {/* WhatsApp button */}
                  {msg.whatsapp && (
                    <a
                      href={msg.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-black text-xs rounded-xl transition-all duration-200 hover:shadow-lg"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.541 5.873L.057 23.99l6.304-1.654A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.866 9.866 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
                      </svg>
                      {t("whatsapp_btn")}
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                  <span className="text-blue-600 dark:text-blue-400 font-black text-xs">X</span>
                </div>
                <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
                placeholder={t("placeholder")}
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none disabled:opacity-50"
                maxLength={500}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
              XAIA · Xcalex AI Assistant
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
