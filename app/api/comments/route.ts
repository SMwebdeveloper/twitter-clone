import Comment from "@/database/comment.models";
import Post from "@/database/post.models";
import { authOptions } from "@/lib/auth-options";
import { connectDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDatabase();
    const { body, postId, userId } = await req.json();
    const comment = await Comment.create({ body, post: postId, user: userId });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });
    return NextResponse.json(comment);
  } catch (error) {
    const result = error as Error;
    NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDatabase();
    const { currentUser }: any = await getServerSession(authOptions);
    const { commentId } = await req.json();

    await Comment.findByIdAndUpdate(commentId, {
      $push: { likes: currentUser._id },
    });

    return NextResponse.json({ message: "Comment liked" });
  } catch (error) {
    const result = error as Error;
    NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDatabase();
    const { currentUser }: any = await getServerSession(authOptions);
    const { commentId } = await req.json();

    await Comment.findByIdAndUpdate(commentId, {
      $pull: { likes: currentUser._id },
    });

    return NextResponse.json({ message: "Comment liked" });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}