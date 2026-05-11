import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export type CoverflowCardItem = {
  id: number;
  img: string;
  text?: ReactNode;
};

const DEFAULT_CARDS: CoverflowCardItem[] = [
  { id: 0, img: `${basePath}/dopekin_avatars/avatar1.jpg`, text: "Call In—I'll keep it smooth, witty, and dangerous." },
  { id: 1, img: `${basePath}/dopekin_avatars/avatar2.jpg`, text: "He doesn't need thanks—he needs you to keep moving." },
  { id: 2, img: `${basePath}/dopekin_avatars/avatar3.jpg`, text: "Successful cybersecurity consultant. Hacker." },
  { id: 3, img: `${basePath}/dopekin_avatars/avatar4.jpg`, text: "Your personal fitness and mentality coach." },
  { id: 4, img: `${basePath}/dopekin_avatars/avatar5.jpg`, text: "Late night philosopher and deep thinker." },
];

export default function CoverflowGallery({ cards = DEFAULT_CARDS, disableHover = false }: { cards?: CoverflowCardItem[], disableHover?: boolean }) {
  const [activeIdx, setActiveIdx] = useState(2);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((p) => (p + 1) % cards.length), 3000);
    return () => clearInterval(t);
  }, [cards.length]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
        {cards.map((card, idx) => {
          let offset = idx - activeIdx;
          if (offset > 2) offset -= cards.length;
          if (offset < -2) offset += cards.length;
          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          
          // Non-linear offsets to ensure mathematically consistent visual overlap
          // regardless of scale, eliminating uneven white space.
          const xPercent = isActive ? 0 : Math.sign(offset) * (absOffset === 1 ? 85 : 155);

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveIdx(idx)}
              initial={false}
              animate={{
                x: `calc(-50% + ${xPercent}%)`,
                y: "-50%",
                scale: isActive ? 1.05 : 1 - absOffset * 0.15,
                zIndex: isActive ? 10 : 10 - absOffset,
                opacity: absOffset > 2 ? 0 : 1,
              }}
              whileHover={disableHover ? undefined : {
                x: `calc(-50% + ${xPercent}%)`,
                y: "-50%",
                scale: isActive ? 1.05 : 1 - absOffset * 0.15 + 0.03,
                zIndex: 20,
              }}
              transition={{ type: "tween", duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "min(72%, 340px)",
                background: "var(--background)",
                border: "2px solid var(--ink)",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "3/5" }}>
                <img src={card.img} alt={card.text} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />
                {!isActive && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", transition: "background 0.3s" }} />}
                <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, padding: "0 16px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#fff", textAlign: "left", lineHeight: 1.4, textShadow: "0px 2px 4px rgba(0,0,0,0.8)", opacity: isActive ? 1 : 0, transition: "opacity 0.3s" }}>
                  {card.text}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
