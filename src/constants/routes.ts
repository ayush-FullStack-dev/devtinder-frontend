export const unSafeRoute = ["/login", "/signup"];
export const excludeRoutes = [
  "/",
  "/dashboard",
  "/verify",
  "/about",
  "/contact",
  "/privacy",
  "/how-it-works",
];

export const VALID_ROUTES = [...excludeRoutes, ...unSafeRoute, "/error"];

export const DYNAMIC_ROUTE_PREFIXES: string[] = [];
