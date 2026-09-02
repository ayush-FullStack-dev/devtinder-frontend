import { importSPKI, jwtVerify } from "jose";

const publicKey = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, "\n");

export async function verifyToken(token: string): Promise<boolean> {
  try {
    if (!publicKey) {
      throw new Error("JWT_PUBLIC_KEY is not configured");
    }

    const key = await importSPKI(publicKey, "RS256");

    await jwtVerify(token, key, {
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    });

    return true;
  } catch (error) {
    console.error("verifyToken error:", error);
    return false;
  }
}