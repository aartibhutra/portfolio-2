import { prisma } from "@/lib/prisma";
import ExperienceForm from "../components/ExperienceForm";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expId = parseInt(id);

  if (isNaN(expId)) return notFound();

  const experience = await prisma.experience.findUnique({
    where: { id: expId },
  });

  if (!experience) return notFound();

  const initialData = {
    id: experience.id,
    role: experience.role,
    company: experience.company,
    startDate: experience.startDate.toISOString(),
    endDate: experience.endDate?.toISOString() || null,
    description: experience.description,
    techUsed: experience.techUsed,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update experience details.
        </p>
      </div>
      <ExperienceForm initialData={initialData} />
    </div>
  );
}
