import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = signJWT({
      userId: user.id,
      email: user.email || email,
      role: user.role || "USER",
    });

    // Create response with token in cookie
    const response = Response.json({ success: true, redirect: "/dashboard" }, {
      status: 200,
      headers: {
        "Set-Cookie": `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
      },
    });

    return response;
  } catch (error) {
    console.error("[login-credentials] Error:", error);
    return Response.json({ error: "Authentication failed" }, { status: 500 });
  }
}
