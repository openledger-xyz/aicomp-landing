import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { isWaitlistConfigured, submitToWaitlist, validateWaitlistEmail } from "@/lib/waitlist";

type Phase = "form" | "success";

export type JoinWaitlistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function JoinWaitlistDialog({ open, onOpenChange }: JoinWaitlistDialogProps) {
  const [phase, setPhase] = useState<Phase>("form");
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!open) {
      setPhase("form");
      setEmail("");
      setSubmittedEmail("");
      setEmailError("");
      setLoading(false);
    }
  }, [open]);

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
      setEmail("");
      setPhase("success");
    } catch (err) {
      console.error("Waitlist submission error:", err);
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[min(calc(100vw-2rem),440px)] w-full gap-0 border border-ink p-0 shadow-2xl sm:rounded-sm overflow-hidden",
          phase === "success" &&
            "[&>button]:text-ink [&>button]:ring-offset-[var(--primary)] [&>button]:hover:bg-ink/10 [&>button]:hover:text-ink",
        )}
      >
        {phase === "form" ? (
          <>
            <div className="border-b border-ink/15 px-6 py-5">
              <DialogHeader className="space-y-2 text-left sm:text-left">
                <DialogTitle
                  className="text-xl font-extrabold tracking-tight text-ink"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Join the waitlist
                </DialogTitle>
                <DialogDescription
                  className="text-[15px] leading-relaxed text-ink/70"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Get early access to the Dopamint testnet and builder updates.
                </DialogDescription>
              </DialogHeader>
            </div>
            <form onSubmit={handleSubmit} data-lenis-prevent autoComplete="off" className="">
              <div className="flex flex-col p-6">
                <label
                  htmlFor="join-waitlist-email"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Email
                </label>
                <div className="flex flex-col gap-3">
                  <input
                    id="join-waitlist-email"
                    type="text"
                    inputMode="email"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-1p-ignore
                    data-lpignore="true"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    disabled={loading}
                    className="min-h-[48px] w-full border border-ink bg-background px-4 py-3 text-sm outline-none transition-opacity disabled:opacity-60"
                    style={{ color: "var(--ink)", letterSpacing: "0.04em" }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-yellow w-full justify-center disabled:opacity-70"
                  >
                    {loading ? "Sending…" : "Submit"}
                  </button>
                </div>
                {emailError ? (
                  <p className="mt-3 text-sm text-red-600" role="alert">
                    {emailError}
                  </p>
                ) : null}
              </div>
            </form>
          </>
        ) : (
          <div className="bg-primary p-8 text-center">
            <DialogHeader className="items-center space-y-4 text-center sm:text-center">
              <span
                className="material-symbols-outlined flex justify-center"
                style={{ fontSize: 48, color: "var(--ink)", lineHeight: 1 }}
                aria-hidden
              >
                check_circle
              </span>
              <DialogTitle
                className="text-2xl font-extrabold tracking-tight text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                You&apos;re on the list!
              </DialogTitle>
              <DialogDescription
                className="text-[15px] leading-relaxed text-ink/75"
                style={{ fontFamily: "var(--font-body)" }}
              >
                We&apos;ll reach out to <strong className="text-ink">{submittedEmail}</strong> when
                access opens.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex-col gap-0 sm:flex-row sm:justify-center">
              <DialogClose asChild>
                <button
                  type="button"
                  className="btn btn-outline w-full sm:w-auto sm:min-w-[140px] hover:!border-ink"
                >
                  Got it
                </button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
