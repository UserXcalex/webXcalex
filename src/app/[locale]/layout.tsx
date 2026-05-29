import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import "../globals.css";
import ChatBot from "@/components/ChatBot";
import SplashScreen from "@/components/SplashScreen";
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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '990099287216577');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=990099287216577&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      
      <body className={`${inter.className} antialiased bg-white dark:bg-[#02020a] transition-colors duration-300`}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="America/Bogota" // Ajusta a tu zona si quieres
        >
          <SplashScreen />
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
