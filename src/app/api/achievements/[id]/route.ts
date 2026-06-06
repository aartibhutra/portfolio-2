// app/api/achievements/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const cert = await prisma.achievement.findUnique({ where: { id } });

    if (!cert) return new NextResponse("Not found", { status: 404 });
    return NextResponse.json(cert);
  } catch (error) {
    return new NextResponse("Error fetching achievement", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const data = await req.json();

    const cert = await prisma.achievement.update({
      where: { id },
      data,
    });

    return NextResponse.json(cert);
  } catch (error) {
    return new NextResponse("Error updating achievement", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    await prisma.achievement.deleteMany({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return new NextResponse("Error deleting achievement", { status: 500 });
  }
}
