"use client";

import { useInView } from "@/hooks/useInView";

const technologies = [
  { name: "React",       category: "Frontend",    color: "text-blue-500" },
  { name: "Node.js",     category: "Backend",     color: "text-emerald-500" },
  { name: "Next.js",     category: "Frontend",    color: "text-blue-400" },
  { name: "TypeScript",  category: "Language",    color: "text-amber-500" },
  { name: "Python",      category: "AI/Backend",  color: "text-yellow-500" },
  { name: "TensorFlow",  category: "AI",          color: "text-orange-500" },
  { name: "Docker",      category: "Cloud",       color: "text-cyan-500" },
  { name: "AWS",         category: "Cloud",       color: "text-orange-400" },
  { name: "PostgreSQL",  category: "Database",    color: "text-indigo-500" },
  { name: "Kubernetes",  category: "Cloud",       color: "text-blue-600" },
  { name: "Redis",       category: "Performance", color: "text-red-500" },
  { name: "GraphQL",     category: "API",         color: "text-pink-500" },
  { name: "MongoDB",     category: "Database",    color: "text-green-500" },
  { name: "Rust",        category: "Systems",     color: "text-orange-600" },
  { name: "Go",          category: "Backend",     color: "text-cyan-400" },
];

const row1 = technologies.slice(0, 8);
const row2 = technologies.slice(8);

function MarqueeRow({
  items,
  speed,
  reverse,
  inView,
}: {
  items: typeof technologies;
  speed: string;
  reverse?: boolean;
  inView: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden py-4 lg:py-5">
      <div
        className="flex flex-nowrap gap-10 sm:gap-16 lg:gap-20 items-center animate-marquee whitespace-nowrap"
        style={{
          width: "max-content",
          animationDuration: speed,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items, ...items, ...items].map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="group relative flex-shrink-0 cursor-default transition-all duration-500"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transitionDelay: idx < items.length ? `${(idx % items.length) * 60}ms` : "0ms",
            }}
          >
            <span
              className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-[-0.02em] uppercase select-none block transition-all duration-400 text-slate-200/50 dark:text-white/10 group-hover:text-slate-700 dark:group-hover:text-white`}
            >
              {tech.name}
            </span>
            <span
              className={`absolute -top-3 left-0 text-[9px] font-black tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tech.color}`}
            >
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="tech"
      ref={ref}
      className="relative py-28 lg:py-36 bg-white dark:bg-[#07070f] border-y border-slate-100 dark:border-white/[0.05] transition-colors duration-500 overflow-hidden"
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 mb-20 lg:mb-24 text-center">
        <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.35em] uppercase mb-5">
          Stack de Élite
        </p>
        <h2 className="text-4xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.06]">
          Tecnologías que{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
            Dominamos
          </span>
          <span className="text-blue-500">.</span>
        </h2>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-2">
        <MarqueeRow items={row1} speed="40s" inView={inView} />
        <MarqueeRow items={row2} speed="35s" reverse inView={inView} />
        <MarqueeRow items={row1} speed="45s" inView={inView} />
      </div>
    </section>
  );
}
