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
    const decoded = jwt.verify(token, SECRET) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}
