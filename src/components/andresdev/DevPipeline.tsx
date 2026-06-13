"use client";

import { Facebook, Workflow, Database, MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type NodeInfo = { name: string; desc: string };

const NODE_STYLES = [
  { icon: Facebook, ring: "from-blue-500 to-blue-600", glow: "rgba(59,130,246,0.45)" },
  { icon: Workflow, ring: "from-pink-500 to-rose-600", glow: "rgba(236,72,153,0.45)" },
  { icon: Database, ring: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.45)" },
  { icon: MessageCircle, ring: "from-emerald-500 to-green-600", glow: "rgba(16,185,129,0.45)" },
];

function PipelineNode({
  node,
  styleIdx,
  delay,
}: {
  node: NodeInfo;
  styleIdx: number;
  delay: number;
}) {
  const { icon: Icon, ring, glow } = NODE_STYLES[styleIdx];
  return (
    <div
      className="adev-node relative flex flex-col items-center text-center w-[150px] shrink-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${ring} flex items-center justify-center adev-node-pulse`}
        style={{ "--node-glow": glow } as React.CSSProperties}
      >
        <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
      </div>
      <p className="mt-3 text-sm font-bold text-white">{node.name}</p>
      <p className="mt-1 text-[11px] leading-snug text-slate-500">{node.desc}</p>
    </div>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <div className="adev-connector relative shrink grow max-w-[120px] min-w-[40px] h-16 hidden md:flex items-center">
      <div className="w-full h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5 relative overflow-visible">
        <span className="adev-packet" style={{ animationDelay: `${delay}s` }} />
        <span className="adev-packet" style={{ animationDelay: `${delay + 1.5}s` }} />
      </div>
    </div>
  );
}

function ConnectorVertical({ delay }: { delay: number }) {
  return (
    <div className="relative w-16 h-10 md:hidden flex justify-center">
      <div className="h-full w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5 relative">
        <span className="adev-packet-v" style={{ animationDelay: `${delay}s` }} />
      </div>
    </div>
  );
}

export default function DevPipeline({
  nodes,
  caption,
}: {
  nodes: NodeInfo[];
  caption: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      className={`relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm px-6 py-10 sm:px-10 overflow-hidden ${
        inView ? "adev-pipeline-live" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.8s ease" }}
    >
      {/* Glow ambiental */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(59,130,246,0.06), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 md:gap-0">
        {nodes.map((node, i) => (
          <div key={node.name} className="contents">
            {i > 0 && (
              <>
                <Connector delay={i * 0.8} />
                <ConnectorVertical delay={i * 0.8} />
              </>
            )}
            <PipelineNode node={node} styleIdx={i} delay={i * 180} />
          </div>
        ))}
      </div>

      <p className="relative mt-10 text-center text-[11px] tracking-wide text-slate-600 font-mono">
        ⚡ {caption}
      </p>
    </div>
  );
}
