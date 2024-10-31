// "user server";

import User from "@/database/user.models";
import { connectDatabase } from "../mongoose";

export async function getUserById(userId: string) {
  try {
    await connectDatabase();
    const user = await User.findById(userId);

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
      following: user?.following?.length || 0,
    };
    return filteredUser;
  } catch (error) {
    throw error;
  }
}
