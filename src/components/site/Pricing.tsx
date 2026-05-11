import { useRef } from "react";
import { ScrambledText } from "@/components/kinetic/ScrambledText";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "BUILD",
    price: "$0",
    period: "/mo",
    isCustom: false,
    items: ["Usage-based access.", "No seat fees.", "Public testnet."],
    cta: "Join Waitlist",
    featured: false,
    badge: null,
  },
  {
    name: "SCALE",
    price: "$249",
    period: "/mo",
    isCustom: false,
    items: ["Volume pricing.", "SLA guarantees.", "Priority routing."],
    cta: "Talk to Sales",
    featured: true,
    badge: "MOST POPULAR",
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    period: "",
    isCustom: true,
    items: ["Dedicated infrastructure.", "Custom pricing.", "Compliance review."],
    cta: "Contact Us",
    featured: false,
    badge: null,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="pricing" ref={sectionRef} className="py-24 lg:py-32" style={{ background: "var(--ink)", borderBottom: "1px solid #333" }}>
      <div className="container-x">
        <div className="pricing-header max-w-3xl">
          <span className="section-label mb-6" style={{ background: "var(--primary)", color: "var(--ink)", borderColor: "var(--primary)" }}>
            <span className="material-symbols-outlined">payments</span>
            PRICING
          </span>
          <h2 className="h-section mt-6" style={{ color: "#fff" }}>Start simple. Scale when it works.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 mt-16 items-end">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              className="pricing-card flex flex-col"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: t.featured ? -16 : 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                y: t.featured ? -24 : -8,
                boxShadow: t.featured ? "0 30px 60px rgba(255, 230, 0, 0.15)" : "0 30px 60px rgba(0,0,0,0.5)",
                borderColor: t.featured ? "transparent" : "#444"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.1 }}
              style={{
                background: t.featured ? "var(--primary)" : "#111",
                color: t.featured ? "var(--ink)" : "#fff",
                border: t.featured ? "none" : "1px solid #2a2a2a",
                borderRight: t.featured ? "none" : undefined,
                padding: "40px 36px",
                position: "relative",
                zIndex: t.featured ? 10 : 1,
              }}
            >
              {/* MOST POPULAR badge */}
              {t.badge && (
                <div style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  background: "var(--ink)",
                  color: "var(--primary)",
                  padding: "4px 12px",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  fontFamily: "var(--font-body)",
                }}>
                  {t.badge}
                </div>
              )}

              {/* Tier Name */}
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: t.featured ? "var(--ink)" : "#fff",
                marginBottom: 10,
              }}>
                {t.name}
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 32 }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: t.isCustom ? "clamp(3rem, 6vw, 4.5rem)" : "clamp(3.5rem, 7vw, 5rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: t.featured ? "var(--ink)" : "#fff",
                  letterSpacing: "-0.02em",
                }}>
                  {t.price}
                </span>
                {t.period && (
                  <span style={{
                    fontSize: 13,
                    color: t.featured ? "rgba(13,13,13,0.55)" : "rgba(255,255,255,0.45)",
                    marginBottom: 6,
                    fontFamily: "var(--font-body)",
                  }}>
                    {t.period}
                  </span>
                )}
              </div>

              {/* CTA Button */}
              <motion.a
                href="#testnet"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 24px",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  border: t.featured ? "none" : "1px solid rgba(255,255,255,0.3)",
                  color: t.featured ? "#fff" : "#fff",
                  marginBottom: 28,
                }}
                variants={{
                  rest: { background: t.featured ? "var(--ink)" : "transparent", scale: 1 },
                  hover: { background: t.featured ? "#222" : "rgba(255,255,255,0.1)", scale: 1.02 },
                  tap: { scale: 0.98 }
                }}
                transition={{ duration: 0.2 }}
              >
                {t.cta} 
                <motion.span 
                  className="material-symbols-outlined" 
                  style={{ fontSize: 16, marginLeft: 6 }}
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 4 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  arrow_forward
                </motion.span>
              </motion.a>

              {/* Divider */}
              <div style={{ height: 1, background: t.featured ? "rgba(13,13,13,0.18)" : "rgba(255,255,255,0.1)", marginBottom: 22 }} />

              {/* Features */}
              <ul className="flex-1" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {t.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }}>
                    <span style={{
                      display: "inline-block",
                      width: 7,
                      height: 7,
                      background: t.featured ? "var(--ink)" : "var(--primary)",
                      flexShrink: 0,
                      marginTop: 5,
                    }} />
                    <span style={{ color: t.featured ? "rgba(13,13,13,0.75)" : "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
