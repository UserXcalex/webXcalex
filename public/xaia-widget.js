(function () {
  // Configuración por defecto y lectura de atributos del script
  const currentScript = document.currentScript;
  const config = {
    webhookUrl: currentScript?.dataset.webhook || "https://superozonoglobal.app.n8n.cloud/webhook/xcalex-xaia-chat",
    clientId: currentScript?.dataset.client || "default",
    title: currentScript?.dataset.title || "XAIA",
    subtitle: currentScript?.dataset.subtitle || "Asistente Virtual",
    primaryColor: currentScript?.dataset.primary || "#2563eb",
    accentColor: currentScript?.dataset.accent || "#22c55e",
    welcomeMessage: currentScript?.dataset.welcome || "¡Hola! Soy la asesora de IA. ¿En qué puedo ayudarte hoy?",
    launcherIcon: currentScript?.dataset.launchericon || '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
    botIcon: currentScript?.dataset.boticon || '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
    storageKey: currentScript?.dataset.storage || "xaia_chat_history",
  };

  // Inyectar CSS dinámico en el head
  const style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
    
    #xaia-root {
      font-family: 'Inter', sans-serif;
      box-sizing: border-box;
    }
    #xaia-root * {
      box-sizing: inherit;
    }
    #xaia-launcher {
      position: fixed;
      bottom: 24px;
      right: 120px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-start; /* Alineado al inicio para la expansión */
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 2147483647;
      background: ${config.primaryColor};
      color: #ffffff;
      padding: 0;
      /* overflow: hidden removido para permitir que la onda se vea */
    }
    #xaia-launcher:hover {
      width: 160px;
    }
    #xaia-launcher-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden; /* El recorte ahora ocurre aquí */
      border-radius: inherit;
      position: relative;
      z-index: 2;
    }
    #xaia-launcher.xaia-open-state {
      width: 60px !important;
    }
    #xaia-icon-wrapper {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    #xaia-launcher-text {
      font-weight: 600;
      font-size: 15px;
      opacity: 0;
      max-width: 0;
      overflow: hidden;
      transition: all 0.3s ease;
      pointer-events: none;
      white-space: nowrap;
    }
    #xaia-launcher:hover #xaia-launcher-text {
      opacity: 1;
      max-width: 100px;
      margin-left: 0px;
      margin-right: 15px;
    }
    #xaia-launcher:active {
      transform: scale(0.95);
    }
    #xaia-launcher.xaia-pulse {
      animation: xaia-heartbeat 2s infinite;
    }
    #xaia-launcher.xaia-pulse::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: linear-gradient(45deg, ${config.primaryColor}, #818cf8, #c084fc);
      z-index: 1;
      animation: xaia-wave 2s infinite, xaia-gradient-move 3s infinite linear;
      opacity: 0;
      transition: opacity 0.3s;
    }
    #xaia-launcher:hover::after {
      opacity: 0 !important;
      animation: none;
    }
    @keyframes xaia-wave {
      0% { transform: scale(1); opacity: 0.7; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    @keyframes xaia-gradient-move {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    #xaia-launcher-tooltip {
      position: fixed;
      bottom: 100px;
      right: 80px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      color: #0f172a;
      padding: 12px 20px;
      border-radius: 18px 18px 4px 18px;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
      z-index: 2147483646;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events: none;
      border: 1px solid rgba(255, 255, 255, 0.4);
      max-width: 240px;
      animation: xaia-float 3s infinite ease-in-out;
    }
    @keyframes xaia-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    #xaia-launcher-tooltip.show {
      opacity: 1;
      transform: translateY(0);
    }
    #xaia-launcher-tooltip.show {
      animation: xaia-tooltip-entrance 0.5s ease-out, xaia-float 3s 0.5s infinite ease-in-out;
    }
    @keyframes xaia-tooltip-entrance {
      from { opacity: 0; transform: scale(0.8) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    #xaia-launcher-tooltip::after {
      content: '';
      position: absolute;
      bottom: -8px;
      right: 20px;
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }
    #xaia-widget {
      position: fixed;
      bottom: 100px;
      right: 80px;
      width: 380px;
      height: 600px;
      max-height: calc(100svh - 120px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      z-index: 2147483647;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.95);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: bottom right;
    }
    #xaia-widget.xaia-open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }
    #xaia-header {
      padding: 16px 20px;
      color: #ffffff;
      background: linear-gradient(135deg, ${config.primaryColor} 0%, rgba(0,0,0,0.8) 100%);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .xaia-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    .xaia-header-info {
      flex: 1;
    }
    #xaia-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 1.2;
    }
    #xaia-subtitle {
      font-size: 12px;
      opacity: 0.8;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .xaia-online-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
      animation: xaia-pulse 2s infinite;
    }
    @keyframes xaia-pulse {
      0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
      70% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
      100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
    }
    #xaia-close {
      background: transparent;
      border: none;
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;
    }
    #xaia-close:hover {
      background: rgba(255,255,255,0.1);
      color: #ffffff;
    }
    #xaia-messages {
      flex: 1;
      padding: 20px 16px;
      overflow-y: auto;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .xaia-msg-wrapper {
      display: flex;
      gap: 8px;
    }
    .xaia-msg-wrapper.user {
      justify-content: flex-end;
    }
    .xaia-msg-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #e0e7ff;
      border: 1px solid #c7d2fe;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${config.primaryColor};
      flex-shrink: 0;
      margin-top: 4px;
    }
    .xaia-msg {
      max-width: 100%;
      padding: 12px 14px;
      line-height: 1.5;
      font-size: 14px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .user .xaia-msg {
      background: ${config.primaryColor};
      color: #ffffff;
      border-radius: 16px 16px 4px 16px;
    }
    .bot .xaia-msg {
      background: #ffffff;
      color: #0f172a;
      border: 1px solid #e2e8f0;
      border-radius: 16px 16px 16px 4px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      width: fit-content;
    }
    #xaia-footer {
      padding: 10px 14px;
      border-top: 1px solid #f1f5f9;
      background: #ffffff;
    }
    #xaia-form {
      display: flex;
      gap: 10px;
      background: #f8fafc;
      padding: 4px 6px;
      border-radius: 24px;
      border: 1px solid #e2e8f0;
      transition: all 0.2s;
    }
    #xaia-form:focus-within {
      border-color: ${config.primaryColor};
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    }
    #xaia-input {
      flex: 1;
      padding: 8px 12px;
      border: none;
      background: transparent;
      outline: none;
      font-size: 15px;
      color: #0f172a;
      font-family: inherit;
    }
    #xaia-input::placeholder {
      color: #94a3b8;
    }
    #xaia-send {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      background: ${config.primaryColor};
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    #xaia-send:hover {
      filter: brightness(1.1);
    }
    #xaia-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .xaia-transfer-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
      color: #ffffff;
      background: ${config.accentColor};
      padding: 10px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      margin-top: 12px;
      transition: all 0.2s;
      width: 100%;
      box-shadow: 0 4px 6px rgba(34, 197, 94, 0.2);
    }
    .xaia-transfer-btn:hover {
      box-shadow: 0 6px 12px rgba(34, 197, 94, 0.3);
      filter: brightness(1.05);
    }
    .bot #xaia-typing-indicator-bubble {
      padding: 8px 12px !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .xaia-typing-container {
      display: flex;
      gap: 5px;
      padding: 0;
      align-items: center;
      height: 20px;
    }
    .xaia-typing-dot {
      width: 6px;
      height: 6px;
      background: #cbd5e1;
      border-radius: 50%;
      animation: xaia-pulse-dot 1s infinite ease-in-out both;
    }
    .xaia-typing-dot:nth-child(1) { animation-delay: 0s; }
    .xaia-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .xaia-typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes xaia-pulse-dot {
      0%, 100% { transform: scale(0.8); opacity: 0.4; background: #cbd5e1; }
      50% { transform: scale(1.3); opacity: 1; background: ${config.primaryColor}; }
    }
    
    @media (max-width: 480px) {
      #xaia-widget {
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }
      #xaia-launcher {
        right: 16px;
        bottom: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // Crear contenedor root si no existe
  let root = document.getElementById("xaia-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "xaia-root";
    document.body.appendChild(root);
  }

  // HTML Interno
  root.innerHTML = `
    <button id="xaia-launcher" class="xaia-pulse" aria-label="Abrir chat">
      <div id="xaia-launcher-content">
        <div id="xaia-icon-wrapper">
          <div id="xaia-icon-open">${config.launcherIcon}</div>
          <svg id="xaia-icon-close" style="display:none" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </div>
        <span id="xaia-launcher-text">Asistente</span>
      </div>
    </button>
    <div id="xaia-launcher-tooltip">${config.welcomeMessage}</div>
    <div id="xaia-widget">
      <div id="xaia-header">
        <div class="xaia-avatar">${config.botIcon}</div>
        <div class="xaia-header-info">
          <div id="xaia-title">${config.title}</div>
          <div id="xaia-subtitle">
            <span class="xaia-online-dot"></span>
            ${config.subtitle}
          </div>
        </div>
        <button id="xaia-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div id="xaia-messages"></div>
      <div id="xaia-footer">
        <form id="xaia-form">
          <input id="xaia-input" type="text" placeholder="Escribe tu mensaje..." autocomplete="off" />
          <button id="xaia-send" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </div>
  `;

  // Variables
  const launcher = document.getElementById("xaia-launcher");
  const widget = document.getElementById("xaia-widget");
  const closeBtn = document.getElementById("xaia-close");
  const iconOpen = document.getElementById("xaia-icon-open");
  const iconClose = document.getElementById("xaia-icon-close");
  const messagesBox = document.getElementById("xaia-messages");
  const form = document.getElementById("xaia-form");
  const input = document.getElementById("xaia-input");
  const sendBtn = document.getElementById("xaia-send");
  const tooltip = document.getElementById("xaia-launcher-tooltip");

  let history = loadHistory();
  let isLoading = false;

  // Mostrar el tooltip después de 3 segundos
  setTimeout(() => {
    if (!widget.classList.contains("xaia-open")) {
      tooltip.classList.add("show");
    }
  }, 3000);

  // Listeners
  const toggleChat = () => {
    const isOpen = widget.classList.toggle("xaia-open");
    iconOpen.style.display = isOpen ? "none" : "block";
    iconClose.style.display = isOpen ? "block" : "none";

    if (isOpen) {
      tooltip.classList.remove("show");
      launcher.classList.remove("xaia-pulse");
      launcher.classList.add("xaia-open-state");
      if (window.innerWidth > 480) input.focus();
    } else {
      launcher.classList.remove("xaia-open-state");
      launcher.classList.add("xaia-pulse");
      // Opcional: Volver a mostrar el tooltip tras un pequeño delay al cerrar
      setTimeout(() => {
        if (!widget.classList.contains("xaia-open")) {
          tooltip.classList.add("show");
        }
      }, 2000);
    }

    if (isOpen && messagesBox.children.length === 0) {
      renderInitial();
    }
  };

  launcher.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || isLoading) return;

    addMessage("user", text);

    // Enviamos un subset del historial para no saturar tokens (los últimos 5 + el nuevo)
    const contextHistory = history.slice(-5);
    contextHistory.push({ role: "user", content: text });

    // Guardamos en local storage el full history
    history.push({ role: "user", content: text });
    saveHistory();

    input.value = "";
    showTyping();
    isLoading = true;
    input.disabled = true;
    sendBtn.disabled = true;

    try {
      const response = await fetch(config.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: contextHistory,
          client_id: config.clientId
        })
      });
      const data = await response.json();
      removeTyping();

      if (data.message) {
        addMessage("assistant", data.message, data.type === "transfer" ? data.whatsapp : null);
        history.push({ role: "assistant", content: data.message });
        saveHistory();
      }
    } catch (error) {
      removeTyping();
      addMessage("assistant", "Hubo un error de conexión. Por favor, intenta de nuevo.");
      console.error("[XAIA Widget] Error:", error);
    } finally {
      isLoading = false;
      input.disabled = false;
      sendBtn.disabled = false;
      setTimeout(() => input.focus(), 50);
    }
  });

  // Funciones Auxiliares
  function renderInitial() {
    if (!history.length) {
      addMessage("assistant", config.welcomeMessage);
      history.push({ role: "assistant", content: config.welcomeMessage });
      saveHistory();
      return;
    }
    history.forEach(msg => {
      addMessage(msg.role, msg.content, msg.whatsapp);
    });
  }

  function addMessage(sender, text, whatsappLink = null) {
    const isBot = sender !== "user";
    const wrapper = document.createElement("div");
    wrapper.className = `xaia-msg-wrapper ${isBot ? 'bot' : 'user'}`;

    let avatarHtml = "";
    if (isBot) {
      avatarHtml = `<div class="xaia-msg-avatar">${config.botIcon}</div>`;
    }

    let extraHtml = "";
    if (whatsappLink) {
      extraHtml = `<a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="xaia-transfer-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.541 5.873L.057 23.99l6.304-1.654A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.866 9.866 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/></svg>
        Continuar por WhatsApp
      </a>`;
    }

    wrapper.innerHTML = `
      ${avatarHtml}
      <div style="display:flex; flex-direction:column; max-width:85%;">
        <div class="xaia-msg">${text}</div>
        ${extraHtml}
      </div>
    `;

    messagesBox.appendChild(wrapper);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function showTyping() {
    removeTyping();
    const wrapper = document.createElement("div");
    wrapper.className = "xaia-msg-wrapper bot";
    wrapper.id = "xaia-typing-indicator";
    wrapper.innerHTML = `
      <div class="xaia-msg-avatar">${config.botIcon}</div>
      <div id="xaia-typing-indicator-bubble" class="xaia-msg">
        <div class="xaia-typing-container">
          <div class="xaia-typing-dot"></div>
          <div class="xaia-typing-dot"></div>
          <div class="xaia-typing-dot"></div>
        </div>
      </div>
    `;
    messagesBox.appendChild(wrapper);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById("xaia-typing-indicator");
    if (typing) typing.remove();
  }

  function saveHistory() {
    localStorage.setItem(config.storageKey, JSON.stringify(history));
  }

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(config.storageKey)) || [];
    } catch {
      return [];
    }
  }
})();
