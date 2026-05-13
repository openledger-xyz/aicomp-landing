import { useState } from "react";
import { ScrambledText } from "@/components/kinetic/ScrambledText";
import { DotGrid } from "@/components/kinetic/DotGrid";
import { JoinWaitlistDialog } from "@/components/site/JoinWaitlistDialog";

export function FinalCTA() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section
      className="relative py-16 lg:py-24"
      style={{
        background: "var(--primary)",
        borderTop: "1px solid var(--ink)",
        borderBottom: "1px solid var(--ink)",
      }}
    >
      <div className="absolute inset-0 z-0" style={{ overflow: "hidden" }}>
        <DotGrid color="13, 13, 13" />
      </div>
      <div className="container-x relative z-10">
        <div className="reveal flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 max-w-5xl mx-auto">
          {/* Left — text + CTA */}
          <div className="flex flex-col items-start text-left">
            {/* Two tight lines grouped together */}
            <div
              style={{
                marginBottom: "28px",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "rgba(13,13,13,0.85)",
                lineHeight: 1.25,
              }}
            >
              <ScrambledText
                as="div"
                text="Still duct-taping memory into your AI companion build?"
                style={{ margin: 0 }}
              />
              <strong
                style={{ fontWeight: 900, color: "var(--ink)", display: "block", marginTop: "4px" }}
              >
                <ScrambledText as="span" text="There's an API for that." />
              </strong>
            </div>

            {/* Big punchline heading */}
            <ScrambledText
              as="h2"
              className="h-section"
              text="get dopamint"
              style={{ margin: 0, marginBottom: "36px" }}
            />

            {/* CTA */}
            <button
              type="button"
              className="btn btn-primary inline-flex items-center gap-2"
              onClick={() => setWaitlistOpen(true)}
            >
              Join Waitlist
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                arrow_forward
              </span>
            </button>
          </div>

          {/* Right — Mr. Dope hamster image */}
          <div className="shrink-0 relative">
            <img
              src="/tape-Winking-Face.png"
              alt="Mr. Dope mascot"
              className="w-72 sm:w-80 md:w-88 lg:w-96 h-auto object-contain pointer-events-none drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      <JoinWaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </section>
  );
}
