"use client";

const clients = [
  "Meridian Group",
  "Arcova Capital",
  "Vexor Systems",
  "Lumis Ventures",
  "Stratum AI",
  "Nordex Corp",
  "Opallion",
  "Veract Labs",
];

export default function TrustBar() {
  return (
    <section className="bg-white dark:bg-[#020617] border-y border-slate-100 dark:border-slate-800 transition-colors duration-500 overflow-hidden py-10 lg:py-14">
      <div className="relative flex items-center gap-12 sm:gap-24 overflow-hidden whitespace-nowrap">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-white dark:from-[#020617] to-transparent z-10" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-white dark:from-[#020617] to-transparent z-10" />

        <div className="animate-marquee flex items-center gap-12 sm:gap-24">
          {[...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="text-slate-900 dark:text-slate-300 hover:text-blue-600 transition-colors duration-300 text-sm font-black tracking-widest uppercase select-none cursor-pointer"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
