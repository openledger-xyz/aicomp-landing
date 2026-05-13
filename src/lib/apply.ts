const formUrl = import.meta.env.VITE_APPLY_FORM_URL ?? "";

const entries = {
  email:       import.meta.env.VITE_APPLY_ENTRY_EMAIL       ?? "",
  describes:   import.meta.env.VITE_APPLY_ENTRY_DESCRIBES   ?? "",
  buildPlan:   import.meta.env.VITE_APPLY_ENTRY_BUILD_PLAN  ?? "",
  whyAccess:   import.meta.env.VITE_APPLY_ENTRY_WHY_ACCESS  ?? "",
  aiExperience:import.meta.env.VITE_APPLY_ENTRY_AI_EXP      ?? "",
  platforms:   import.meta.env.VITE_APPLY_ENTRY_PLATFORMS   ?? "",
};

export type ApplyFormData = {
  email: string;
  describes: string;
  buildPlan: string;
  whyAccess: string;
  aiExperience: string;
  platform: string;
};

export function isApplyConfigured(): boolean {
  return Boolean(formUrl);
}

export function validateApplyForm(
  data: ApplyFormData,
): Partial<Record<keyof ApplyFormData, string>> {
  const errors: Partial<Record<keyof ApplyFormData, string>> = {};

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.describes) errors.describes = "Please select what best describes you.";
  if (!data.buildPlan.trim()) errors.buildPlan = "Please describe what you're planning to build.";
  if (!data.whyAccess.trim()) errors.whyAccess = "Please tell us why you want early access.";
  if (!data.aiExperience) errors.aiExperience = "Please select an option.";
  if (!data.platform) errors.platform = "Please select a platform.";

  return errors;
}

/** POSTs to a Google Form (no-cors). Platforms are joined as comma-separated. */
export async function submitApplyForm(data: ApplyFormData): Promise<void> {
  if (!formUrl) throw new Error("Apply form is not configured.");

  const fd = new FormData();
  if (entries.email)        fd.append(entries.email,        data.email);
  if (entries.describes)    fd.append(entries.describes,    data.describes);
  if (entries.buildPlan)    fd.append(entries.buildPlan,    data.buildPlan);
  if (entries.whyAccess)    fd.append(entries.whyAccess,    data.whyAccess);
  if (entries.aiExperience) fd.append(entries.aiExperience, data.aiExperience);
  if (entries.platforms)    fd.append(entries.platforms,    data.platform);

  await fetch(formUrl, { method: "POST", mode: "no-cors", body: fd });
}
