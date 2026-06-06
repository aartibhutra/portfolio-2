import { prisma } from "@/lib/prisma";
import CategoryForm from "../components/CategoryForm";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) return notFound();

  const category = await prisma.skillCategory.findUnique({
    where: { id: categoryId },
  });

  if (!category) return notFound();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update category details.
        </p>
      </div>
      <CategoryForm initialData={category} />
    </div>
  );
}
