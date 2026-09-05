export const safeRoute = ["/auth/login", "/auth/signup"];
export const protectedRoutes = ["/profile", "/settings"];
export const excludeRoutes = [
  "/",
  "/dashboard",
  "/auth/verify",
  "/about",
  "/contact",
  "/privacy",
  "/how-it-works",
  "/error",
];

export const VALID_ROUTES = [
  ...excludeRoutes,
  ...safeRoute,
  ...protectedRoutes,
];

export const DYNAMIC_ROUTE_PREFIXES: string[] = [];
