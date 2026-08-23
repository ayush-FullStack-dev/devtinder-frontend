import { NextRequest, NextResponse } from "next/server";
import { routes } from "@/constants/api";
import { DYNAMIC_ROUTE_PREFIXES, VALID_ROUTES } from "@/constants/routes";
import { buildApiUrl, safeAppUrl, safeRedirectPath } from "@/constants/url";
import { backendProxy } from "./lib/proxy/backendProxy";
import { refreshAuth } from "./lib/auth/refreshAuth";

const unSafeRoute = ["/login", "/signup"];
const publicRoutes = ["/", "/about", "/contact", "/privacy"];
const excludeRoutes = [...publicRoutes, "/dashboard", "/verify"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (process.env.NODE_ENV === "development" && pathname.startsWith("/backend-api/")) return backendProxy(req);
  if (excludeRoutes.includes(pathname)) return NextResponse.next();
  const isUnsafeRoute = unSafeRoute.some((route) => pathname.startsWith(route));
  const isDynamicRouteValid = DYNAMIC_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!VALID_ROUTES.includes(pathname) && !isDynamicRouteValid) return NextResponse.next();
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const response = await fetch(buildApiUrl(routes.accountInfo), { method: "GET", headers: { "Content-Type": "application/json", Cookie: cookieHeader }, next: { revalidate: 30 } });
    const data = await response.json();
    if (data.isLoggedIn) {
      const userDataString = JSON.stringify({ isLoggedIn: data.isLoggedIn, user: data.user, profile: data.profile });
      if (isUnsafeRoute) { const redirectResponse = NextResponse.redirect(safeAppUrl("/dashboard")); redirectResponse.headers.set("x-user-data", userDataString); return redirectResponse; }
      return NextResponse.next({ request: { headers: new Headers([...req.headers, ["x-user-data", userDataString]]) } });
    }
    if (data.code === "refresh_auth_token") return refreshAuth(req, safeRedirectPath(pathname.startsWith("/login") ? "/dashboard" : pathname));
    if (!isUnsafeRoute) return NextResponse.redirect(safeAppUrl("/login"));
    return NextResponse.next();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong while checking authentication.";
    return NextResponse.redirect(safeAppUrl(`/error?${new URLSearchParams({ title: "Authentication Error", message, redirect: safeRedirectPath(pathname) }).toString()}`));
  }
}

export const config = { matcher: ["/((?!api|error|_next/static|_next/image|favicon.ico|.*\\..*).*)"] };
