import { useEffect, useState } from "react";
import logo from "@/assets/dopamint-logo.png";
import { SITE_SECTION_LINKS } from "@/components/site/site-section-links";
import { scrollToSectionHash } from "@/lib/scroll-to-section";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    const ids = SITE_SECTION_LINKS.map((l) => l.href.substring(1));
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-background"
      style={{ borderBottom: "1px solid var(--ink)", height: 68 }}
    >
      <div
        className="container-x h-full flex items-center justify-between"
        style={{ paddingLeft: 28, paddingRight: 28 }}
      >
        <a href="#" className="flex items-center gap-2" aria-label="Dopamint home">
          <img src={logo} alt="Dopamint" style={{ height: 44, width: "auto", display: "block" }} />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {SITE_SECTION_LINKS.map((l) => {
            const isActive = activeId === l.href.substring(1);
            return (
              <a
                key={l.label}
                href={l.href}
                className="ulink"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSectionHash(l.href);
                }}
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.04em",
                  color: "var(--ink)",
                  textDecoration: isActive ? "underline" : "none",
                  textDecorationThickness: isActive ? "2px" : "auto",
                  textUnderlineOffset: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href="#testnet"
            className="btn btn-yellow"
            onClick={(e) => {
              e.preventDefault();
              scrollToSectionHash("#testnet");
            }}
          >
            Get Started
          </a>
        </div>

        <button
          className="md:hidden p-2"
          aria-label="Menu"
          onClick={() => setOpen(true)}
          style={{ border: "1px solid var(--ink)" }}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-60 bg-background flex flex-col"
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 0.5s cubic-bezier(.7,0,.2,1)",
        }}
      >
        <div
          className="w-full container-x flex items-center justify-between"
          style={{ height: 64, borderBottom: "1px solid var(--ink)" }}
        >
          <a href="#" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Dopamint"
              style={{ height: 40, width: "auto", display: "block" }}
            />
          </a>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{ border: "1px solid var(--ink)" }}
            className="p-2"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="w-full container-x flex flex-col items-center gap-6 pt-12 flex-1">
          {SITE_SECTION_LINKS.map((l) => {
            const isActive = activeId === l.href.substring(1);
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  window.setTimeout(() => scrollToSectionHash(l.href), 120);
                }}
                className="ulink text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  textDecoration: isActive ? "underline" : "none",
                  textDecorationThickness: isActive ? "2px" : "auto",
                  textUnderlineOffset: "6px",
                  display: "inline-flex",
                  justifyContent: "center",
                }}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="#testnet"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.setTimeout(() => scrollToSectionHash("#testnet"), 120);
            }}
            className="btn btn-primary mt-4"
          >
            Join Waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
