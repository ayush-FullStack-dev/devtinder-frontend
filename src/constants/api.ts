const clientBase =
  process.env.NODE_ENV === "development"
    ? "/backend-api"
    : process.env.NEXT_PUBLIC_API_URL!;

export const serverBase = process.env.NEXT_PUBLIC_API_URL!;

export function getBaseUrl(): string {
  return typeof window === "undefined" ? serverBase : clientBase;
}

const authPath = "/auth";
const loginPath = `${authPath}/login`;
const refreshPath = `${authPath}/refresh`;
const signupPath = `${authPath}/signup`;
const resendEmailVerificationPath = `${signupPath}/resend-verification`;
const signupVerifyPath = `${authPath}/verify`;

const checkUsernamePath = `${authPath}/check-username`;
const checkEmailPath = `${authPath}/check-email`;

const systemPath = "/system";
const healthPath = `${systemPath}/health`;

export const routes = {
  accountInfo: `${authPath}/me/`,
  login: loginPath,
  loginIdentify: `${loginPath}/identify/`,
  loginVerify: `${loginPath}/confirm/`,
  refresh: refreshPath,
  checkUsername: checkUsernamePath,
  checkEmail: checkEmailPath,
  signup: signupPath,
  signupVerify: signupVerifyPath,
  resendEmailVerification: resendEmailVerificationPath,
  systemHealth: healthPath,
} as const;

export function apiUrl(path: string): string {
  return `${getBaseUrl()}${path}`;
}
