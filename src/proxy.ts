import { NextRequest, NextResponse } from "next/server";
import { accountInfoRoute } from "@/constants/api";
import { DYNAMIC_ROUTE_PREFIXES, VALID_ROUTES } from "./constants/routes";

export async function proxy(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    const isStaticRouteValid = VALID_ROUTES.includes(pathname);

    const isDynamicRouteValid = DYNAMIC_ROUTE_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (!isStaticRouteValid && !isDynamicRouteValid) {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }

    if (pathname === "/") {
      return NextResponse.next();
    }

    const cookieHeader = req.headers.get("cookie") || "";

    const response = await fetch(accountInfoRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
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
        const redirectResponse = NextResponse.redirect(
          new URL("/dashboard", req.url),
        );

        redirectResponse.headers.set("x-user-data", userDataString);
        return redirectResponse;
      }

      const response = NextResponse.next({
        request: {
          headers: new Headers([
            ...req.headers,
            ["x-user-data", userDataString],
          ]),
        },
      });

      return response;
    }

    if (data.code === "refresh_auth_token") {
      const redirectUrl = pathname.startsWith("/login")
        ? "/dashboard"
        : pathname;

      return NextResponse.redirect(
        new URL(`/refresh?redirect=${redirectUrl}`, req.url),
      );
    } else {
      if (!pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
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
    });

    return NextResponse.redirect(
      new URL(`/error?${params.toString()}`, req.url),
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|refresh|error|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
