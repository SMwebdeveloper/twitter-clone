"use client";

import { Bell, Home, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import Link from "next/link";
import SidebarPostButton from "./SidebaPostButton";
import SidebarAccount from "./SidebarAccount";

const Sidebar = () => {
  const { data: session, status }: any = useSession();

  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Notification",
      path: `/notifications/${
        status === "authenticated" && session?.currentUser?._id
      }`,
      icon: Bell,
    },
    {
      label: "Profile",
      path: `/profile/${
        status === "authenticated" && session?.currentUser?._id
      }`,
      icon: User,
    },
  ];
  return (
    <section className="sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex flex-col justify-between py-4">
      <div className="flex flex-col space-y-2">
        <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition">
          <Image height={56} width={56} src={"/images/logo.svg"} alt="logo" />
        </div>

        {sidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarItem {...item} />
          </Link>
        ))}

        <SidebarPostButton />
      </div>
      <SidebarAccount user={session?.currentUser} />
    </section>
  );
};

export default Sidebar;
