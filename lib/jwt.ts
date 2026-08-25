import jwt from "jsonwebtoken";

const SECRET = process.env.AUTH_SECRET || "dev-secret-key";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "30d" });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    console.log("[verifyJWT] Verifying token with SECRET starting:", SECRET.substring(0, 10) + "...");
    const decoded = jwt.verify(token, SECRET) as JWTPayload;
    console.log("[verifyJWT] Token verified successfully");
    return decoded;
  } catch (error) {
    console.error("[verifyJWT] Verification failed:", (error as Error).message);
    return null;
  }
}
