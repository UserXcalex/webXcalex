export type DevLocale = "es" | "en";

/* ============================================================
   Datos de contacto / links — actualiza aquí cuando cambien
   ============================================================ */
export const LINKS = {
  github: "https://github.com/AndresDev0512",
  linkedin: "https://www.linkedin.com/in/cesar-caceres01/",
  email: "cesar.cace2005@gmail.com",
  whatsapp:
    "https://wa.me/573504385597?text=" +
    encodeURIComponent("Hola Andrés, vi tu portafolio y me gustaría hablar contigo 👋"),
  cv: "/cv-andres-caceres.pdf",
  xcalex: "https://xcalex.co",
};

export const CONTENT = {
  es: {
    nav: { projects: "Proyectos", pipeline: "Especialidad", stack: "Stack", contact: "Contacto" },
    hero: {
      available: "Disponible para trabajo remoto",
      greeting: "Hola, soy",
      name: "Andrés Cáceres",
      roles: ["Backend Developer", "Full Stack Developer", "Automation Engineer", "Fundador @Xcalex"],
      tagline:
        "Construyo backends, automatizaciones e integraciones que convierten leads en clientes. Java · Spring Boot · n8n · Meta & WhatsApp API.",
      ctaProjects: "Ver proyectos",
      ctaCv: "Descargar CV",
      scroll: "Desliza para explorar",
    },
    terminal: {
      title: "andres@xcalex: ~/portfolio",
      role: "Backend & Full Stack Developer",
      superpower: "Conectar sistemas que no se hablan",
      experience: "2+ años enviando código a producción",
      location: "Cúcuta, CO → Remoto LATAM/Global",
      status: "open_to_work: true",
    },
    stats: [
      { value: 2, suffix: "+", label: "Años construyendo para empresas reales" },
      { value: 10, suffix: "+", label: "Proyectos entregados en producción" },
      { value: 6, suffix: "+", label: "Integraciones de APIs externas" },
      { value: 1, suffix: "", label: "Agencia fundada: Xcalex" },
    ],
    about: {
      kicker: "Sobre mí",
      title: "El junior que ya entregó software en producción",
      body: [
        "Empecé a los 18. Llevo más de dos años construyendo soluciones para empresas reales: CRMs, automatización de leads, integraciones con Meta y WhatsApp, ecommerce y plataformas educativas.",
        "Fundé Xcalex, una agencia de soluciones digitales, donde diseño y entrego productos de punta a punta. Eso me dio algo que pocos desarrolladores junior tienen: criterio de negocio. No solo escribo código — entiendo qué problema resuelve y cuánto vale resolverlo.",
      ],
    },
    pipeline: {
      kicker: "Mi especialidad",
      title: "Conecto sistemas que no se hablan",
      subtitle:
        "Este es el tipo de pipeline que construyo: un lead llega desde un anuncio de Meta y aterriza en el CRM, asignado a un asesor, en segundos. Sin digitación manual. Sin leads perdidos.",
      nodes: {
        meta: { name: "Meta Ads", desc: "Lead llega del anuncio" },
        n8n: { name: "n8n", desc: "Valida, enriquece y enruta" },
        crm: { name: "xPulse CRM", desc: "Asignación round-robin" },
        wa: { name: "WhatsApp", desc: "Asesor contacta al instante" },
      },
      caption: "Pipeline real en producción — construido con webhooks de Meta, n8n y Spring Boot",
    },
    projects: {
      kicker: "Proyectos destacados",
      title: "Problema → Solución → Resultado",
      items: [
        {
          name: "xPulse CRM",
          tag: "Producto estrella",
          problem:
            "Los equipos comerciales perdían leads porque llegaban de Facebook y nadie los asignaba a tiempo.",
          solution:
            "CRM con Spring Boot 3 y arquitectura hexagonal, frontend en Next.js. Los leads entran vía webhook de Meta + n8n y se asignan por round-robin a los asesores. JWT, roles y despliegue en Cloud Run.",
          result: "Un lead pasa del anuncio al asesor en segundos, sin digitación manual.",
          stack: ["Spring Boot 3", "Arq. Hexagonal", "Next.js", "PostgreSQL", "JWT", "Cloud Run"],
        },
        {
          name: "Pipeline de automatización de leads",
          tag: "Open source",
          problem: "Una empresa digitaba a mano cada lead que llegaba de Facebook, perdiendo horas y oportunidades.",
          solution:
            "Pipeline Meta → n8n → Google Sheets → CRM que ingesta, valida y distribuye leads automáticamente, con notificación por WhatsApp al asesor asignado.",
          result: "Cero digitación manual. Ingesta de leads en tiempo real, 24/7.",
          stack: ["n8n", "Meta API", "WhatsApp Business API", "Google Sheets", "Webhooks"],
        },
        {
          name: "Ecommerce backend",
          tag: "Backend puro",
          problem: "Una tienda online necesitaba un backend robusto, consumido por un frontend de otro equipo.",
          solution:
            "Diseñé los endpoints REST, la lógica de negocio y la gestión de datos en Spring Boot, coordinándome con el frontend ajeno por contrato de API.",
          result: "Trabajo backend coordinado con equipos externos — comunicación por contrato de API.",
          stack: ["Java 17", "Spring Boot", "REST API", "PostgreSQL", "JPA"],
        },
        {
          name: "Plataformas de certificación",
          tag: "Full stack",
          problem: "Academias que vendían cursos sin plataforma propia para inscribir y certificar alumnos.",
          solution:
            "Plataformas educativas full stack: catálogo de cursos, inscripción, panel administrativo y gestión de contenido.",
          result: "Academias operando online de punta a punta, con gestión autónoma del contenido.",
          stack: ["Next.js", "Strapi", "Node.js", "Supabase", "Tailwind"],
        },
      ],
      problemLabel: "Problema",
      solutionLabel: "Solución",
      resultLabel: "Resultado",
    },
    stack: {
      kicker: "Stack",
      title: "Herramientas con las que construyo",
      groups: [
        { name: "Backend", items: ["Java 17", "Spring Boot 3", "NestJS", "Node.js"] },
        { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
        { name: "Datos & Cloud", items: ["PostgreSQL", "Supabase", "Google Cloud Run", "Git"] },
        {
          name: "Automatización & APIs",
          items: ["n8n", "Meta API", "WhatsApp Business API", "REST APIs", "Integraciones IA"],
        },
      ],
    },
    contact: {
      kicker: "Contacto",
      title: "¿Construimos algo juntos?",
      subtitle:
        "Abierto a roles remotos: Backend Jr · Full Stack Jr · Automatización · Integraciones · CRM. Respondo rápido.",
      email: "Escríbeme",
      whatsapp: "WhatsApp",
      footer: "Diseñado y construido por Andrés Cáceres",
    },
  },
  en: {
    nav: { projects: "Projects", pipeline: "Specialty", stack: "Stack", contact: "Contact" },
    hero: {
      available: "Available for remote work",
      greeting: "Hi, I'm",
      name: "Andrés Cáceres",
      roles: ["Backend Developer", "Full Stack Developer", "Automation Engineer", "Founder @Xcalex"],
      tagline:
        "I build backends, automations and integrations that turn leads into customers. Java · Spring Boot · n8n · Meta & WhatsApp API.",
      ctaProjects: "View projects",
      ctaCv: "Download CV",
      scroll: "Scroll to explore",
    },
    terminal: {
      title: "andres@xcalex: ~/portfolio",
      role: "Backend & Full Stack Developer",
      superpower: "Connecting systems that don't talk",
      experience: "2+ years shipping to production",
      location: "Cúcuta, CO → Remote LATAM/Global",
      status: "open_to_work: true",
    },
    stats: [
      { value: 2, suffix: "+", label: "Years building for real companies" },
      { value: 10, suffix: "+", label: "Projects shipped to production" },
      { value: 6, suffix: "+", label: "Third-party API integrations" },
      { value: 1, suffix: "", label: "Agency founded: Xcalex" },
    ],
    about: {
      kicker: "About me",
      title: "The junior who already shipped production software",
      body: [
        "I started at 18. For over two years I've been building solutions for real companies: CRMs, lead automation, Meta and WhatsApp integrations, ecommerce and education platforms.",
        "I founded Xcalex, a digital solutions agency, where I design and deliver products end to end. That gave me something few junior developers have: business judgment. I don't just write code — I understand what problem it solves and what solving it is worth.",
      ],
    },
    pipeline: {
      kicker: "My specialty",
      title: "I connect systems that don't talk",
      subtitle:
        "This is the kind of pipeline I build: a lead comes in from a Meta ad and lands in the CRM, assigned to a sales rep, within seconds. No manual data entry. No lost leads.",
      nodes: {
        meta: { name: "Meta Ads", desc: "Lead arrives from the ad" },
        n8n: { name: "n8n", desc: "Validates, enriches & routes" },
        crm: { name: "xPulse CRM", desc: "Round-robin assignment" },
        wa: { name: "WhatsApp", desc: "Rep reaches out instantly" },
      },
      caption: "Real pipeline in production — built with Meta webhooks, n8n and Spring Boot",
    },
    projects: {
      kicker: "Featured projects",
      title: "Problem → Solution → Result",
      items: [
        {
          name: "xPulse CRM",
          tag: "Flagship",
          problem: "Sales teams were losing leads because they came in from Facebook and nobody assigned them in time.",
          solution:
            "CRM built with Spring Boot 3 and hexagonal architecture, Next.js frontend. Leads come in via Meta webhook + n8n and get round-robin assigned to reps. JWT, roles, deployed on Cloud Run.",
          result: "A lead goes from ad to sales rep in seconds, with zero manual entry.",
          stack: ["Spring Boot 3", "Hexagonal Arch.", "Next.js", "PostgreSQL", "JWT", "Cloud Run"],
        },
        {
          name: "Lead automation pipeline",
          tag: "Open source",
          problem: "A company manually typed every lead coming from Facebook, losing hours and opportunities.",
          solution:
            "Meta → n8n → Google Sheets → CRM pipeline that ingests, validates and distributes leads automatically, notifying the assigned rep via WhatsApp.",
          result: "Zero manual entry. Real-time lead ingestion, 24/7.",
          stack: ["n8n", "Meta API", "WhatsApp Business API", "Google Sheets", "Webhooks"],
        },
        {
          name: "Ecommerce backend",
          tag: "Pure backend",
          problem: "An online store needed a robust backend, consumed by another team's frontend.",
          solution:
            "Designed the REST endpoints, business logic and data layer in Spring Boot, coordinating with the external frontend through an API contract.",
          result: "Backend work coordinated with external teams — communication through an API contract.",
          stack: ["Java 17", "Spring Boot", "REST API", "PostgreSQL", "JPA"],
        },
        {
          name: "Certification platforms",
          tag: "Full stack",
          problem: "Academies selling courses without their own platform to enroll and certify students.",
          solution:
            "Full stack education platforms: course catalog, enrollment, admin panel and content management.",
          result: "Academies operating online end to end, managing their own content.",
          stack: ["Next.js", "Strapi", "Node.js", "Supabase", "Tailwind"],
        },
      ],
      problemLabel: "Problem",
      solutionLabel: "Solution",
      resultLabel: "Result",
    },
    stack: {
      kicker: "Stack",
      title: "Tools I build with",
      groups: [
        { name: "Backend", items: ["Java 17", "Spring Boot 3", "NestJS", "Node.js"] },
        { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
        { name: "Data & Cloud", items: ["PostgreSQL", "Supabase", "Google Cloud Run", "Git"] },
        {
          name: "Automation & APIs",
          items: ["n8n", "Meta API", "WhatsApp Business API", "REST APIs", "AI Integrations"],
        },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Let's build something together",
      subtitle:
        "Open to remote roles: Backend Jr · Full Stack Jr · Automation · Integrations · CRM. I reply fast.",
      email: "Email me",
      whatsapp: "WhatsApp",
      footer: "Designed and built by Andrés Cáceres",
    },
  },
} as const;
