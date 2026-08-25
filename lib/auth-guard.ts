import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  const payload = verifyJWT(token);
  if (!payload) {
    redirect("/auth/login");
  }

  // Fetch user from database
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function requireRole(requiredRole: string) {
  const session = await requireAuth();
  const userRole = (session.user as { role?: string }).role ?? "USER";

  if (userRole !== requiredRole && userRole !== "SUPER_ADMIN") {
    redirect("/403");
  }

  return session;
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}

export async function requireSuperAdmin() {
  const session = await requireAuth();
  const userRole = (session.user as { role?: string }).role ?? "USER";

  if (userRole !== "SUPER_ADMIN") {
    redirect("/403");
  }

  return session;
}
