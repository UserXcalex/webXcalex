"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "matrix" | "logo" | "hud" | "online" | "exit" | "returning" | "done";

// ─── Constants ────────────────────────────────────────────────────────────────
const CHARS = "XCALEX01アイウエオカキクケコ{}[]<>/\\=*&#@ABCDEF0123456789";

// Fixed hex values — avoids random values regenerating on every render
const L_HEX = ["3F9A2B1C","7E4D8F05","A1C3E792","2B5F9D4A","8C1E7F3B","4A9D2C6E",
               "F3B1A8D5","1C7E4F9A","6D2B8C5F","9A3E1D7C","5F8B2A4E","C3D9F1B6"];
const R_HEX = ["B4F2A839","E7C1D356","2F9A4B8C","7D3E6F1A","C8B5A291","4E1F7D3B",
               "9C6A2E8F","1B4D7F5C","F8E3A1C4","3A7B9D2E","6C1F4E8B","A2D5C7F3"];

// ─── Inline CSS ───────────────────────────────────────────────────────────────
const CSS = `
  /* Scanlines */
  .xcl-sl::after{content:'';position:absolute;inset:0;
    background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px);
    pointer-events:none;z-index:2}

  /* Circuit traces */
  @keyframes xcl-trace{to{stroke-dashoffset:0}}
  .xcl-t{stroke-dasharray:900;stroke-dashoffset:900;animation:xcl-trace 1.4s ease-out forwards}

  /* Logo scan-reveal from top */
  @keyframes xcl-logoin{
    0%  {clip-path:inset(0 0 100% 0);filter:brightness(2.5);opacity:.8}
    55% {clip-path:inset(0 0 0 0);   filter:brightness(1.6);opacity:1}
    100%{clip-path:inset(0 0 0 0);   filter:brightness(1);  opacity:1}
  }
  .xcl-li{animation:xcl-logoin .9s cubic-bezier(.22,1,.36,1) forwards}

  /* Glitch split channels */
  @keyframes xcl-gr{
    0%  {clip-path:inset(8% 0 88% 0); transform:translate(-5px, 1px)}
    25% {clip-path:inset(50% 0 40% 0);transform:translate( 5px,-1px)}
    50% {clip-path:inset(75% 0 10% 0);transform:translate(-3px, 2px)}
    100%{clip-path:inset(0 0 100% 0); transform:translate( 0,   0)}
  }
  @keyframes xcl-gb{
    0%  {clip-path:inset(60% 0 25% 0);transform:translate( 5px,-1px)}
    25% {clip-path:inset(15% 0 75% 0);transform:translate(-5px, 1px)}
    50% {clip-path:inset(40% 0 48% 0);transform:translate( 3px,-2px)}
    100%{clip-path:inset(0 0 100% 0); transform:translate( 0,   0)}
  }
  .xcl-gr{animation:xcl-gr .12s steps(1) infinite}
  .xcl-gb{animation:xcl-gb .12s steps(1) infinite}

  /* Ring pulses */
  @keyframes xcl-ring{0%{transform:scale(.5);opacity:.65}100%{transform:scale(2.6);opacity:0}}
  .xcl-r1{animation:xcl-ring 2s ease-out infinite}
  .xcl-r2{animation:xcl-ring 2s ease-out 1s infinite}

  /* Hex grid fade-in */
  @keyframes xcl-hexfade{from{opacity:0}to{opacity:.13}}
  .xcl-hexgrid{animation:xcl-hexfade 1.4s ease-out .3s both}

  /* HUD corner brackets */
  @keyframes xcl-tl{from{transform:translate(-12px,-12px);opacity:0}to{transform:translate(0,0);opacity:1}}
  @keyframes xcl-tr{from{transform:translate( 12px,-12px);opacity:0}to{transform:translate(0,0);opacity:1}}
  @keyframes xcl-bl{from{transform:translate(-12px, 12px);opacity:0}to{transform:translate(0,0);opacity:1}}
  @keyframes xcl-br{from{transform:translate( 12px, 12px);opacity:0}to{transform:translate(0,0);opacity:1}}
  .xcl-tl{animation:xcl-tl .4s ease-out .05s both}
  .xcl-tr{animation:xcl-tr .4s ease-out .15s both}
  .xcl-bl{animation:xcl-bl .4s ease-out .15s both}
  .xcl-br{animation:xcl-br .4s ease-out .05s both}

  /* Terminal row slide-in */
  @keyframes xcl-row{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}

  /* Progress bar + shimmer */
  @keyframes xcl-prog   {from{width:0%}to{width:100%}}
  @keyframes xcl-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

  /* SYSTEM ONLINE reveal */
  @keyframes xcl-online{
    0%  {opacity:0;letter-spacing:.55em}
    40% {opacity:1;letter-spacing:.38em}
    100%{opacity:1;letter-spacing:.38em}
  }
  .xcl-online{animation:xcl-online .55s ease-out forwards}

  /* Exit flash */
  @keyframes xcl-flash{0%{opacity:0}15%{opacity:1}100%{opacity:0}}
  .xcl-flash{animation:xcl-flash 1.1s ease-out forwards}

  /* Exit strips */
  .xcl-strip{transition:transform .9s cubic-bezier(.77,0,.175,1)}

  /* Cursor blink */
  @keyframes xcl-blink{0%,100%{opacity:1}50%{opacity:0}}
  .xcl-cursor{animation:xcl-blink .8s step-end infinite}

  /* Subtle vignette */
  .xcl-vignette{background:radial-gradient(ellipse 90% 90% at 50% 50%,transparent 55%,rgba(0,0,0,.55) 100%)}
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function SplashScreen() {
  const canvasRef                   = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase]           = useState<Phase>("matrix");
  const [glitch, setGlitch]         = useState(false);
  const [exitStarted, setExitStarted] = useState(false);

  /* Session gate + phase scheduler */
  useEffect(() => {
    let active = true;

    const dismiss = () => {
      if (!active) return;
      active = false;
      setPhase("done");
      document.body.style.overflow = "";
      document.body.classList.remove("xcl-page-in");
      try { sessionStorage.setItem("xcalex_intro", "1"); } catch (_) {}
    };

    let hasVisited = false;
    try { hasVisited = !!sessionStorage.getItem("xcalex_intro"); } catch (_) {}

    if (hasVisited) {
      setPhase("returning" as Phase);
      const t = setTimeout(dismiss, 2000);
      return () => { active = false; clearTimeout(t); };
    }

    document.body.style.overflow = "hidden";

    const timers = [
      setTimeout(() => { if (active) setPhase("logo");   }, 1200),
      setTimeout(() => { if (active) setPhase("hud");    }, 2700),
      setTimeout(() => { if (active) setPhase("online"); }, 3700),
      setTimeout(() => { if (active) setPhase("exit");   }, 4400),
      setTimeout(() => { if (active) document.body.classList.add("xcl-page-in"); }, 4500),
      setTimeout(dismiss, 5600),
    ];
    return () => {
      active = false;
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
      document.body.classList.remove("xcl-page-in");
    };
  }, []);

  /* Exit strips: mount at X=0, then slide out after 1 frame */
  useEffect(() => {
    if (phase !== "exit") return;
    const id = setTimeout(() => setExitStarted(true), 30);
    return () => clearTimeout(id);
  }, [phase]);

  /* Random glitch flashes while logo is visible */
  useEffect(() => {
    if (!["logo","hud","online"].includes(phase)) return;
    let id: ReturnType<typeof setTimeout>;
    const next = () => {
      id = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 60 + Math.random() * 95);
        next();
      }, 550 + Math.random() * 1300);
    };
    next();
    return () => clearTimeout(id);
  }, [phase]);

  /* Matrix rain canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    addEventListener("resize", resize);

    const FS = 13;
    let drops: number[] = Array(Math.floor(canvas.width / FS)).fill(1);
    let tick = 0;
    let raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (++tick % 2 !== 0) return;               // run every other frame
      ctx.fillStyle = "rgba(2,2,10,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FS}px 'Courier New',monospace`;

      const cols = Math.floor(canvas.width / FS);
      if (drops.length !== cols) drops = Array(cols).fill(1);

      drops.forEach((d, i) => {
        const hue = 210 + (d / (canvas.height / FS)) * 55;  // blue → violet
        ctx.fillStyle = Math.random() > 0.93
          ? "rgba(200,215,255,0.9)"                           // bright head char
          : `hsla(${hue},75%,62%,0.46)`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, d * FS);
        if (d * FS > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
      });
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);

  if (phase === "done") return null;

  /* ── Returning visitor: ultra-light bar animation ─────────────────────── */
  if (phase === "returning") {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <style>{`
          @keyframes xcl-mini-bar{from{width:0%;opacity:1}85%{width:100%;opacity:1}to{width:100%;opacity:0}}
          @keyframes xcl-mini-badge{0%{opacity:0;transform:translateY(-4px)}10%{opacity:1;transform:translateY(0)}80%{opacity:1}to{opacity:0;transform:translateY(-6px)}}
          .xcl-mini-bar{animation:xcl-mini-bar 1.8s cubic-bezier(.4,0,.2,1) .05s both}
          .xcl-mini-badge{animation:xcl-mini-badge 2s ease-out .05s both}
        `}</style>
        {/* Top loading bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
          <div className="xcl-mini-bar h-full rounded-full absolute left-0 top-0"
            style={{background:"linear-gradient(90deg,#3b82f6,#8b5cf6,#60a5fa)",backgroundSize:"200% 100%"}}/>
        </div>
        {/* Small corner badge */}
        <div className="xcl-mini-badge absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-[#02020a]/80 backdrop-blur-md">
          <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse"/>
          <span className="font-mono text-[9px] text-blue-400/70 tracking-[0.3em] uppercase">XCALEX</span>
        </div>
      </div>
    );
  }

  const isExit     = phase === "exit";
  const showLogo   = ["logo","hud","online","exit"].includes(phase);
  const showHUD    = ["hud","online","exit"].includes(phase);
  const showOnline = ["online","exit"].includes(phase);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#02020a]">
      <style>{CSS}</style>

      {/* ── Matrix rain ─────────────────────────────────────────────────────── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
        style={{ opacity: isExit ? 0 : 0.68, transition: "opacity 0.5s" }} />

      {/* ── Vignette ────────────────────────────────────────────────────────── */}
      <div className="xcl-vignette absolute inset-0 pointer-events-none" />

      {/* ── Scanlines ───────────────────────────────────────────────────────── */}
      <div className="xcl-sl absolute inset-0 pointer-events-none" />

      {/* ── Hexagonal grid texture ──────────────────────────────────────────── */}
      {showLogo && (
        <div className="xcl-hexgrid absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='48'%3E%3Cpolygon points='28,2 54,16 54,32 28,46 2,32 2,16' fill='none' stroke='%233b82f6' stroke-width='0.45' opacity='0.45'/%3E%3C/svg%3E")`,
            backgroundSize: "56px 48px",
          }}
        />
      )}

      {/* ── Circuit SVG traces ──────────────────────────────────────────────── */}
      {showLogo && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.38 }}
          viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {/* Left traces */}
          <path className="xcl-t" fill="none" stroke="#3b82f6" strokeWidth="1"
            d="M0,175 L220,175 L220,135 L440,135 L440,160 L620,160" style={{animationDelay:"0ms"}}/>
          <path className="xcl-t" fill="none" stroke="#8b5cf6" strokeWidth="0.8"
            d="M0,360 L160,360 L160,308 L360,308 L360,328 L512,328" style={{animationDelay:"180ms"}}/>
          <path className="xcl-t" fill="none" stroke="#60a5fa" strokeWidth="0.7"
            d="M0,540 L140,540 L140,490 L310,490 L310,510 L460,510" style={{animationDelay:"280ms"}}/>
          {/* Right traces */}
          <path className="xcl-t" fill="none" stroke="#3b82f6" strokeWidth="1"
            d="M1440,215 L1220,215 L1220,165 L1020,165 L1020,192 L822,192" style={{animationDelay:"90ms"}}/>
          <path className="xcl-t" fill="none" stroke="#8b5cf6" strokeWidth="0.8"
            d="M1440,395 L1268,395 L1268,350 L1068,350 L1068,372 L888,372" style={{animationDelay:"270ms"}}/>
          <path className="xcl-t" fill="none" stroke="#a78bfa" strokeWidth="0.7"
            d="M1440,555 L1280,555 L1280,505 L1090,505 L1090,525 L920,525" style={{animationDelay:"360ms"}}/>
          {/* Bottom traces */}
          <path className="xcl-t" fill="none" stroke="#60a5fa" strokeWidth="0.7"
            d="M0,720 L190,720 L190,668 L390,668 L390,690 L572,690" style={{animationDelay:"220ms"}}/>
          <path className="xcl-t" fill="none" stroke="#a78bfa" strokeWidth="0.7"
            d="M1440,700 L1250,700 L1250,652 L1052,652 L1052,674 L872,674" style={{animationDelay:"320ms"}}/>
          {/* Node dots at trace endpoints */}
          {([[620,160],[512,328],[460,510],[822,192],[888,372],[920,525],[572,690],[872,674]] as [number,number][])
            .map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="2.5" fill={i%2===0 ? "#3b82f6" : "#8b5cf6"} opacity="0.85"/>
            ))}
        </svg>
      )}

      {/* ── Edge accent lines ───────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none"/>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none"/>

      {/* ── Corner labels ───────────────────────────────────────────────────── */}
      <div className="absolute top-3 left-4 font-mono text-[8px] text-blue-500/25 pointer-events-none select-none">XCL-SYS // 4.0.1</div>
      <div className="absolute top-3 right-4 font-mono text-[8px] text-blue-500/25 text-right pointer-events-none select-none">XCALEX.CO</div>
      <div className="absolute bottom-3 left-4 font-mono text-[8px] text-slate-800 pointer-events-none select-none">© 2025 XCALEX</div>
      <div className="absolute bottom-3 right-4 font-mono text-[8px] text-slate-800 text-right pointer-events-none select-none">ALL SYSTEMS GO</div>

      {/* ── Side hex data streams ───────────────────────────────────────────── */}
      {showHUD && (
        <div className="absolute left-3 lg:left-7 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] pointer-events-none hidden sm:flex"
          style={{animation:"xcl-row 0.4s ease-out 0.2s both"}}>
          {L_HEX.map((h,i) => (
            <div key={i} className="font-mono text-[8px] text-blue-500/40"
              style={{opacity: 0.2 + (i / L_HEX.length) * 0.75}}>{h}</div>
          ))}
        </div>
      )}
      {showHUD && (
        <div className="absolute right-3 lg:right-7 top-1/2 -translate-y-1/2 flex-col gap-[3px] items-end pointer-events-none hidden sm:flex"
          style={{animation:"xcl-row 0.4s ease-out 0.3s both"}}>
          {R_HEX.map((h,i) => (
            <div key={i} className="font-mono text-[8px] text-violet-500/40"
              style={{opacity: 0.2 + (i / R_HEX.length) * 0.75}}>{h}</div>
          ))}
        </div>
      )}

      {/* ── Center content ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

        {/* Boot cursor — matrix phase only */}
        {phase === "matrix" && (
          <div className="flex items-center gap-3 font-mono text-[10px] text-blue-400/60 tracking-[0.32em] uppercase"
            style={{animation:"xcl-row 0.5s ease-out 0.5s both"}}>
            <span className="xcl-cursor text-blue-400">▌</span>
            XCALEX SYSTEMS // INITIALIZING
          </div>
        )}

        {/* Logo */}
        {showLogo && (
          <div className="relative mb-8 flex items-center justify-center" style={{width:220, height:120}}>
            {/* Expanding rings */}
            <div className="xcl-r1 absolute rounded-full border border-blue-500/25 pointer-events-none"
              style={{top:-30,left:-30,right:-30,bottom:-30}}/>
            <div className="xcl-r2 absolute rounded-full border border-violet-500/20 pointer-events-none"
              style={{top:-30,left:-30,right:-30,bottom:-30}}/>

            {/* Glitch: red channel */}
            {glitch && (
              <img src="/logo.png" alt="" aria-hidden
                className="xcl-gr absolute inset-0 h-full w-full object-contain"
                style={{filter:"hue-rotate(-25deg) saturate(3) brightness(1.5)", mixBlendMode:"screen"}}/>
            )}
            {/* Glitch: blue channel */}
            {glitch && (
              <img src="/logo.png" alt="" aria-hidden
                className="xcl-gb absolute inset-0 h-full w-full object-contain"
                style={{filter:"hue-rotate(170deg) saturate(3) brightness(1.5)", mixBlendMode:"screen"}}/>
            )}

            {/* Main logo */}
            <img src="/logo.png" alt="Xcalex"
              className="xcl-li relative h-full w-auto mx-auto object-contain"
              style={{
                filter: "drop-shadow(0 0 32px rgba(59,130,246,0.8)) drop-shadow(0 0 64px rgba(139,92,246,0.45))",
              }}
            />
          </div>
        )}

        {/* HUD terminal panel */}
        {showHUD && (
          <div className="relative" style={{width:"min(430px,90vw)"}}>
            {/* Bracket corners */}
            <div className="xcl-tl absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-blue-400/55"/>
            <div className="xcl-tr absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-blue-400/55"/>
            <div className="xcl-bl absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-blue-400/55"/>
            <div className="xcl-br absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-blue-400/55"/>

            <div className="bg-black/72 backdrop-blur-xl rounded-xl px-5 py-4 border border-blue-500/15 font-mono text-[10px] space-y-[5px]"
              style={{boxShadow:"0 0 40px rgba(59,130,246,0.07), inset 0 1px 0 rgba(255,255,255,0.03)"}}>

              {([
                {lbl:"SYSTEM", val:"XCALEX",        col:"#60a5fa", d:0  },
                {lbl:"ENGINE", val:"AI · WEB · MOBILE · INFRA",  col:"#a78bfa", d:90 },
                {lbl:"SLA   ", val:"99.9% UPTIME GUARANTEED",    col:"#34d399", d:180},
                {lbl:"STACK ", val:"40+ ACTIVE SYSTEMS",         col:"#fbbf24", d:270},
                {lbl:"STATUS", val:"ALL MODULES ONLINE",         col:"#4ade80", d:360},
              ] as const).map((r,i) => (
                <div key={i} className="flex items-center gap-3"
                  style={{animation:`xcl-row 0.3s ease-out ${r.d}ms both`}}>
                  <span className="text-slate-600 w-12 shrink-0">{r.lbl}</span>
                  <span className="text-slate-700 text-[8px]">──</span>
                  <span style={{color:r.col}}>{r.val}</span>
                </div>
              ))}

              {/* Progress bar */}
              <div className="pt-2.5 mt-0.5 border-t border-white/[0.03]">
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-600 text-[9px] tracking-widest">BOOT SEQUENCE</span>
                  <span className="text-blue-400 text-[9px]">100%</span>
                </div>
                <div className="h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                  <div className="h-full rounded-full"
                    style={{
                      background:"linear-gradient(90deg,#3b82f6,#8b5cf6,#60a5fa)",
                      backgroundSize:"200% 100%",
                      animation:"xcl-prog 1s cubic-bezier(.4,0,.2,1) .15s both, xcl-shimmer 2s linear infinite",
                    }}/>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM ONLINE */}
        {showOnline && (
          <div className="xcl-online mt-5 flex items-center gap-2.5 font-mono font-black text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
            SYSTEM ONLINE
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
          </div>
        )}
      </div>

      {/* ── Exit: strips slide out ──────────────────────────────────────────── */}
      {isExit && Array.from({length: 14}, (_, i) => (
        <div key={i} className="xcl-strip absolute left-0 w-full"
          style={{
            top: `${(i / 14) * 100}%`,
            height: `${100 / 14}%`,
            background: i % 2 === 0
              ? "linear-gradient(to right,#02020a 82%,rgba(59,130,246,0.28) 94%,rgba(99,102,241,0.1) 100%)"
              : "linear-gradient(to right,#03030e 82%,rgba(139,92,246,0.28) 94%,rgba(59,130,246,0.1) 100%)",
            transform: exitStarted ? "translateX(110%)" : "translateX(0)",
            transitionDelay: `${i * 45}ms`,
            zIndex: 50,
          }}
        />
      ))}

      {/* Exit flash */}
      {isExit && (
        <div className="xcl-flash absolute inset-0 pointer-events-none"
          style={{background:"linear-gradient(135deg,rgba(59,130,246,0.12),rgba(139,92,246,0.12))", zIndex:45}}/>
      )}
    </div>
  );
}
