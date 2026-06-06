// app/api/experience/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const experience = await prisma.experience.findUnique({ where: { id } });

    if (!experience) return new NextResponse("Not found", { status: 404 });
    return NextResponse.json(experience);
  } catch (error) {
    return new NextResponse("Error fetching experience", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const data = await req.json();

    const experience = await prisma.experience.update({
      where: { id },
      data,
    });

    return NextResponse.json(experience);
  } catch (error) {
    return new NextResponse("Error updating experience", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    await prisma.experience.deleteMany({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return new NextResponse("Error deleting experience", { status: 500 });
  }
}
