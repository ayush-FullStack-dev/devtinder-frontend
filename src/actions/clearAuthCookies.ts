import {
  ACCESS_TOKEN_COOKIE,
  AuthCookieOptions,
  REFRESH_TOKEN_COOKIE,
} from "@/constants/cookie";
import { cookies } from "next/headers";

export async function clearAuthCookies() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete({
      name: ACCESS_TOKEN_COOKIE,
      ...AuthCookieOptions,
    });

    cookieStore.delete({
      name: REFRESH_TOKEN_COOKIE,
      ...AuthCookieOptions,
    });

    return true;
  } catch {
    return false;
  }
}
