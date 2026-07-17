import { VALID_ROUTES } from "./routes";

export const ALLOWED_API_ORIGIN = process.env.NEXT_PUBLIC_API_URL!;
export const TRUSTED_APP_ORIGIN = process.env.NEXT_PUBLIC_APP_URL!;

export const TRUSTED_API_BASE = new URL(ALLOWED_API_ORIGIN);
export const TRUSTED_APP_BASE = new URL(TRUSTED_APP_ORIGIN);

export function buildApiUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error("Invalid API path");
  }

  const url = new URL(path, TRUSTED_API_BASE);

  if (url.origin !== TRUSTED_API_BASE.origin) {
    throw new Error("Untrusted API URL");
  }

  return url.toString();
}

export function safeRedirectPath(pathname: string): string {
  if (VALID_ROUTES.includes(pathname)) return pathname;
  return "/dashboard";
}

export function safeAppUrl(path: string): URL {
  if (!path.startsWith("/")) {
    throw new Error("Invalid redirect path");
  }

  const url = new URL(path, TRUSTED_APP_BASE);

  if (url.origin !== TRUSTED_APP_BASE.origin) {
    throw new Error("Untrusted redirect URL");
  }

  return url;
}
