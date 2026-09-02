import signature from "cookie-signature";

const COOKIE_SECRET = process.env.COOKIE_SECRET!;

if (!COOKIE_SECRET) {
  throw new Error("COOKIE_SECRET is not configured");
}

export function unsignCookie(value: string): string | null {
  if (!value.startsWith("s:")) {
    return value;
  }

  const signedValue = value.slice(2);
  const unsignedValue = signature.unsign(signedValue, COOKIE_SECRET);

  return unsignedValue === false ? null : unsignedValue;
}
