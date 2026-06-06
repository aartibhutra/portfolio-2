// app/api/skills/categories/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      include: { skills: true },
      orderBy: { id: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Error fetching skill categories", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const category = await prisma.skillCategory.create({ data });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating skill category", { status: 500 });
  }
}
