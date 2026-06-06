// app/api/blogs/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog) return new NextResponse("Not found", { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return new NextResponse("Error fetching blog", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const data = await req.json();

    const blog = await prisma.blog.update({
      where: { id },
      data,
    });

    return NextResponse.json(blog);
  } catch (error) {
    return new NextResponse("Error updating blog", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    await prisma.blog.deleteMany({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return new NextResponse("Error deleting blog", { status: 500 });
  }
}
