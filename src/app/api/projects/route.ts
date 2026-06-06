// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return new NextResponse("Error fetching projects", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const project = await prisma.project.create({ data });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating project", { status: 500 });
  }
}
