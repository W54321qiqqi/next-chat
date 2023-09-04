"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import useConversation from "@/app/hooks/useConversation";
interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
