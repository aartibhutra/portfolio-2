// app/api/learning/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const learningSkills = await prisma.skill.findMany({
      where: { isLearning: true },
      include: { category: true },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(learningSkills);
  } catch (error) {
    return new NextResponse("Error fetching learning skills", { status: 500 });
  }
}
