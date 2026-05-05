import { useEffect, useRef } from "react";

/** Canvas dot grid: dots repel cursor; click triggers shockwave. */
export function DotGrid({ className, color = "255, 231, 1" }: { className?: string; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    const dots: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const shocks: { x: number; y: number; r: number; life: number }[] = [];
    const spacing = 28;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width * devicePixelRatio;
      h = canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
      dots.length = 0;
      const cw = rect.width;
      const ch = rect.height;
      for (let y = spacing; y < ch; y += spacing) {
        for (let x = spacing; x < cw; x += spacing) {
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      shocks.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, life: 1 });
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      // shockwaves
      for (let i = shocks.length - 1; i >= 0; i--) {
        const s = shocks[i];
        s.r += 6;
        s.life -= 0.015;
        if (s.life <= 0) shocks.splice(i, 1);
      }

      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const repel = 110;
        if (dist < repel) {
          const f = (repel - dist) / repel;
          d.vx += (dx / dist) * f * 1.4;
          d.vy += (dy / dist) * f * 1.4;
        }
        // shock
        for (const s of shocks) {
          const sx = d.x - s.x;
          const sy = d.y - s.y;
          const sd = Math.hypot(sx, sy);
          if (Math.abs(sd - s.r) < 18) {
            d.vx += (sx / (sd || 1)) * 4 * s.life;
            d.vy += (sy / (sd || 1)) * 4 * s.life;
          }
        }
        // spring back
        d.vx += (d.ox - d.x) * 0.04;
        d.vy += (d.oy - d.y) * 0.04;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;

        const offset = Math.hypot(d.x - d.ox, d.y - d.oy);
        const alpha = Math.min(1, 0.25 + offset / 30);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    // Delay initial resize to let layout settle (especially on mobile)
    setTimeout(resize, 100);
    tick();

    // Use ResizeObserver to track parent size changes
    const parent = canvas.parentElement;
    let ro: ResizeObserver | null = null;
    if (parent) {
      ro = new ResizeObserver(() => resize());
      ro.observe(parent);
    }
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height: "100%" }} />;
}
