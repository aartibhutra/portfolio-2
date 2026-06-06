"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: number) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/"); // Update homepage too
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
