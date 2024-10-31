import Comment from "@/database/comment.models";
import Post from "@/database/post.models";
import { connectDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  route: { params: { commentId: string } }
) {
  try {
    await connectDatabase();
    const { commentId } = route.params;
    const { postId }: any = req.json();

    await Comment.findByIdAndDelete(commentId);
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });

    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
