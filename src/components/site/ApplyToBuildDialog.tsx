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
import {
  type ApplyFormData,
  isApplyConfigured,
  submitApplyForm,
  validateApplyForm,
} from "@/lib/apply";

const DESCRIBES_OPTIONS = [
  "Creator / Influencer",
  "Media & IP Owner",
  "Developer / Founder",
  "AI Researcher",
  "Other",
];

const AI_EXPERIENCE_OPTIONS = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
  { value: "Currently exploring AI tools", label: "Currently exploring AI tools" },
];

const PLATFORM_OPTIONS = [
  "TikTok",
  "Instagram",
  "YouTube",
  "Twitch",
  "X / Twitter",
  "Discord",
  //"Other",
];

type Phase = "form" | "success";

const EMPTY: ApplyFormData = {
  email: "",
  describes: "",
  buildPlan: "",
  whyAccess: "",
  aiExperience: "",
  platform: "",
};

export type ApplyToBuildDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ApplyToBuildDialog({ open, onOpenChange }: ApplyToBuildDialogProps) {
  const [phase, setPhase] = useState<Phase>("form");
  const [data, setData] = useState<ApplyFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplyFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [otherPlatform, setOtherPlatform] = useState("");
  const [otherPlatformError, setOtherPlatformError] = useState("");

  useEffect(() => {
    if (!open) {
      setPhase("form");
      setData(EMPTY);
      setErrors({});
      setSubmitError("");
      setLoading(false);
      setOtherPlatform("");
      setOtherPlatformError("");
    }
  }, [open]);

  const setField =
    (field: keyof ApplyFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (submitError) setSubmitError("");
    };

  const selectPlatform = (platform: string) => {
    setData((prev) => ({ ...prev, platform }));
    if (platform !== "Other") {
      setOtherPlatform("");
      setOtherPlatformError("");
    }
    if (errors.platform) setErrors((prev) => ({ ...prev, platform: undefined }));
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate "Other" text input if "Other" is selected
    if (data.platform === "Other" && !otherPlatform.trim()) {
      setOtherPlatformError("Please specify the platform.");
      return;
    }

    const fieldErrors = validateApplyForm(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    if (!isApplyConfigured()) {
      setSubmitError("Form not configured — add VITE_APPLY_FORM_URL to your environment.");
      return;
    }

    // Replace "Other" with the typed value before submitting
    const submitData = {
      ...data,
      platform: data.platform === "Other" ? otherPlatform.trim() : data.platform,
    };

    setLoading(true);
    try {
      await submitApplyForm(submitData);
      setPhase("success");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full border border-ink bg-background px-4 py-3 text-sm outline-none transition-opacity placeholder:text-ink/35 disabled:opacity-60 focus:ring-2 focus:ring-primary";
  const labelCls =
    "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55";
  const errorCls = "mt-1.5 text-xs text-red-600";
  const requiredMark = <span className="text-red-500">*</span>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
        className={cn(
          "max-w-[min(calc(100vw-2rem),560px)] flex flex-col gap-0 border border-ink p-0 shadow-2xl sm:rounded-sm overflow-hidden max-h-[90svh]",
          phase === "success" &&
            "[&>button]:text-ink [&>button]:ring-offset-[var(--primary)] [&>button]:hover:bg-ink/10 [&>button]:hover:text-ink",
        )}
      >
        {phase === "form" ? (
          <>
            {/* ── Header ── */}
            <div className="border-b border-ink/15 px-6 py-5">
              <DialogHeader className="space-y-1.5 text-left sm:text-left">
                <DialogTitle
                  className="text-xl font-extrabold tracking-tight text-ink"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Apply to Build
                </DialogTitle>
                <DialogDescription
                  className="text-[15px] leading-relaxed text-ink/70"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Tell us what you're building — we'll get back to you with early access.
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* ── Form body ── */}
            <form
              onSubmit={handleSubmit}
              noValidate
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain min-h-0 px-6 py-6 flex flex-col gap-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {/* Email */}
              <div>
                <label htmlFor="atb-email" className={labelCls}>
                  Email Address {requiredMark}
                </label>
                <input
                  id="atb-email"
                  type="email"
                  placeholder="you@domain.com"
                  autoComplete="email"
                  value={data.email}
                  onChange={setField("email")}
                  disabled={loading}
                  className={inputCls}
                />
                {errors.email && <p className={errorCls} role="alert">{errors.email}</p>}
              </div>

              {/* What best describes you */}
              <div>
                <label htmlFor="atb-describes" className={labelCls}>
                  What best describes you? {requiredMark}
                </label>
                <div className="relative">
                  <select
                    id="atb-describes"
                    value={data.describes}
                    onChange={setField("describes")}
                    disabled={loading}
                    className={cn(inputCls, "appearance-none pr-10", !data.describes && "text-ink/35")}
                  >
                    <option value="" disabled>Select your role…</option>
                    {DESCRIBES_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <span
                    className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/50"
                    style={{ fontSize: 18 }}
                    aria-hidden
                  >
                    expand_more
                  </span>
                </div>
                {errors.describes && <p className={errorCls} role="alert">{errors.describes}</p>}
              </div>

              {/* What are you planning to build */}
              <div>
                <label htmlFor="atb-build-plan" className={labelCls}>
                  What are you planning to build with Dopamint? {requiredMark}
                </label>
                <textarea
                  id="atb-build-plan"
                  rows={3}
                  placeholder="Describe your product or use case…"
                  value={data.buildPlan}
                  onChange={setField("buildPlan")}
                  disabled={loading}
                  className={cn(inputCls, "resize-none")}
                />
                {errors.buildPlan && <p className={errorCls} role="alert">{errors.buildPlan}</p>}
              </div>

              {/* Why early access */}
              <div>
                <label htmlFor="atb-why-access" className={labelCls}>
                  Why do you want early access to Dopamint? {requiredMark}
                </label>
                <textarea
                  id="atb-why-access"
                  rows={3}
                  placeholder="What's your motivation for getting in early?…"
                  value={data.whyAccess}
                  onChange={setField("whyAccess")}
                  disabled={loading}
                  className={cn(inputCls, "resize-none")}
                />
                {errors.whyAccess && <p className={errorCls} role="alert">{errors.whyAccess}</p>}
              </div>

              {/* AI experience */}
              <div>
                <p className={labelCls}>
                  Have you built or worked with AI products before? {requiredMark}
                </p>
                <div className="flex flex-col gap-2.5">
                  {AI_EXPERIENCE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        "flex items-center gap-3 border border-ink/20 px-4 py-3 cursor-pointer transition-colors hover:border-ink hover:bg-ink/[0.03]",
                        data.aiExperience === opt.value && "border-ink bg-primary/20",
                        loading && "pointer-events-none opacity-60",
                      )}
                    >
                      <input
                        type="radio"
                        name="ai-experience"
                        value={opt.value}
                        checked={data.aiExperience === opt.value}
                        onChange={setField("aiExperience")}
                        disabled={loading}
                        className="accent-[var(--ink)] w-4 h-4 shrink-0"
                      />
                      <span className="text-sm text-ink">{opt.label}</span>
                    </label>
                  ))}
                </div>
                {errors.aiExperience && <p className={errorCls} role="alert">{errors.aiExperience}</p>}
              </div>

              {/* Platform */}
              <div>
                <p className={labelCls}>
                  Which platform are you most active on? {requiredMark}
                </p>
                <div className="flex flex-wrap gap-2">
                  {PLATFORM_OPTIONS.map((platform) => {
                    const active = data.platform === platform;
                    return (
                      <button
                        key={platform}
                        type="button"
                        disabled={loading}
                        onClick={() => selectPlatform(platform)}
                        className={cn(
                          "border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60",
                          active
                            ? "border-ink bg-primary text-ink"
                            : "border-ink/30 bg-transparent text-ink/70 hover:border-ink hover:text-ink",
                        )}
                      >
                        {platform}
                      </button>
                    );
                  })}
                </div>

                {data.platform === "Other" && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Which platform? e.g. Telegram, Twitch…"
                      value={otherPlatform}
                      onChange={(e) => {
                        setOtherPlatform(e.target.value);
                        if (otherPlatformError) setOtherPlatformError("");
                      }}
                      disabled={loading}
                      autoFocus
                      className={inputCls}
                    />
                    {otherPlatformError && (
                      <p className={errorCls} role="alert">{otherPlatformError}</p>
                    )}
                  </div>
                )}

                {errors.platform && <p className={errorCls} role="alert">{errors.platform}</p>}
              </div>

              {submitError && (
                <p className="text-sm text-red-600" role="alert">{submitError}</p>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-1">
                <DialogClose asChild>
                  <button type="button" disabled={loading} className="btn btn-outline disabled:opacity-60">
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-yellow justify-center disabled:opacity-70"
                >
                  {loading ? "Submitting…" : "Submit Application"}
                  {!loading && (
                    <span className="material-symbols-outlined" style={{ fontSize: 16, marginLeft: 6 }} aria-hidden>
                      arrow_forward
                    </span>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* ── Success ── */
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
                Application received!
              </DialogTitle>
              <DialogDescription
                className="text-[15px] leading-relaxed text-ink/75"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Thanks for applying. We'll review your response and reach out to{" "}
                <strong className="text-ink">{data.email}</strong> with next steps.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex-col gap-0 sm:flex-row sm:justify-center">
              <DialogClose asChild>
                <button type="button" className="btn btn-outline w-full sm:w-auto sm:min-w-[140px] hover:!border-ink">
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
