import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const target = new URL("/auth/verify", request.url);

  if (token) {
    target.searchParams.set("token", token);
  } else {
    target.searchParams.set("status", "invalid");
  }

  const response = NextResponse.redirect(target, 303);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
