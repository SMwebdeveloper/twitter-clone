import User from "@/database/user.models";
import { connectDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDatabase();

    const { email, password } = await req.json();
    const isExistinUser = await User.findOne({ email });

    if (!isExistinUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, isExistinUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: "Password in correct",
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, user: isExistinUser });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
