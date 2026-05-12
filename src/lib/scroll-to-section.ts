/** In-page scroll; respects prefers-reduced-motion */
export function scrollToSectionHash(href: string): boolean {
  if (!href.startsWith("#") || href === "#") return false;
  const el = document.getElementById(href.slice(1));
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", href);
  return true;
}
