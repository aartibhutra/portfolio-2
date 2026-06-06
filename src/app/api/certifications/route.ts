// app/api/certifications/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certs = await prisma.certification.findMany({
      orderBy: { issueDate: "desc" },
    });
    return NextResponse.json(certs);
  } catch (error) {
    return new NextResponse("Error fetching certifications", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const cert = await prisma.certification.create({ data });
    return NextResponse.json(cert, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating certification", { status: 500 });
  }
}
