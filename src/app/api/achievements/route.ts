// app/api/achievementss/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certs = await prisma.achievement.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(certs);
  } catch (error) {
    return new NextResponse("Error fetching achievements", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const cert = await prisma.achievement.create({ data });
    return NextResponse.json(cert, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating achievement", { status: 500 });
  }
}
