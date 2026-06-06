import { prisma } from "@/lib/prisma";
import AchievementForm from "../components/AchievementForm";
import { notFound } from "next/navigation";

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const achievementId = parseInt(id);

  if (isNaN(achievementId)) return notFound();

  const achievement = await prisma.achievement.findUnique({
    where: { id: achievementId },
  });

  if (!achievement) return notFound();

  const initialData = {
    id: achievement.id,
    title: achievement.title,
    detail: achievement.detail || undefined,
    date: achievement.date?.toISOString() || null,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Achievement</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update achievement details.
        </p>
      </div>
      <AchievementForm initialData={initialData} />
    </div>
  );
}
