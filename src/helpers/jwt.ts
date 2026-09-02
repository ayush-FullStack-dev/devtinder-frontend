import jwt from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";

const publicKey = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, "\n");

if (!publicKey) {
  throw new Error("JWT_PUBLIC_KEY is not configured");
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, publicKey as Secret, {
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      algorithms: ["RS256"],
    });

    return true;
  } catch {
    return false;
  }
}
