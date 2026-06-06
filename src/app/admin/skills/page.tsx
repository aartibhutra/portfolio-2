import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, ArrowLeft, BookOpen } from "lucide-react";
import DeleteSkillButton from "./components/DeleteSkillButton";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    include: {
      skills: {
        orderBy: { id: "asc" },
      },
    },
    orderBy: { id: "asc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your technical skills and categories.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/skills/categories"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <BookOpen size={18} />
              Manage Categories
            </Link>
            <Link
              href="/admin/skills/new"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
            >
              <Plus size={18} />
              Add New Skill
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <h2 className="font-semibold text-lg">{category.name}</h2>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{skill.name}</h3>
                          {skill.isLearning && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                              <BookOpen size={10} />
                              Learning
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${skill.level || 0}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/skills/${skill.id}`}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteSkillButton id={skill.id} />
                    </div>
                  </div>
                ))}
                {category.skills.length === 0 && (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No skills in this category.
                  </div>
                )}
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              No categories found. Please seed your database or add categories via API/Database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
