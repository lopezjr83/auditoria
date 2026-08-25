import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/login");
  return session;
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
