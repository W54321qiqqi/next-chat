import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    console.log("🚀 ~ file: route.ts:11 ~ POST ~ body:", body);
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return NextResponse.json({ msg: "Unauthorized", status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return NextResponse.json({ msg: "Invalid data", status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      // 用新对话更新所有连接
      // newConversation.users.forEach((user) => {
      //   if (user.email) {
      //     pusherServer.trigger(user.email, "conversation:new", newConversation);
      //   }
      // });

      return NextResponse.json({
        status: 200,
        data: {
          ...newConversation,
        },
      });
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });
    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json({
        status: 200,
        data: {
          ...singleConversation,
        },
      });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    // 用新对话更新所有连接
    // newConversation.users.map((user) => {
    //   if (user.email) {
    //     pusherServer.trigger(user.email, "conversation:new", newConversation);
    //   }
    // });

    return NextResponse.json({
      status: 200,
      data: {
        ...newConversation,
      },
    });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Error", status: 500 });
  }
}
