"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function signInAction(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: "Invalid email or password" };
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("[signInAction] Error:", error);
    return { success: false, error: "An error occurred" };
  }
}
