import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

export async function GET(_req: Request, { params }: { params: Params }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const category = await prisma.skillCategory.findUnique({
      where: { id },
      include: { skills: true },
    });

    if (!category) return new NextResponse("Category not found", { status: 404 });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Error fetching category", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const data = await req.json();

    const category = await prisma.skillCategory.update({
      where: { id },
      data: { name: data.name },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Error updating category", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    // Optional: Check if skills exist in this category before deleting
    // For now, we'll assume cascading delete or let it fail if constraints exist, 
    // but usually Prisma doesn't cascade by default unless configured in schema.
    // Ideally we should warn user or delete skills first. 
    // Checking schema: `skills Skill[]`. No explicit onDelete cascade in relation.
    // Let's first delete related skills to avoid orphan records or errors if enforced.
    
    await prisma.skill.deleteMany({
      where: { categoryId: id },
    });

    await prisma.skillCategory.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error deleting category", { status: 500 });
  }
}
