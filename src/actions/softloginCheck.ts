"use server";

import { verifyToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

type TokenType = "access" | "refresh";

export const softLoginCheck = async (
  tokenType: TokenType = "access",
): Promise<boolean> => {
  const cookieStore = await cookies();

  const cookieName =
    tokenType === "access" ? ACCESS_TOKEN_COOKIE : REFRESH_TOKEN_COOKIE;

  const token = cookieStore.get(cookieName)?.value;

  if (!token) {
    return false;
  }

  return verifyToken(token);
};
