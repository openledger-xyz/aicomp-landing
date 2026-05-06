import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { useRef } from "react";

import mentalImg from "@/assets/usecases/companion.jpeg";
import creatorImg from "@/assets/usecases/creator.png";
import edtechImg from "@/assets/usecases/edtech.png";
import serviceImg from "@/assets/usecases/service.png";

const useCases = [
  {
    title: "Companion Application",
    desc: "Dopamint gives companions the one thing they've always lacked, continuity. Same personality, same memory, same presence. Every session feels like it never ended.",
    icon: "favorite",
    src: mentalImg,
  },
  {
    title: "Creator Economy",
    desc: "Dopamint turns audience scale into personalised relationships that sustains every conversation, and keeps monetisation running continuously.",
    icon: "stars",
    src: creatorImg,
  },
  {
    title: "EdTech",
    desc: "Dopamint gives every learner a persistent AI tutor, one that retains progress, and adapts to gaps.",
    icon: "school",
    src: edtechImg,
  },
  {
    title: "Service Front",
    desc: "Dopamint carries full customer history across every session, no repeated context, no cold handoffs, no lost continuity.",
    icon: "support_agent",
    src: serviceImg,
  },
  {
    title: "and so many more...",
    isOutro: true,
  },
];

const StickyCard = ({
  i,
  title,
  desc,
  icon,
  src,
  isOutro,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  desc?: string;
  icon?: string;
  src?: string;
  isOutro?: boolean;
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center w-full h-[100dvh]"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${i} * clamp(15px, 3vw, 30px))`,
          backgroundColor: "var(--primary)",
          border: "2px solid var(--ink)",
          boxShadow: "8px 8px 0px 0px var(--ink)",
        }}
        className="relative flex flex-col md:flex-row w-full max-w-[90%] md:max-w-5xl h-[460px] md:h-[480px] origin-top overflow-hidden"
      >
        {isOutro ? (
          <div className="relative w-full h-full flex items-center justify-center p-8 md:p-14 bg-primary text-ink overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute bottom-0 left-4 md:left-8 w-40 md:w-56 h-auto object-contain z-0 pointer-events-none"
            >
              <source src="/juggling-loop.mp4" type="video/mp4" />
            </video>
            <h3 className="relative z-10" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em", lineHeight: 1, textAlign: "center" }}>
              {title}
            </h3>
          </div>
        ) : (
          <>
            {/* LEFT: Image */}
            <div className="w-full md:w-[45%] h-[45%] md:h-full border-b-2 md:border-b-0 md:border-r-2 border-ink bg-white overflow-hidden">
              <img src={src} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* RIGHT: Content */}
            <div className="w-full h-[55%] md:h-full md:w-[55%] flex flex-col justify-center p-6 md:p-14 bg-primary text-ink">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="flex items-center justify-center w-12 h-12 shrink-0 border border-ink bg-ink text-primary">
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{icon}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {title}
                </h3>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "var(--ink-soft)", lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
                {desc}
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export const UseCaseStack = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <div
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pt-[5vh] pb-[5vh]"
      >
        {useCases.map((useCase, i) => {
          const targetScale = Math.max(
            0.85,
            1 - (useCases.length - i - 1) * 0.05
          );
          return (
            <StickyCard
              key={`uc_${i}`}
              i={i}
              {...useCase}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </ReactLenis>
  );
};
