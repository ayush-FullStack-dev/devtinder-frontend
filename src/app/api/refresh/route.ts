import { NextResponse } from "next/server";

import { getDeviceInfo } from "@/actions/device";
import { apiUrl, routes } from "@/constants/api";
import { safeRedirectPath } from "@/constants/url";
import { clearAuthCookies } from "@/actions/clearAuthCookies";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const redirectParam = searchParams.get("redirect") ?? "/dashboard";
    const redirectUrl = safeRedirectPath(redirectParam);

    const { deviceId, deviceSize } = await getDeviceInfo();

    const backendResponse = await fetch(apiUrl(routes.refresh), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") ?? "",
        "User-Agent": req.headers.get("user-agent") ?? "",
      },
      body: JSON.stringify({
        deviceId,
        deviceSize,
        clientTimestamp: new Date().toISOString(),
      }),
    });

    const setCookies = backendResponse.headers.getSetCookie
      ? backendResponse.headers.getSetCookie()
      : backendResponse.headers.get("set-cookie")
        ? [backendResponse.headers.get("set-cookie")!]
        : [];

    if (backendResponse.status === 429) {
      const retryAfter = backendResponse.headers.get("retry-after");

      return NextResponse.json(
        {
          action: "rate_limited",
          message: "Too many refresh attempts. Please try again later.",
          retryAfter,
        },
        {
          status: 429,
          headers: retryAfter
            ? {
                "Retry-After": retryAfter,
              }
            : undefined,
        },
      );
    }

    const data = await backendResponse.json();

    if (data.action === "token_refreshed") {
      const response = NextResponse.redirect(
        new URL(redirectUrl || "/dashboard", req.url),
        303,
      );

      for (const cookie of setCookies) {
        const modifiedCookie = cookie.replace(
          /;\s*domain=\.?devtinder\.tech/gi,
          "",
        );

        response.headers.append("set-cookie", modifiedCookie);
      }

      return response;
    } else if (data.action === "reauth") {
      const nextResponse = new NextResponse(null, {
        status: 303,
        headers: {
          Location: new URL("/auth/reauth", req.url).toString(),
        },
      });

      return nextResponse;
    } else if (data.action === "logout" || data.action === "logout-all") {
      await clearAuthCookies();

      const nextResponse = new NextResponse(null, {
        status: 303,
        headers: {
          Location: new URL("/auth/login", req.url).toString(),
        },
      });

      return nextResponse;
    } else {
      await clearAuthCookies();
      const nextResponse = new NextResponse(null, {
        status: 303,
        headers: {
          Location: new URL("/auth/login", req.url).toString(),
        },
      });

      return nextResponse;
    }
  } catch (e) {
    const title = e instanceof Error ? e.name : "Something went wrong";
    const message = e instanceof Error ? e.message : "Unknown error";

    return NextResponse.redirect(
      new URL(
        `/error?title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}&redirect=${encodeURIComponent("/dashboard")}`,
        req.url,
      ),
      303,
    );
  }
}
