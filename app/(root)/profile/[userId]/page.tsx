import ProfileBio from "@/components/profile/ProfileBio";
import ProfileHero from "@/components/profile/ProfileHero";
import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/types";
import React from "react";

const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserById(params.userId);
  return (
    <>
      <Header label={user?.name} isBack />
      <ProfileHero user={JSON.parse(JSON.stringify(user))} />
      <ProfileBio
        user={JSON.parse(JSON.stringify(user))}
        userId={params.userId}
      />
    </>
  );
};

export default Page;
