import bcryptjs from "bcryptjs";
import { Decrypt } from "@/app/utils";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const hasedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (hasedUser) {
    return NextResponse.json({
      status: 200,
      msg: "Registered to log in !",
    });
  }
  const decryptPSW = Decrypt(password);
  const hashedPassword = await bcryptjs.hash(decryptPSW, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json({
    data: {
      user,
    },
    msg: "Register Success!",
    status: 200,
  });
}
