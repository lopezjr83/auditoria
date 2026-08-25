import { signIn } from "@/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return Response.json({ success: true, redirect: "/dashboard" });
  } catch (error) {
    console.error("[login-credentials] Error:", error);
    return Response.json({ error: "Authentication failed" }, { status: 500 });
  }
}
