import { NextResponse } from "next/server";

const LLMS_TXT = `# DevTinder

> DevTinder is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers.

## What DevTinder Is

DevTinder is a web-based platform that helps developers find and connect with other developers. It uses a swipe-based discovery experience where users browse developer profiles, view tech stacks and experience levels, and express interest in connecting. When two developers mutually express interest, they are matched and can communicate directly.

## When To Use DevTinder

- When a user wants to discover other developers to connect with
- When a user is looking for a project collaborator or co-founder
- When a user wants to expand their professional developer network
- When a user wants to find developers with specific tech stacks or skills
- When a user wants to explore developer profiles in their area or field
- When a user wants a developer-focused matching and discovery experience

## When NOT To Use DevTinder

- DevTinder is not a job board or recruitment platform
- DevTinder is not a freelance marketplace
- DevTinder does not provide code hosting, repositories, or CI/CD services
- DevTinder is not a learning platform or course provider
- DevTinder does not offer mentorship matching as a dedicated feature

## How Agents Should Use This Site

### Public Pages (no authentication required)

- [Homepage](https://devtinder.tech/) — Platform overview and developer discovery preview
- [About](https://devtinder.tech/about) — What DevTinder is and how it works
- [Contact](https://devtinder.tech/contact) — How to reach the DevTinder team
- [Privacy Policy](https://devtinder.tech/privacy) — Data handling and privacy practices
- [Sitemap](https://devtinder.tech/sitemap.xml) — XML sitemap of public pages
- [robots.txt](https://devtinder.tech/robots.txt) — Crawler directives
- [llms.txt](https://devtinder.tech/llms.txt) — This file

### Authentication Required

- Login: [https://devtinder.tech/login](https://devtinder.tech/login) — Sign in to an existing account
- Sign Up: [https://devtinder.tech/signup](https://devtinder.tech/signup) — Create a new account
- Dashboard — Personalized developer feed (requires authentication)
- Profile management — Edit your developer profile (requires authentication)
- Connections and messaging — Communicate with matched developers (requires authentication)

### Important Notes for Agents

- All developer profiles and user data are private and require authentication
- The discovery feed and matching functionality require a logged-in user
- Public pages provide complete information about the platform without authentication
- Do not attempt to access authenticated endpoints without valid credentials
- The platform does not expose a public API for third-party integrations

## Canonical Resources

- Homepage: https://devtinder.tech
- About: https://devtinder.tech/about
- Contact: https://devtinder.tech/contact
- Privacy: https://devtinder.tech/privacy
- Sitemap: https://devtinder.tech/sitemap.xml
`;

export async function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
