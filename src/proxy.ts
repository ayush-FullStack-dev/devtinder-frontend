import { NextRequest, NextResponse } from "next/server";
import {
  DYNAMIC_ROUTE_PREFIXES,
  excludeRoutes,
  safeRoute,
  protectedRoutes,
  VALID_ROUTES,
} from "@/constants/routes";
import { safeAppUrl, safeRedirectPath } from "@/constants/url";
import { backendProxy } from "./lib/proxy/backendProxy";
import { refreshAuth } from "./lib/auth/refreshAuth";
import { softLoginCheck } from "./actions/softloginCheck";

const MARKDOWN_PAGES: Record<string, string> = {
  "/": `# DevTinder — Connect, Collaborate & Build with Developers

DevTinder is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers.

## Meet Build Ship

DevTinder is where developers connect, collaborate and build something real. Whether you are looking for a co-founder, a project partner, or want to expand your professional developer network, DevTinder makes it easy to find the right people.

## How It Works

Browse developer profiles with a swipe-based discovery experience. View tech stacks, experience levels, and professional interests. When two developers express mutual interest, they are matched and can communicate directly.

## Who It's For

DevTinder is built for developers of all experience levels — frontend engineers, backend developers, DevOps specialists, mobile developers, cloud architects, and full-stack engineers. From students to senior technical leads.

## Get Started

- [Sign Up](https://devtinder.tech/auth/signup)
- [Log In](https://devtinder.tech/auth/login)
- [About](https://devtinder.tech/about)
- [Contact](https://devtinder.tech/contact)
- [Privacy Policy](https://devtinder.tech/privacy)
`,
  "/about": `# About DevTinder

DevTinder is a developer matchmaking platform designed to help software engineers discover, connect, and collaborate with other developers.

## How It Works

The platform uses a swipe-based discovery experience where developers can browse profiles, view tech stacks, experience levels, and professional interests. When two developers express mutual interest, they are matched and can begin communicating directly through the platform.

## Who Is DevTinder For

DevTinder is built for developers of all experience levels — from students and early-career engineers to senior architects and technical leads. Frontend engineers, backend developers, DevOps specialists, mobile developers, cloud architects, and full-stack engineers all use DevTinder to find peers who share their technical interests and professional goals.

## Our Mission

Building great software is a collaborative effort. DevTinder exists to make meaningful developer connections accessible to everyone. The platform focuses on genuine professional relationships rather than superficial networking.

- [Home](https://devtinder.tech/)
- [Contact](https://devtinder.tech/contact)
- [Privacy](https://devtinder.tech/privacy)
`,
  "/contact": `# Contact DevTinder

For general inquiries, support requests, and feedback, you can reach the DevTinder team by emailing support@devtinder.tech.

## What You Can Contact Us About

- Account issues and technical support
- Bug reports and feature requests
- Partnership and collaboration inquiries
- Privacy and data-related questions
- General feedback about the platform
- Security vulnerability reports

We aim to respond to all messages within 48 hours.

- [Home](https://devtinder.tech/)
- [About](https://devtinder.tech/about)
- [Privacy](https://devtinder.tech/privacy)
`,
  "/privacy": `# Privacy Policy — DevTinder

Your privacy matters to us. This policy describes what information DevTinder collects, how it is used, and how it is protected.

## Information We Collect

When you create an account, we collect your name, email address, and username. Profile information such as your bio, tech stack, location, and experience level is collected when you complete your developer profile. We use essential cookies for authentication and Vercel Analytics for anonymized usage data.

## How We Use Your Information

Your profile is used to create your developer profile visible to other users. Your email is used for account verification and authentication. We do not sell your personal information or use third-party advertising cookies.

## Contact

If you have questions about this privacy policy, contact us at support@devtinder.tech.

- [Home](https://devtinder.tech/)
- [About](https://devtinder.tech/about)
- [Contact](https://devtinder.tech/contact)
`,
};

function addVaryHeader(response: NextResponse): NextResponse {
  const existing = response.headers.get("Vary") || "";
  const values = existing
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  if (!values.some((v) => v.toLowerCase() === "accept")) {
    values.push("Accept");
  }

  if (!values.some((v) => v.toLowerCase() === "accept-encoding")) {
    values.push("Accept-Encoding");
  }

  response.headers.set("Vary", values.join(", "));
  return response;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accept = req.headers.get("accept") || "";
  const wantsMarkdown =
    accept.includes("text/markdown") && !accept.includes("text/html");

  if (wantsMarkdown && MARKDOWN_PAGES[pathname]) {
    return new NextResponse(MARKDOWN_PAGES[pathname], {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  if (
    process.env.NODE_ENV === "development" &&
    pathname.startsWith("/backend-api/")
  ) {
    return backendProxy(req);
  }

  const isExcludedRoute = excludeRoutes.includes(pathname);

  if (isExcludedRoute) {
    return addVaryHeader(NextResponse.next());
  }

  const isSafeRoute = safeRoute.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isUnsafeRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  try {
    const isDynamicRouteValid = DYNAMIC_ROUTE_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (!VALID_ROUTES.includes(pathname) && !isDynamicRouteValid) {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }

    const isAccessTokenValid = await softLoginCheck("access");

    if (isAccessTokenValid) {
      if (isSafeRoute) {
        return addVaryHeader(NextResponse.redirect(safeAppUrl("/dashboard")));
      }

      return addVaryHeader(NextResponse.next());
    }

    if (isSafeRoute) {
      const isRefreshTokenValid = await softLoginCheck("refresh");

      if (isRefreshTokenValid) {
        return refreshAuth(req, "/dashboard");
      }

      return addVaryHeader(NextResponse.next());
    }

    if (isUnsafeRoute) {
      const isRefreshTokenValid = await softLoginCheck("refresh");

      if (isRefreshTokenValid) {
        const redirectUrl = safeRedirectPath(pathname);

        return refreshAuth(req, redirectUrl);
      }

      return addVaryHeader(NextResponse.redirect(safeAppUrl("/auth/login")));
    }

    return addVaryHeader(NextResponse.next());
  } catch (e) {
    const message =
      e instanceof Error
        ? e.message
        : "Something went wrong while checking authentication.";

    const params = new URLSearchParams({
      title: "Authentication Error",
      message,
      redirect: safeRedirectPath(pathname),
    });

    return addVaryHeader(
      NextResponse.redirect(safeAppUrl(`/error?${params.toString()}`)),
    );
  }
}

export const config = {
  matcher: ["/((?!api|error|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
