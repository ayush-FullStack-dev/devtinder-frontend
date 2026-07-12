import { NextRequest, NextResponse } from "next/server";
import { accountInfoRoute } from "@/constants/api";

export async function proxy(req: NextRequest) {
  try {
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
      if (req.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    }

    if (data.code === "refresh_auth_token") {
      const redirectUrl = req.nextUrl.pathname.startsWith("/login")
        ? "/dashboard"
        : req.nextUrl.pathname;

      return NextResponse.redirect(
        new URL(`/refresh?redirect=${redirectUrl}`, req.url),
      );
    } else {
      if (!req.nextUrl.pathname.startsWith("/login")) {
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
    if (!req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|refresh|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
