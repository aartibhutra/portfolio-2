import { prisma } from "@/lib/prisma";
import SkillForm from "../components/SkillForm";
import { notFound } from "next/navigation";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skillId = parseInt(id);

  if (isNaN(skillId)) return notFound();

  const skill = await prisma.skill.findUnique({
    where: { id: skillId },
  });

  if (!skill) return notFound();

  const skillData = {
    id: skill.id,
    name: skill.name,
    level: skill.level || 0,
    categoryId: skill.categoryId,
    isLearning: skill.isLearning,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Skill</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update skill details.
        </p>
      </div>
      <SkillForm initialData={skillData} />
    </div>
  );
}
