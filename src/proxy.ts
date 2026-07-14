import { NextRequest, NextResponse } from "next/server";
import { accountInfoRoute } from "@/constants/api";
import { error } from "node:console";

export async function proxy(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
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
      if (pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
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

      const response = NextResponse.next();
      response.headers.set(
        "x-user-data",
        JSON.stringify({
          isLoggedIn: data.isLoggedIn,
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
          },
          profile: data.profile,
        }),
      );

      return response;
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
