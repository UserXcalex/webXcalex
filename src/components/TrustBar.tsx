"use client";

const clients = [
  "Super Ozono",
  "Biozono",
];

export default function TrustBar() {
  return (
    <section className="relative bg-white dark:bg-[#02020a] border-y border-slate-100 dark:border-white/[0.05] transition-colors duration-500 overflow-hidden py-8 lg:py-11">

      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Label */}
      <p className="text-center text-[9px] font-black tracking-[0.35em] uppercase text-slate-400 dark:text-slate-600 mb-6 px-4">
        Empresas que confían en Xcalex
      </p>

      {/* Marquee */}
      <div className="relative flex items-center overflow-hidden whitespace-nowrap">
        <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-white dark:from-[#02020a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-white dark:from-[#02020a] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-10 sm:gap-16 lg:gap-20">
          {[...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="text-slate-300 dark:text-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-400 text-[11px] sm:text-[13px] font-black tracking-[0.3em] uppercase select-none cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
