// app/api/skills/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      include: { category: true },
      orderBy: { id: "asc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return new NextResponse("Error fetching skills", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const skill = await prisma.skill.create({ data });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating skill", { status: 500 });
  }
}
