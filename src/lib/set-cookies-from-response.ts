import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function setCookiesFromResponse(
  setCookies: string[] | undefined ,
  cookieStore: ReadonlyRequestCookies,
) {
  if (setCookies) {
    setCookies.every((setCookie: string) => {
      const [nameValue] = setCookie.split(";");
      const [name, value] = nameValue.split("=");

      cookieStore.set(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    });
  }
}
