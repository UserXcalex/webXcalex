"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Segment = { text: string; className?: string };
type Line = { segments: Segment[]; pauseAfter?: number };

const C = {
  prompt: "text-emerald-400",
  cmd: "text-slate-100",
  key: "text-sky-400",
  str: "text-amber-300",
  bool: "text-violet-400",
  punct: "text-slate-500",
  comment: "text-slate-600 italic",
};

function buildLines(t: {
  role: string;
  superpower: string;
  experience: string;
  location: string;
  status: string;
}): Line[] {
  const kv = (key: string, value: string, last = false): Line => ({
    segments: [
      { text: "  ", className: C.punct },
      { text: `"${key}"`, className: C.key },
      { text: ": ", className: C.punct },
      { text: `"${value}"`, className: C.str },
      ...(last ? [] : [{ text: ",", className: C.punct }]),
    ],
  });

  const [statusKey, statusVal] = t.status.split(": ");

  return [
    {
      segments: [
        { text: "$ ", className: C.prompt },
        { text: "whoami", className: C.cmd },
      ],
      pauseAfter: 400,
    },
    {
      segments: [{ text: "andres-caceres", className: "text-slate-300" }],
      pauseAfter: 500,
    },
    {
      segments: [
        { text: "$ ", className: C.prompt },
        { text: "cat profile.json", className: C.cmd },
      ],
      pauseAfter: 400,
    },
    { segments: [{ text: "{", className: C.punct }] },
    kv("rol", t.role),
    kv("superpoder", t.superpower),
    kv("experiencia", t.experience),
    kv("ubicacion", t.location),
    {
      segments: [
        { text: "  ", className: C.punct },
        { text: `"${statusKey}"`, className: C.key },
        { text: ": ", className: C.punct },
        { text: statusVal, className: C.bool },
      ],
    },
    { segments: [{ text: "}", className: C.punct }], pauseAfter: 600 },
    {
      segments: [
        { text: "$ ", className: C.prompt },
        { text: "./hire-me.sh", className: C.cmd },
        { text: "  # ↓ scroll", className: C.comment },
      ],
    },
  ];
}

/** Renders the first `chars` characters of a line's segments. */
function PartialLine({ line, chars }: { line: Line; chars: number }) {
  let remaining = chars;
  return (
    <span>
      {line.segments.map((seg, i) => {
        if (remaining <= 0) return null;
        const text = seg.text.slice(0, remaining);
        remaining -= seg.text.length;
        return (
          <span key={i} className={seg.className}>
            {text}
          </span>
        );
      })}
    </span>
  );
}

export default function DevTerminal({
  title,
  profile,
}: {
  title: string;
  profile: Parameters<typeof buildLines>[0];
}) {
  const lines = useMemo(() => buildLines(profile), [profile]);
  const [pos, setPos] = useState({ line: 0, char: 0 });
  const [started, setStarted] = useState(false);
  const done = pos.line >= lines.length;
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || done) return;
    const current = lines[pos.line];
    const lineLen = current.segments.reduce((n, s) => n + s.text.length, 0);

    if (pos.char < lineLen) {
      timer.current = setTimeout(
        () => setPos((p) => ({ ...p, char: p.char + 1 })),
        18 + Math.random() * 30
      );
    } else {
      timer.current = setTimeout(
        () => setPos((p) => ({ line: p.line + 1, char: 0 })),
        current.pauseAfter ?? 80
      );
    }
    return () => clearTimeout(timer.current);
  }, [started, done, pos, lines]);

  return (
    <div className="adev-terminal relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a14]/90 backdrop-blur-xl shadow-[0_24px_80px_rgba(59,130,246,0.15)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-slate-500 font-medium tracking-wide truncate">
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-5 font-mono text-[12.5px] sm:text-[13.5px] leading-[1.85] min-h-[330px]">
        {lines.slice(0, pos.line).map((line, i) => (
          <div key={i}>
            {line.segments.map((seg, j) => (
              <span key={j} className={seg.className}>
                {seg.text}
              </span>
            ))}
          </div>
        ))}
        {!done && started && (
          <div>
            <PartialLine line={lines[pos.line]} chars={pos.char} />
            <span className="adev-cursor" />
          </div>
        )}
        {done && (
          <div>
            <span className={C.prompt}>$ </span>
            <span className="adev-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
