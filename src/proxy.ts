import { NextRequest, NextResponse } from "next/server";
import { routes } from "@/constants/api";
import { DYNAMIC_ROUTE_PREFIXES, VALID_ROUTES } from "@/constants/routes";
import { buildApiUrl, safeAppUrl, safeRedirectPath } from "@/constants/url";
import { backendProxy } from "./lib/proxy/backendProxy";
import { refreshAuth } from "./lib/auth/refreshAuth";

const unSafeRoute = ["/login", "/signup"];
const excludePages = ["/_next", "/favicon.ico"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    process.env.NODE_ENV === "development" &&
    pathname.startsWith("/backend-api/")
  ) {
    return backendProxy(req);
  }

  const isUnsafeRoute = unSafeRoute.some((route) => pathname.startsWith(route));

  try {
    const isDynamicRouteValid = DYNAMIC_ROUTE_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (!VALID_ROUTES.includes(pathname) && !isDynamicRouteValid) {
      return NextResponse.rewrite(safeAppUrl("/not-found"));
    }

    const cookieHeader = req.headers.get("cookie") || "";

    const response = await fetch(buildApiUrl(routes.accountInfo), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      next: { revalidate: 30 },
    });

    const data = await response.json();

    const isLoggedIn: boolean = data.isLoggedIn;

    if (isLoggedIn) {
      const userDataString = JSON.stringify({
        isLoggedIn: data.isLoggedIn,
        user: data.user,
        profile: data.profile,
      });

      if (isUnsafeRoute) {
        const redirectResponse = NextResponse.redirect(
          safeAppUrl("/dashboard"),
        );
        redirectResponse.headers.set("x-user-data", userDataString);
        return redirectResponse;
      }

      return NextResponse.next({
        request: {
          headers: new Headers([
            ...req.headers,
            ["x-user-data", userDataString],
          ]),
        },
      });
    }

    if (data.code === "refresh_auth_token") {
      const redirectUrl = safeRedirectPath(
        pathname.startsWith("/login") ? "/dashboard" : pathname,
      );

      return refreshAuth(req, redirectUrl);
    }

    if (!isUnsafeRoute) {
      return NextResponse.redirect(safeAppUrl("/login"));
    }

    return NextResponse.next();
  } catch (e) {
    const message =
      e instanceof Error
        ? e.message
        : "Something went wrong while checking authentication.";

    const params = new URLSearchParams({
      title: "Authentication Error",
      message,
      redirect: safeRedirectPath(pathname),
    });

    return NextResponse.redirect(safeAppUrl(`/error?${params.toString()}`));
  }
}

export const config = {
  matcher: [
    "/((?!api|error|verify|dashboard|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
