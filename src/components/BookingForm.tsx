"use client";

import { useState } from "react";
import { Phone, Mail, User, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

const countryCodes = [
  { code: "+1", country: "Estados Unidos/Canadá", flag: "US" },
  { code: "+52", country: "México", flag: "MX" },
  { code: "+34", country: "España", flag: "ES" },
  { code: "+54", country: "Argentina", flag: "AR" },
  { code: "+56", country: "Chile", flag: "CL" },
  { code: "+57", country: "Colombia", flag: "CO" },
  { code: "+58", country: "Venezuela", flag: "VE" },
  { code: "+51", country: "Perú", flag: "PE" },
  { code: "+598", country: "Uruguay", flag: "UY" },
  { code: "+593", country: "Ecuador", flag: "EC" },
  { code: "+503", country: "El Salvador", flag: "SV" },
  { code: "+504", country: "Honduras", flag: "HN" },
  { code: "+502", country: "Guatemala", flag: "GT" },
  { code: "+506", country: "Costa Rica", flag: "CR" },
  { code: "+507", country: "Panamá", flag: "PA" },
  { code: "+55", country: "Brasil", flag: "BR" },
];

interface BookingFormProps {
  onSuccess: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const t = useTranslations("Booking");
  
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+1",
    phoneNumber: "",
    email: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    
    if (!formData.name || !formData.phoneNumber || !formData.email) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    
    try {
      // Usamos el endpoint de producción para mayor seguridad
      const response = await fetch("https://superozonoglobal.app.n8n.cloud/webhook/datos/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.countryCode + formData.phoneNumber,
          email: formData.email,
          source: "booking_form",
          date: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          onSuccess();
          setFormData({ name: "", countryCode: "+1", phoneNumber: "", email: "" });
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      setStatus("error");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  return (
    <div className="space-y-4">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t("labels.name")}
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={status === "loading" || status === "success"}
            placeholder={t("placeholders.name")}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t("labels.phone")}
        </label>
        <div className="flex gap-2">
          <select
            value={formData.countryCode}
            onChange={(e) => handleInputChange("countryCode", e.target.value)}
            disabled={status === "loading" || status === "success"}
            className="w-24 flex-shrink-0 px-2 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              disabled={status === "loading" || status === "success"}
              placeholder={t("placeholders.phone")}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t("labels.email")}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={status === "loading" || status === "success"}
            placeholder={t("placeholders.email")}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {t("status.error")}
          </p>
        </div>
      )}

      {/* Success Message */}
      {status === "success" && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              {t("status.success")}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={status === "loading" || status === "success"}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("status.submitting")}
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            {t("status.sent")}
          </>
        ) : (
          t("status.submit")
        )}
      </button>
    </div>
  );
}
