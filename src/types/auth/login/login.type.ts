export const allowedRisk = [
  "verylow",
  "low",
  "mid",
  "high",
  "veryhigh",
] as const;

export const loginMethods = [
  "trusted_session",
  "passkey",
  "security_code",
  "password",
  "session_approval",
] as const;

export type LoginMethod = (typeof loginMethods)[number];
