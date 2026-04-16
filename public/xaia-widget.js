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
    launcherIcon: currentScript?.dataset.icon || `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    botIcon: currentScript?.dataset.boticon || `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
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
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 2147483647;
      background: ${config.primaryColor};
      color: #ffffff;
    }
    #xaia-launcher:hover {
      transform: scale(1.1);
    }
    #xaia-widget {
      position: fixed;
      bottom: 100px;
      right: 24px;
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
    }
    #xaia-footer {
      padding: 14px;
      border-top: 1px solid #e2e8f0;
      background: #ffffff;
    }
    #xaia-form {
      display: flex;
      gap: 8px;
      background: #f1f5f9;
      padding: 6px;
      border-radius: 24px;
      border: 1px solid #e2e8f0;
    }
    #xaia-form:focus-within {
      border-color: ${config.primaryColor};
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
    #xaia-input {
      flex: 1;
      padding: 8px 12px;
      border: none;
      background: transparent;
      outline: none;
      font-size: 16px; /* 16px impide zoom en iOS Safari */
      color: #0f172a;
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
    .xaia-typing-container {
      display: flex;
      gap: 4px;
      padding: 6px 4px;
    }
    .xaia-typing-dot {
      width: 6px;
      height: 6px;
      background: #94a3b8;
      border-radius: 50%;
      animation: xaia-bounce 1.4s infinite ease-in-out both;
    }
    .xaia-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .xaia-typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes xaia-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
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
    <button id="xaia-launcher" aria-label="Abrir chat">
      ${config.launcherIcon}
    </button>
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
  const messagesBox = document.getElementById("xaia-messages");
  const form = document.getElementById("xaia-form");
  const input = document.getElementById("xaia-input");
  const sendBtn = document.getElementById("xaia-send");
  
  let history = loadHistory();
  let isLoading = false;

  // Listeners
  const toggleChat = () => {
    widget.classList.toggle("xaia-open");
    // Al abrir por primera vez, si el chat está vacío se envía el saludo inicial
    if (widget.classList.contains("xaia-open") && messagesBox.children.length === 0) {
      renderInitial();
    }
  };

  launcher.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", () => widget.classList.remove("xaia-open"));

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
      <div class="xaia-msg">
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
