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
      return Response.json({ error: result.error }, { status: 401 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("[signin] Error:", error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
