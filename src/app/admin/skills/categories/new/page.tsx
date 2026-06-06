import CategoryForm from "../components/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Category</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Create a category to group your skills.
        </p>
      </div>
      <CategoryForm />
    </div>
  );
}
