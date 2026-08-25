import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, passwordHash } = await req.json();

    if (!email || !name || !passwordHash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "USER",
        isActive: true,
      },
    });

    console.log(`[auth] New user registered: ${user.id}`);

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[auth] Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
