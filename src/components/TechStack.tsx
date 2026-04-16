"use client";

import { useInView } from "@/hooks/useInView";

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "AI/Backend" },
  { name: "TensorFlow", category: "AI" },
  { name: "Docker", category: "Cloud" },
  { name: "AWS", category: "Cloud" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Kubernetes", category: "Cloud" },
  { name: "Redis", category: "Performance" },
  { name: "GraphQL", category: "API" },
  { name: "MongoDB", category: "Database" },
  { name: "Rust", category: "Systems" },
  { name: "Go", category: "Backend" },
];

const categoryColor: any = {
  Frontend: "text-blue-500",
  Backend: "text-emerald-500",
  Language: "text-amber-500",
  AI: "text-purple-500",
  Cloud: "text-cyan-500",
  Database: "text-indigo-500",
  Systems: "text-orange-500",
  API: "text-rose-500",
  Performance: "text-lime-500",
};

export default function TechStack() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const row1 = technologies.slice(0, 8);
  const row2 = technologies.slice(8);

  const MarqueeRow = ({ items, speed, reverse, rowIndex }: { items: any[], speed: string, reverse?: boolean, rowIndex: number }) => {
    // Determine random entry positions for the first load reveal
    const directions = [
      { x: -50, y: 30 }, { x: 50, y: -30 }, { x: -30, y: -50 }, { x: 30, y: 50 }
    ];

    return (
      <div className="relative w-full overflow-hidden py-3 sm:py-5 lg:py-6">
        <div 
          className="flex flex-nowrap gap-10 sm:gap-16 lg:gap-24 items-center animate-marquee whitespace-nowrap"
          style={{ 
            width: 'max-content',
            animationDuration: speed,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {[...items, ...items, ...items, ...items].map((tech, idx) => {
            const globalIndex = technologies.findIndex(t => t.name === tech.name);
            const dir = directions[globalIndex % directions.length];
            const isOriginal = idx < items.length;

            return (
              <div
                key={`${tech.name}-${rowIndex}-${idx}`}
                style={{
                  transitionDelay: isOriginal ? `${globalIndex * 80}ms` : '0ms',
                  transform: inView ? 'translate(0, 0)' : `translate(${dir.x}px, ${dir.y}px)`,
                  opacity: inView ? 1 : 0,
                }}
                className="group relative flex-shrink-0 cursor-pointer"
              >
                {/* Scaled Down Massive Background Text */}
                <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-200/60 dark:text-slate-800/40 group-hover:text-slate-900 dark:group-hover:text-white transition-all duration-500 block select-none italic uppercase">
                  {tech.name}
                </span>
                
                {/* Category Indicator on Hover */}
                <div className="absolute -top-3 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${categoryColor[tech.category]}`}>
                    {tech.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section 
      id="tech" 
      ref={ref}
      className="py-24 lg:py-32 bg-slate-50 dark:bg-[#020617] border-y border-slate-100 dark:border-slate-800 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-20 lg:mb-28 text-center">
        <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Stack de Élite
        </p>
        <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
          Tecnologías que <span className="text-blue-600 dark:text-blue-400">Dominamos</span>.
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} speed="40s" rowIndex={0} />
        <MarqueeRow items={row2} speed="35s" reverse rowIndex={1} />
        <MarqueeRow items={row1} speed="45s" rowIndex={2} />
      </div>

      {/* Background radial accent */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none opacity-20 dark:opacity-40"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(37,99,235,0.15) 0%, transparent 70%)'
        }}
      />
    </section>
  );
}
