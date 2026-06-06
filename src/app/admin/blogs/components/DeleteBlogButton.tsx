"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteBlogButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    setLoading(true);
    try {
      await axios.delete(`/api/blogs/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete blog", error);
      alert("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
      title="Delete Blog"
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
    </button>
  );
}
