import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // We assume there's only one About section, so find the first one or create default
    let about = await prisma.aboutSection.findFirst();
    
    if (!about) {
      about = await prisma.aboutSection.create({
        data: {
          shortIntro: "Hello, I'm Aarti.",
          description: "I am a full-stack developer...",
          highlights: [],
          imageUrl: "",
        },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    return new NextResponse("Error fetching about section", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    
    // Find first to update, or create if missing
    const existing = await prisma.aboutSection.findFirst();

    let about;
    if (existing) {
      about = await prisma.aboutSection.update({
        where: { id: existing.id },
        data: {
          shortIntro: data.shortIntro,
          description: data.description,
          imageUrl: data.imageUrl,
          btnText: data.btnText,
          btnLink: data.btnLink,
          highlights: data.highlights || [],
        },
      });
    } else {
      about = await prisma.aboutSection.create({
        data: {
          shortIntro: data.shortIntro || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          btnText: data.btnText || null,
          btnLink: data.btnLink || null,
          highlights: data.highlights || [],
        },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about section:", error);
    return new NextResponse("Error updating about section", { status: 500 });
  }
}
