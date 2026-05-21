import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import "../globals.css";
import ChatBot from "@/components/ChatBot";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export const metadata: Metadata = {
  title: "Xcalex — Software a Medida de Élite y Soluciones de IA",
  description:
    "Diseñamos, desarrollamos y escalamos software a medida, sistemas de IA y plataformas digitales enfocadas al crecimiento para empresas ambiciosas.",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Forzamos la carga de mensajes usando el locale de la URL
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('xcalex-theme');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-[#02020a] transition-colors duration-300`}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="America/Bogota" // Ajusta a tu zona si quieres
        >
          <div id="theme-reveal-overlay" aria-hidden="true" />
          {children}
          {/* <ChatBot /> */}
        </NextIntlClientProvider>
        <Script
          src="https://web-xcalex.vercel.app/xaia-widget.js"
          strategy="lazyOnload"
          data-client="xcalex"
          data-webhook="https://superozonoglobal.app.n8n.cloud/webhook/xcalex-xaia-chat-v2"
          data-title="Ayuda Xcalex"
          data-subtitle="Asistente Virtual"
          data-primary="#A4BBF6" /* El color de tu marca */
          data-accent="#0F172A" /* Verde de WhatsApp */
        />
      </body>
    </html>
  );
}
