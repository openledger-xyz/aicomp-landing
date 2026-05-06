import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambledText } from "@/components/kinetic/ScrambledText";
import { UseCaseStack } from "./UseCaseStack";

gsap.registerPlugin(ScrollTrigger);

const USE_CASES = [
  { title: "Companion Application", icon: "favorite", desc: "Dopamint gives companions the one thing they've always lacked, continuity. Same personality, same memory, same presence. Every session feels like it never ended." },
  { title: "Creator Economy", icon: "stars", desc: "Dopamint turns audience scale into personalised relationships that sustains every conversation, and keeps monetisation running continuously." },
  { title: "EdTech", icon: "school", desc: "Dopamint gives every learner a persistent AI tutor, one that retains progress, and adapts to gaps." },
  { title: "Service Front", icon: "support_agent", desc: "Dopamint carries full customer history across every session, no repeated context, no cold handoffs, no lost continuity." },
];

export function WhatIs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".wid-header", { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="what" style={{ background: "var(--background)", padding: "96px 0", borderBottom: "1px solid var(--ink)" }}>
      <div className="container-x">
        <div className="wid-header grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start" style={{ opacity: 0, marginBottom: 56 }}>
          <div>
            <span className="section-label mb-6">
              <span className="material-symbols-outlined">help_center</span>
              WHAT IS DOPAMINT
            </span>
            <h2 className="h-section mt-6" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <ScrambledText as="span" text="One API." />
              <ScrambledText as="span" text="Infinite identities." />
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
              {["API", "No-code", "Chat Now"].map((b) => (
                <a href="#testnet" key={b} style={{
                  padding: "5px 14px", background: "var(--primary)", border: "1px solid var(--ink)",
                  fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: "var(--ink)",
                  textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none",
                  transition: "transform 0.15s ease", display: "inline-block"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {b}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center lg:mt-[72px]" style={{ maxWidth: 640 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--ink)", lineHeight: 1.6, fontWeight: 500, marginBottom: 20 }}>
              Smart AI is everywhere. AI that stays is not.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>
              Every team building a companion product is engineering memory, identity, and session continuity from scratch before writing a single line of product logic.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "var(--ink)", lineHeight: 1.4, fontWeight: 800 }}>
              Dopamint is that layer, already built. Memory, voice, persistent identity wired into your product at runtime. One integration.
            </p>
          </div>
        </div>

        {/* Use Case Cards Stack */}
        <div style={{ marginBottom: 64 }}>
          <UseCaseStack />
        </div>


      </div>

    </section>
  );
}
