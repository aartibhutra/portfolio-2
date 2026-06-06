// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return new NextResponse("Error fetching blogs", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const blog = await prisma.blog.create({ data });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating blog", { status: 500 });
  }
}
