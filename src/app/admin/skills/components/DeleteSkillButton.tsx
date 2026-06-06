"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DeleteSkillButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    setLoading(true);
    try {
      await axios.delete(`/api/skills/${id}`);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      alert("Failed to delete skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading || isPending}
      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800"
      title="Delete Skill"
    >
      {loading || isPending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}
