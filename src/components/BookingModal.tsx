"use client";

import { X } from "lucide-react";
import BookingForm from "./BookingForm";
import { useTranslations } from "next-intl";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const t = useTranslations("Booking");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-[#020617] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t("title")}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t("description")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <BookingForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
