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

    const response = await fetch(apiUrl(routes.refresh), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") ?? "",
      },
      body: JSON.stringify({
        deviceId,
        deviceSize,
        clientTimestamp: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    const responseHeaders = new Headers();

    const setCookies = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie")!]
        : [];

    for (const cookie of setCookies) {
      const modifiedCookie = cookie.replace(
        /;\s*domain=\.?devtinder\.tech/gi,
        "",
      );

      responseHeaders.append("set-cookie", modifiedCookie);
    }

    switch (data.action) {
      case "token_refreshed":
        return new NextResponse(null, {
          status: 303,
          headers: {
            ...Object.fromEntries(responseHeaders.entries()),
            Location: new URL(redirectUrl, req.url).toString(),
          },
        });

      case "stepup":
        return new NextResponse(null, {
          status: 303,
          headers: {
            ...Object.fromEntries(responseHeaders.entries()),
            Location: new URL("/mfa/2fa", req.url).toString(),
          },
        });

      case "await_approval":
        return new NextResponse(null, {
          status: 303,
          headers: {
            ...Object.fromEntries(responseHeaders.entries()),
            Location: new URL(
              `/auth/session-approval?approvalId=${encodeURIComponent(data.approvalId)}`,
              req.url,
            ).toString(),
          },
        });

      case "logout":
      case "logout-all":
        await clearAuthCookies();
        return new NextResponse(null, {
          status: 303,
          headers: {
            ...Object.fromEntries(responseHeaders.entries()),
            Location: new URL("/login", req.url).toString(),
          },
        });

      default:
        await clearAuthCookies();
        return new NextResponse(null, {
          status: 303,
          headers: {
            ...Object.fromEntries(responseHeaders.entries()),
            Location: new URL("/login", req.url).toString(),
          },
        });
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
