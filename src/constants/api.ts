const clientBase = "/api";
const serverBase = process.env.NEXT_PUBLIC_API_URL!;

export function getBaseUrl(): string {
  return typeof window === "undefined" ? serverBase : clientBase;
}

const authPath = "/auth";
const loginPath = `${authPath}/login`;
const systemPath = "/system";

export const routes = {
  accountInfo:   `${authPath}/me/`,
  login:         loginPath,
  loginIdentify: `${loginPath}/identify/`,
  loginVerify:   `${loginPath}/confirm/`,
  refresh:       `${authPath}/refresh`,
  systemHealth:  `${systemPath}/health/`,
} as const;

export function apiUrl(path: string): string {
  return `${getBaseUrl()}${path}`;
}
