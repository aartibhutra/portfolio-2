import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, ArrowLeft } from "lucide-react";
import DeleteCategoryButton from "./components/DeleteCategoryButton";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { id: "asc" },
    include: { _count: { select: { skills: true } } },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/skills"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to Skills
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Skill Categories</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage categories for your skills.
            </p>
          </div>
          <Link
            href="/admin/skills/categories/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus size={18} />
            Add New Category
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {category._count.skills} Skills
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/skills/categories/${category.id}`}
                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <Edit size={16} />
                </Link>
                <DeleteCategoryButton id={category.id} />
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              No categories found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
