"use client";

import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const isTransitioning = useRef(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const overlay = document.getElementById("theme-reveal-overlay");
    if (!overlay) {
      // Fallback if no overlay
      const newDark = !isDark;
      setIsDark(newDark);
      document.documentElement.classList.toggle("dark", newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
      isTransitioning.current = false;
      return;
    }

    // Set overlay color to match target theme
    const nextTheme = !isDark ? "dark" : "light";
    const nextBgColor = nextTheme === "dark" ? "#020617" : "#ffffff";
    overlay.style.backgroundColor = nextBgColor;
    
    // Start animation
    overlay.classList.add("active");

    // Halfway through animation, swap actual theme
    setTimeout(() => {
      const newDark = !isDark;
      setIsDark(newDark);
      document.documentElement.classList.toggle("dark", newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
    }, 600); // 1.2s total transition / 2

    // Complete animation
    setTimeout(() => {
      overlay.classList.remove("active");
      isTransitioning.current = false;
    }, 1300);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 transition-all duration-300 hover:border-blue-500 group flex items-center cursor-pointer overflow-hidden shadow-inner"
      aria-label="Toggle theme"
    >
      <div 
        className={`absolute inset-0 bg-blue-600/10 dark:bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity`} 
      />
      <div
        className={`relative z-10 w-4 h-4 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center transition-all duration-500 transform ${
          isDark ? "translate-x-6 rotate-0" : "translate-x-0 rotate-[360deg]"
        }`}
      >
        {isDark ? (
          <Moon size={10} className="text-blue-500" />
        ) : (
          <Sun size={10} className="text-amber-500" />
        )}
      </div>
    </button>
  );
}
