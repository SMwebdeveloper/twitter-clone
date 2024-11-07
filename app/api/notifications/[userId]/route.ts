import Notification from "@/database/notification.models";
import User from "@/database/user.models";
import { connectDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { userId: string } }) {
  try {
    await connectDatabase();
    const { userId } = route.params;

    const notifications = await Notification.find({ user: userId }).sort({
      createdAt: -1,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $set: { hasNewNotifications: false },
      },
      { new: true }
    );

    return NextResponse.json({ notifications });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  route: { params: { userId: string } }
) {
  try {
    await connectDatabase();
    const { userId } = route.params;

    await Notification.deleteMany({ user: userId });
    await User.findByIdAndUpdate(
      userId,
      {
        $set: { hasNewNotifications: false },
      },
      { new: true }
    );
    return NextResponse.json({ message: "Notifications deleted" });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
