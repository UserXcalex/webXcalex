import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import "../globals.css";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}];
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
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Forzamos la carga de mensajes usando el locale de la URL
  console.log('>>> [LAYOUT LOCAL] Renderizando para locale:', locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-[#020617] transition-colors duration-300`}>
        <NextIntlClientProvider 
          locale={locale} 
          messages={messages}
          timeZone="America/Bogota" // Ajusta a tu zona si quieres
        >
          <div id="theme-reveal-overlay" aria-hidden="true" />
          {children}
          <ChatBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
