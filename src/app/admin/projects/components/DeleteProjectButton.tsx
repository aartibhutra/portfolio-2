"use client";

import { deleteProject } from "../actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProjectButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setLoading(true);
    try {
      const result = await deleteProject(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      // No need for router.refresh() as revalidatePath handles it, 
      // but router.refresh() ensures client cache is also updated if needed.
      // Actually, with server actions, the page should update.
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Project"
    >
      <Trash2 size={16} />
    </button>
  );
}
