import { NextRequest, NextResponse } from "next/server";

import { apiUrl, routes } from "@/constants/api";

type VerifyStatus = "success" | "invalid" | "expired" | "error";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/verify?status=invalid", request.url),
      303,
    );
  }

  try {
    const backendResponse = await fetch(
      apiUrl(`${routes.signupVerify}?token=${encodeURIComponent(token)}`),
      {
        method: "GET",
        cache: "no-store",
      },
    );

    let status: VerifyStatus;

    if (backendResponse.status === 200) {
      status = "success";
    } else if (backendResponse.status === 400) {
      status = "invalid";
    } else if (backendResponse.status === 401) {
      status = "expired";
    } else {
      status = "error";
    }

    let email: string | undefined;

    try {
      const data = await backendResponse.clone().json();

      if (typeof data?.email === "string" && data.email.trim()) {
        email = data.email.trim().toLowerCase();
      }
    } catch {}

    const verifyUrl = new URL("/auth/verify", request.url);

    verifyUrl.searchParams.set("status", status);

    if (email) {
      verifyUrl.searchParams.set("email", email);
    }

    const response = NextResponse.redirect(verifyUrl, 303);

    const setCookies = backendResponse.headers.getSetCookie
      ? backendResponse.headers.getSetCookie()
      : backendResponse.headers.get("set-cookie")
        ? [backendResponse.headers.get("set-cookie")!]
        : [];

    for (const cookie of setCookies) {
      const modifiedCookie = cookie.replace(
        /;\s*domain=\.?devtinder\.tech/gi,
        "",
      );

      response.headers.append("set-cookie", modifiedCookie);
    }

    return response;
  } catch {
    return NextResponse.redirect(
      new URL("/auth/verify?status=error", request.url),
      303,
    );
  }
}
