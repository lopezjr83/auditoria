"use server";

import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login-credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      redirect("/auth/error?error=" + encodeURIComponent(data.error || "Invalid credentials"));
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("[loginAction] Error:", error);
    redirect("/auth/error?error=An error occurred");
  }
}
