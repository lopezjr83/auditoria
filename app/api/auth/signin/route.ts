import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

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

    // Credentials are valid - redirect to next-auth endpoint
    // This will use the next-auth internal mechanism to establish session
    redirect(`/api/auth/callback/credentials?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  } catch (error) {
    // Check if it's a redirect (which is expected)
    if ((error as any)?.message === 'NEXT_REDIRECT') {
      throw error; // Re-throw redirect errors
    }
    console.error("[signin] Error:", error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
