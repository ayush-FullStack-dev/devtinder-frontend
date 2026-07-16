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

// legacy named exports — unchanged, all client-safe
export const backendUrl         = clientBase;
export const authRoute          = `${clientBase}${authPath}`;
export const accountInfoRoute   = `${clientBase}${routes.accountInfo}`;
export const loginRoute         = `${clientBase}${routes.login}`;
export const loginIdentifyRoute = `${clientBase}${routes.loginIdentify}`;
export const loginVerifyRoute   = `${clientBase}${routes.loginVerify}`;
export const refreshRoute       = `${clientBase}${routes.refresh}`;
export const systemRoute        = `${clientBase}${systemPath}`;
export const systemHealthRoute  = `${clientBase}${routes.systemHealth}`;
