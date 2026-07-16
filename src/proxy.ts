import { NextRequest, NextResponse } from "next/server";
import { routes } from "@/constants/api";
import { DYNAMIC_ROUTE_PREFIXES, VALID_ROUTES } from "./constants/routes";

const ALLOWED_API_ORIGIN = process.env.NEXT_PUBLIC_API_URL!;
const TRUSTED_APP_ORIGIN = process.env.NEXT_PUBLIC_APP_URL!;

const TRUSTED_API_BASE = new URL(ALLOWED_API_ORIGIN);
const TRUSTED_APP_BASE = new URL(TRUSTED_APP_ORIGIN);

function buildApiUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error("Invalid API path");
  }

  const url = new URL(path, TRUSTED_API_BASE);

  if (url.origin !== TRUSTED_API_BASE.origin) {
    throw new Error("Untrusted API URL");
  }

  return url.toString();
}

function safeRedirectPath(pathname: string): string {
  if (VALID_ROUTES.includes(pathname)) return pathname;
  return "/dashboard";
}

function safeAppUrl(path: string): URL {
  if (!path.startsWith("/")) {
    throw new Error("Invalid redirect path");
  }

  const url = new URL(path, TRUSTED_APP_BASE);

  if (url.origin !== TRUSTED_APP_BASE.origin) {
    throw new Error("Untrusted redirect URL");
  }

  return url;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  try {
    const isDynamicRouteValid = DYNAMIC_ROUTE_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (!VALID_ROUTES.includes(pathname) && !isDynamicRouteValid) {
      return NextResponse.rewrite(safeAppUrl("/not-found"));
    }

    if (pathname === "/" || pathname === "/dashboard") {
      return NextResponse.next();
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

      if (pathname.startsWith("/login")) {
        const redirectResponse = NextResponse.redirect(safeAppUrl("/dashboard"));
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
      return NextResponse.redirect(
        safeAppUrl(`/refresh?redirect=${encodeURIComponent(redirectUrl)}`),
      );
    } else {
      if (!pathname.startsWith("/login")) {
        return NextResponse.redirect(safeAppUrl("/login"));
      }
      return NextResponse.next();
    }
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
    "/((?!api|refresh|error|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
