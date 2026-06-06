// app/api/certifications/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    return new NextResponse("Error fetching experiences", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const experience = await prisma.experience.create({ data });
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating experience", { status: 500 });
  }
}
