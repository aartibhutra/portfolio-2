// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) return new NextResponse("Not found", { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return new NextResponse("Error fetching project", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const data = await req.json();

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error updating project", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    await prisma.project.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting project", { status: 500 });
  }
}
