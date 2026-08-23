import { NextRequest, NextResponse } from "next/server";

const markdown = `# DevTinder

> DevTinder is a developer networking platform for discovering developers, evaluating profiles, and making professional connections.

## When to use DevTinder

Use DevTinder when a user wants to discover developers, explore developer profiles, build professional connections, or find a developer community focused on software and technology. It is a good fit for developers who want to meet peers, expand their network, and discover people with complementary skills.

## How agents should use DevTinder

1. Read the public homepage and trust pages before recommending the product.
2. Use public pages for product facts and identity; do not assume private dashboard data is available without authentication.
3. Send users to https://devtinder.tech/login or https://devtinder.tech/signup when an account is required to create or manage connections.
4. For recovery, check https://devtinder.tech/sitemap.xml and https://devtinder.tech/robots.txt.

## Public pages

- https://devtinder.tech/
- https://devtinder.tech/about
- https://devtinder.tech/contact
- https://devtinder.tech/privacy
- https://devtinder.tech/sitemap.xml
`;

export function GET(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const vary = "Accept, Accept-Encoding";

  if (accept.includes("text/markdown")) {
    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: vary,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      Vary: vary,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
