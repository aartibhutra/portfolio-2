// app/api/hero/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hero = await prisma.heroSection.findFirst();
    return NextResponse.json(hero);
  } catch (error) {
    return new NextResponse("Error fetching hero section", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    // There should only be one hero row
    const existing = await prisma.heroSection.findFirst();

    const updated = existing
      ? await prisma.heroSection.update({
          where: { id: existing.id },
          data,
        })
      : await prisma.heroSection.create({ data });

    return NextResponse.json(updated);
  } catch (error) {
    return new NextResponse("Error updating hero section", { status: 500 });
  }
}
