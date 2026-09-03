const isProduction = process.env.NODE_ENV === "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  secure: isProduction,
  path: "/",
  maxAge: 60 * 60 * 24 * 365 * 10,
};

export const AuthCookieOptions = {
  domain: `.${process.env.NEXT_PUBLIC_DOMAIN!}`,
  path: "/",
};
export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";
