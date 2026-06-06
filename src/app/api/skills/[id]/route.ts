// app/api/skills/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const skill = await prisma.skill.findUnique({ where: { id } });

    if (!skill) return new NextResponse("Not found", { status: 404 });
    return NextResponse.json(skill);
  } catch (error) {
    return new NextResponse("Error fetching skill", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const data = await req.json();

    const skill = await prisma.skill.update({
      where: { id },
      data,
    });

    return NextResponse.json(skill);
  } catch (error) {
    return new NextResponse("Error updating skill", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);

    await prisma.skill.deleteMany({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return new NextResponse("Error deleting skill", { status: 500 });
  }
}
