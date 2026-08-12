import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function refreshAuth(
  request: NextRequest,
  redirectUrl: string,
) {
  const refreshUrl = new URL("/api/refresh", request.url);
  refreshUrl.searchParams.set("redirect", redirectUrl);

  const response = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      Cookie: request.headers.get("cookie") ?? "",
    },
    redirect: "manual",
  });

  const responseHeaders = new Headers(response.headers);

  const setCookies = responseHeaders.getSetCookie
    ? responseHeaders.getSetCookie()
    : responseHeaders.get("set-cookie")
      ? [responseHeaders.get("set-cookie")!]
      : [];

  responseHeaders.delete("set-cookie");

  const nextResponse = new NextResponse(null, {
    status: response.status,
    headers: responseHeaders,
  });

  for (const cookie of setCookies) {
    nextResponse.headers.append("set-cookie", cookie);
  }

  return nextResponse;
}