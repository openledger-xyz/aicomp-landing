const waitlistFormUrl = import.meta.env.VITE_WAITLIST_SUBSCRIBER_FORM ?? "";
const waitlistEntryKey = import.meta.env.VITE_WAITLIST_FORM_ENTRY ?? "";

export function isWaitlistConfigured(): boolean {
  return Boolean(waitlistFormUrl && waitlistEntryKey);
}

export function validateWaitlistEmail(value: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}

/** POSTs to Google Form (no-cors); throws on missing config or network failure. */
export async function submitToWaitlist(email: string): Promise<void> {
  if (!waitlistFormUrl || !waitlistEntryKey) {
    throw new Error("Waitlist signup is not configured.");
  }
  const formData = new FormData();
  formData.append(waitlistEntryKey, email);
  await fetch(waitlistFormUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
}
