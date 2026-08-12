import { buildApiUrl } from "@/constants/url";
import { NextRequest, NextResponse } from "next/server";

export async function backendProxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const targetPath = pathname.replace(/^\/backend-api/, "");
  const targetUrl = buildApiUrl(`${targetPath}${search}`);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("host");

  const fetchOptions: RequestInit & { duplex: "half" } = {
    method: request.method,
    headers: requestHeaders,
    redirect: "manual",
    duplex: "half",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    fetchOptions.body = request.body;
  }

  const response = await fetch(targetUrl, fetchOptions);
  const responseHeaders = new Headers(response.headers);

  const setCookies = responseHeaders.getSetCookie
    ? responseHeaders.getSetCookie()
    : responseHeaders.get("set-cookie")
      ? [responseHeaders.get("set-cookie")!]
      : [];

  if (setCookies.length > 0) {
    responseHeaders.delete("set-cookie");

    for (const cookie of setCookies) {
      const modifiedCookie = cookie.replace(
        /;\s*domain=\.?devtinder\.tech/gi,
        "",
      );

      responseHeaders.append("set-cookie", modifiedCookie);
    }
  }

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}
