// "user server";

import User from "@/database/user.models";
import { connectDatabase } from "../mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";

export async function getUserById(userId: string) {
  try {
    await connectDatabase();
    const user = await User.findById(userId);
    const { currentUser }: any = await getServerSession(authOptions);

    const filteredUser = {
      _id: user?._id,
      name: user?.name,
      username: user?.username,
      email: user?.email,
      coverImage: user?.coverImage,
      profileImage: user?.profileImage,
      bio: user?.bio,
      location: user?.location,
      createdAt: user?.createdAt,
      followers: user?.followers?.length || 0,
      followings: user?.followings?.length || 0,
      isFollowing: user?.followers?.includes(currentUser?._id) || false,
    };
    return filteredUser;
  } catch (error) {
    throw error;
  }
}
