import { useEffect, useRef, useState, type ReactElement } from "react";
import { ScrambledText } from "@/components/kinetic/ScrambledText";

const SNIPPET = [
  { t: "$ ", c: "#666" },
  { t: "npm install @dopamint/core\n", c: "#fff" },
  { t: "✓ installed in 1.2s\n\n", c: "#7cf07c" },
  { t: "import ", c: "#ffe701" },
  { t: "{ Dopamint } ", c: "#fff" },
  { t: "from ", c: "#ffe701" },
  { t: "\"@dopamint/core\"", c: "#7cf07c" },
  { t: ";\n", c: "#fff" },
  { t: "const ", c: "#ffe701" },
  { t: "rt = ", c: "#fff" },
  { t: "new ", c: "#ffe701" },
  { t: "Dopamint({ identity: ", c: "#fff" },
  { t: "\"iris_42\"", c: "#7cf07c" },
  { t: " });\n", c: "#fff" },
  { t: "await ", c: "#ffe701" },
  { t: "rt.voice.connect();\n", c: "#fff" },
  { t: "rt.on(", c: "#fff" },
  { t: "\"turn\"", c: "#7cf07c" },
  { t: ", (t) => console.log(t.text));\n", c: "#fff" },
];

const FULL = SNIPPET.map((s) => s.t).join("");

const pills = ["APIs", "SDKs", "Event Streams", "Memory Controls", "Safety Layer", "Model Routing", "Deployment Controls", "Identity API"];

export function Developers() {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let i = 0;
          const tick = () => {
            i = Math.min(FULL.length, i + 2);
            setCount(i);
            if (i < FULL.length) setTimeout(tick, 18);
          };
          tick();
        }
      });
    }, { threshold: 0.3 });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  // Build colored output by walking SNIPPET up to `count` characters.
  const renderTyped = () => {
    let remaining = count;
    const out: ReactElement[] = [];
    for (let i = 0; i < SNIPPET.length; i++) {
      const seg = SNIPPET[i];
      if (remaining <= 0) break;
      const take = seg.t.slice(0, remaining);
      remaining -= take.length;
      out.push(<span key={i} style={{ color: seg.c }}>{take}</span>);
    }
    return out;
  };

  return (
    <section id="developers" className="py-24 lg:py-32" style={{ borderBottom: "1px solid var(--ink)" }}>
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="reveal">
          <span className="section-label mb-6">
            <span className="material-symbols-outlined">code</span>
            DEVELOPERS
          </span>
          <ScrambledText as="h2" className="h-section mt-6" text="Built for shipping, not experimenting." />
          <p className="mt-8 max-w-lg" style={{ color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 }}>
            Everything you need to go from idea to production — without duct-taping five services together.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {pills.map((p) => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#testnet" className="btn btn-primary">
              Join Waitlist
              <span className="material-symbols-outlined" style={{ fontSize: 16, marginLeft: 6 }}>arrow_forward</span>
            </a>
            <a href="#" className="btn btn-outline inline-flex items-center gap-1" style={{ fontSize: 12, letterSpacing: "0.08em" }}>Read Docs <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span></a>
          </div>
        </div>

        <div ref={wrapRef} className="reveal" style={{ background: "#0a0a0a", border: "1px solid var(--ink)" }}>
          <div className="flex gap-1.5 px-4 py-3" style={{ borderBottom: "1px solid #222" }}>
            <span style={{ width: 11, height: 11, borderRadius: 99, background: "#ff5f57" }} />
            <span style={{ width: 11, height: 11, borderRadius: 99, background: "#febc2e" }} />
            <span style={{ width: 11, height: 11, borderRadius: 99, background: "#28c840" }} />
            <span className="ml-3" style={{ color: "#666", fontSize: 11, fontFamily: "monospace" }}>~/dopamint</span>
          </div>
          <pre style={{ padding: 24, color: "#fff", fontFamily: "monospace", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0, minHeight: 320 }}>
            {renderTyped()}
            <span className="caret" />
          </pre>
        </div>
      </div>
    </section>
  );
}
