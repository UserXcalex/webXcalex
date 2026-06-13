import type { Metadata } from "next";
import AndresDev from "@/components/andresdev/AndresDev";
import type { DevLocale } from "@/components/andresdev/content";

export const metadata: Metadata = {
  title: "Andrés Cáceres — Backend & Full Stack Developer | Java · Spring Boot · n8n",
  description:
    "Desarrollador Backend & Full Stack. Construyo backends, automatizaciones e integraciones que convierten leads en clientes: Java, Spring Boot, n8n, Meta API, WhatsApp Business API. Fundador de Xcalex. Disponible para trabajo remoto.",
  openGraph: {
    title: "Andrés Cáceres — Backend & Full Stack Developer",
    description:
      "Backends, automatizaciones e integraciones que convierten leads en clientes. Java · Spring Boot · n8n · Meta & WhatsApp API.",
    url: "https://xcalex.co/andresdev",
    siteName: "Andrés Cáceres",
    type: "profile",
  },
};

export default function AndresDevPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const devLocale: DevLocale = locale === "en" ? "en" : "es";
  return <AndresDev locale={devLocale} />;
}
