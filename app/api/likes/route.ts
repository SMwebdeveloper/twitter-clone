import Post from "@/database/post.models";
import { connectDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    await connectDatabase();
    const { postId, userId } = await req.json();

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
      { new: true }
    );

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDatabase();
    const { postId, userId } = await req.json();

    await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );
    return NextResponse.json({ succes: true });
  } catch (error) {
    const result = error as Error;
    NextResponse.json({ error: result.message }, { status: 400 });
  }
}
