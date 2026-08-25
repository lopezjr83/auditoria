import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("[signin] Error:", error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
