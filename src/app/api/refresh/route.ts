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
        "User-Agent": req.headers.get("user-agent") ?? "",
      },
      body: JSON.stringify({
        deviceId,
        deviceSize,
        clientTimestamp: new Date().toISOString(),
      }),
    });

    const setCookies = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie")!]
        : [];

    if (response.status === 429) {
      const retryAfter = response.headers.get("retry-after");

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

    const data = await response.json();

    switch (data.action) {
      case "token_refreshed": {
        const nextResponse = new NextResponse(null, {
          status: 303,
          headers: {
            Location: new URL(redirectUrl, req.url).toString(),
          },
        });

        for (const cookie of setCookies) {
          nextResponse.headers.append("set-cookie", cookie);
        }

        return nextResponse;
      }

      case "reauth": {
        const nextResponse = new NextResponse(null, {
          status: 303,
          headers: {
            Location: new URL("/mfa/2fa", req.url).toString(),
          },
        });

        for (const cookie of setCookies) {
          nextResponse.headers.append("set-cookie", cookie);
        }

        return nextResponse;
      }

      case "logout":
      case "logout-all": {
        await clearAuthCookies();

        const nextResponse = new NextResponse(null, {
          status: 303,
          headers: {
            Location: new URL("/login", req.url).toString(),
          },
        });

        for (const cookie of setCookies) {
          nextResponse.headers.append("set-cookie", cookie);
        }

        return nextResponse;
      }

      default: {
        await clearAuthCookies();

        const nextResponse = new NextResponse(null, {
          status: 303,
          headers: {
            Location: new URL("/login", req.url).toString(),
          },
        });

        for (const cookie of setCookies) {
          nextResponse.headers.append("set-cookie", cookie);
        }

        return nextResponse;
      }
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
