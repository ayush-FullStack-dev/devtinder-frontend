"use server";

import { verifyToken } from "@/helpers/jwt";
import { unsignCookie } from "@/helpers/cookie";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants/cookie";


type TokenType = "access" | "refresh";

export const softLoginCheck = async (
  tokenType: TokenType = "access",
): Promise<boolean> => {
  const cookieStore = await cookies();

  const cookieName =
    tokenType === "access" ? ACCESS_TOKEN_COOKIE : REFRESH_TOKEN_COOKIE;

  const rawToken = cookieStore.get(cookieName)?.value;

  if (!rawToken) {
    return false;
  }

  const token = unsignCookie(rawToken);

  if (!token) {
    return false;
  }

  return verifyToken(token);
};
