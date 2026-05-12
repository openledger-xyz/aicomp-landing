import { useState } from "react";
import { ScrambledText } from "@/components/kinetic/ScrambledText";
import { DotGrid } from "@/components/kinetic/DotGrid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isWaitlistConfigured, submitToWaitlist, validateWaitlistEmail } from "@/lib/waitlist";

export function Testnet() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWaitlistEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    if (!isWaitlistConfigured()) {
      setEmailError("Waitlist signup is not configured.");
      return;
    }

    setLoading(true);
    try {
      await submitToWaitlist(email);
      setSubmittedEmail(email);
      setSuccessOpen(true);
      setEmail("");
    } catch (err) {
      console.error("Waitlist submission error:", err);
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="testnet"
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ borderBottom: "1px solid var(--ink)", background: "var(--ink)" }}
    >
      <div className="absolute inset-0 opacity-90">
        <DotGrid />
      </div>
      <div className="container-x relative text-center on-dark" style={{ color: "#fff" }}>
        <div className="reveal inline-flex flex-col items-center">
          <span className="section-label mb-4">TESTNET</span>
          <ScrambledText
            as="h2"
            className="h-section mt-4"
            text="Testnet opening soon."
            style={{ color: "#fff" }}
          />
          <p
            className="mt-6 max-w-xl"
            style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.65 }}
          >
            Be among the first to build on Dopamint. Early builders get priority access, ecosystem
            visibility, and $DOPE rewards.
          </p>

          <label
            htmlFor="waitlist-email"
            className="mt-8"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
            }}
          >
            Enter your email to join the waitlist
          </label>
          <form
            onSubmit={handleSubmit}
            className="mt-3 flex flex-col sm:flex-row items-stretch w-full max-w-xl gap-0"
            style={{ border: "1px solid var(--primary)" }}
          >
            <input
              id="waitlist-email"
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              disabled={loading}
              className="flex-1 bg-transparent px-5 py-4 outline-none disabled:opacity-60"
              style={{ color: "#fff", fontSize: 14, letterSpacing: "0.04em" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-yellow flex items-center justify-center gap-2 disabled:opacity-70"
              style={{ borderLeft: "1px solid var(--primary)" }}
            >
              {loading ? (
                "Sending…"
              ) : (
                <>
                  Join the Waitlist{" "}
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>
          {emailError ? (
            <p className="mt-3 text-center text-sm" style={{ color: "#ffb4b4" }}>
              {emailError}
            </p>
          ) : null}

          <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
            <DialogContent
              className="max-w-[min(calc(100vw-2rem),420px)] gap-6 border border-[var(--ink)] bg-[var(--primary)] p-8 text-center shadow-2xl sm:rounded-sm [&>button]:text-[var(--ink)] [&>button]:ring-offset-[var(--primary)] [&>button]:hover:bg-[var(--ink)]/10 [&>button]:hover:text-[var(--ink)]"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <DialogHeader className="items-center space-y-4 text-center sm:text-center">
                <span
                  className="material-symbols-outlined flex justify-center"
                  style={{ fontSize: 48, color: "var(--ink)", lineHeight: 1 }}
                  aria-hidden
                >
                  check_circle
                </span>
                <DialogTitle
                  className="text-2xl font-extrabold tracking-tight text-[var(--ink)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  You&apos;re on the list!
                </DialogTitle>
                <DialogDescription
                  className="text-[15px] leading-relaxed text-[var(--ink)]/75"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  We&apos;ll reach out to{" "}
                  <strong className="text-[var(--ink)]">{submittedEmail}</strong> when access opens.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-2 flex-col gap-0 sm:flex-row sm:justify-center">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="btn btn-outline w-full sm:w-auto sm:min-w-[140px] hover:!border-ink"
                  >
                    Got it
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <span className="section-label mt-8">Powered by $DOPE</span>
        </div>
      </div>
    </section>
  );
}
