import Post from "@/database/post.models";
import User from "@/database/user.models";
import { connectDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    await connectDatabase();
    const { postId } = route.params;

    const post = await Post.findById(postId).populate({
      path: "user",
      model: User,
      select: "name email profileImage _id username",
    });

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
