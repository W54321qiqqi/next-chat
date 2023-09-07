"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { HiChevronLeft } from "react-icons/hi";
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/app/hooks/useActiveList";
interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  console.log("🚀 ~ file: Header.tsx:21 ~ members:", members);
  const isActive = members.indexOf(otherUser.email!) !== -1;
  console.log("🚀 ~ file: Header.tsx:22 ~ isActive:", isActive);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      ></ProfileDrawer>
      <div
        className="
        bg-white 
          w-full 
          flex 
          border-b-[1px] 
          sm:px-4 
          py-3 
          px-4 
          lg:px-6 
          justify-between 
          items-center 
          shadow-sm
        "
      >
        <div className="flex gap-3 items-center">
          <Link
            href={"/conversations"}
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32}></HiChevronLeft>
          </Link>
          <Avatar user={otherUser}></Avatar>
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
          <HiEllipsisHorizontal
            size={32}
            className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
            onClick={() => {
              setDrawerOpen(true);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Header;
