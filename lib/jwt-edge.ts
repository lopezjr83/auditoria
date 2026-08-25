import { jwtVerify, SignJWT, type JWTPayload as JoseJWTPayload } from "jose";

const authSecret = process.env.AUTH_SECRET || "dev-secret-key-change-in-production";
console.log("[jwt-edge] AUTH_SECRET available:", !!process.env.AUTH_SECRET);
console.log("[jwt-edge] Using SECRET starting with:", authSecret.substring(0, 10) + "...");

const SECRET = new TextEncoder().encode(authSecret);

export interface JWTPayload extends JoseJWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function signJWTEdge(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  const token = await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(SECRET);

  return token;
}

export async function verifyJWTEdge(
  token: string
): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, SECRET);
    return verified.payload as unknown as JWTPayload;
  } catch (error) {
    console.error("[verifyJWTEdge] Verification failed:", (error as Error).message);
    return null;
  }
}
