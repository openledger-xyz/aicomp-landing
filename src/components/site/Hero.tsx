import { motion } from "framer-motion";
import { useScramble } from "@/hooks/use-kinetic";

import Cubes from "@/components/ui/Cubes";
import LiquidChrome from "@/components/ui/LiquidChrome";

export function Hero() {
  const refLine1 = useScramble<HTMLSpanElement>("Real-time");
  const refLine2 = useScramble<HTMLSpanElement>("Infra for");
  const refLine3 = useScramble<HTMLSpanElement>("AI Companions.");
  return (
    <section className="relative overflow-hidden" style={{ borderBottom: "1px solid var(--ink)" }}>
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-24 pt-10 lg:pt-4 pb-16 lg:pb-24 items-center">
        {/* LEFT */}
        <div className="reveal min-w-0">
          <span className="section-label" style={{ marginBottom: 8, display: "inline-flex" }}>
            POWERED BY $DOPE
          </span>

          <h1
            className="mt-2 lg:mt-0"
            style={{
              color: "var(--ink)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
            }}
          >
            <span
              ref={refLine1}
              style={{ display: "block", lineHeight: 1.1 }}
            >
              Real-time
            </span>
            <span
              ref={refLine2}
              style={{ display: "block", lineHeight: 1.1 }}
            >
              Infra for
            </span>
            {/* Inline so yellow only wraps the text, not the full row */}
            <span style={{ display: "block", lineHeight: 1.1, marginTop: 6 }}>
              <span
                ref={refLine3}
                style={{ display: "inline", background: "var(--primary)", padding: "2px 10px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}
              >
                AI Companions.
              </span>
            </span>
          </h1>

          <p className="max-w-xl" style={{ color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65, marginTop: 28 }}>
            Dopamint powers emotionally intelligent companion products built for live voice,
            persistent identity, multimodal generation, long-session engagement, and physical
            AI embodiment.
          </p>
          <p className="max-w-xl" style={{ color: "var(--ink)", fontSize: 16, lineHeight: 1.65, fontWeight: 700, borderLeft: "3px solid var(--primary)", paddingLeft: 12, marginTop: 20 }}>
            From personal twins to humanoid agents — this is the layer that makes them feel alive.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#testnet" className="btn btn-primary inline-flex items-center gap-2">Get API <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span></a>
            <a href="#product" className="btn btn-outline">Join Testnet</a>
          </div>
        </div>

        {/* RIGHT — Hero banner image */}
        <div
          className="reveal relative w-full flex items-center justify-center pt-16 pb-12 sm:px-4 md:pt-32 md:pb-20 lg:px-0 lg:pt-0 lg:pb-0 min-h-[400px] lg:min-h-[600px]"
        >
          <div className="relative w-[110%] max-w-[110%] lg:-translate-x-[8%] lg:scale-105 translate-y-8 lg:translate-y-16">
            {/* CUBES BACKGROUND */}
            <div className="hero-cubes absolute top-[0%] left-[12%] md:left-[18%] w-[64%] aspect-13/3 pointer-events-auto z-0 overflow-visible hidden">
               <Cubes 
                 gridCols={13}
                 gridRows={3}
                 cellGap={15}
                 maxAngle={60}
                 radius={4}
                 borderStyle="var(--hero-cube-stroke)"
                 faceColor="var(--primary)"
                 rippleColor="#fff"
                 rippleSpeed={1.5}
                 autoAnimate={true}
                 rippleOnClick={true}
               />
            </div>

            {/* LIQUID CHROME CIRCLE */}
            <div 
              className="absolute z-0 rounded-full overflow-hidden pointer-events-auto"
              style={{
                width: '75%',
                aspectRatio: '1 / 1',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -65%)', // center horizontally, moved up slightly
              }}
            >
              <LiquidChrome
                baseColor={[1, 0.902, 0]}
                speed={1.07}
                amplitude={0.32}
                interactive={true}
              />
            </div>
            
            <video
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 w-full h-auto pointer-events-none"
              style={{
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                transform: "scale(1.25) translateY(2%)",
              }}
            >
              {/* Safari / iOS / macOS (HEVC with Alpha) */}
              <source src="/Banner-hevc.mp4" type='video/mp4; codecs="hvc1"' />
              {/* Chrome / Edge / Firefox / Android (VP9 with Alpha) */}
              <source src="/Banner-webm.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee flex overflow-hidden border-y border-y-ink bg-ink text-primary py-3.5">
        <motion.div
          className="flex w-max"
          style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 13 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 42 }}
        >
          {Array.from({ length: 8 }).map((_, k) => (
            <div key={k} className="flex shrink-0 gap-12 pr-12">
              {["Low Latency", "On-Chain Memory", "Voice Native", "Production Ready", "Always On", "Persistent Memory", "Stable Identity", "Unified Output"].map((t) => (
                <span key={t} className="flex shrink-0 items-center gap-3 whitespace-nowrap">◆ {t}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
