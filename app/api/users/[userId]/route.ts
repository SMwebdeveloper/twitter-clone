import User from "@/database/user.models";
import { connectDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request, route: { params: { userId: string } }) {
  try {
    await connectDatabase();
    const body = await req.json();
    const { userId } = await route.params;

    await User.findByIdAndUpdate(userId, body, { new: true });

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
