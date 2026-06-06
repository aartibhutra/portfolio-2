// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { sentAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return new NextResponse("Error fetching messages", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const msg = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    return NextResponse.json(msg, { status: 201 });
  } catch (error) {
    return new NextResponse("Error sending message", { status: 500 });
  }
}
