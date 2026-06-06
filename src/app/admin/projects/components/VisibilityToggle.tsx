"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

interface VisibilityToggleProps {
  id: number;
  initialVisible: boolean;
}

export default function VisibilityToggle({ id, initialVisible }: VisibilityToggleProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(initialVisible);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = async () => {
    setLoading(true);
    const newVisibility = !visible;

    setVisible(newVisibility);

    try {
      await axios.put(`/api/projects/${id}`, {
        visible: newVisibility,
      });


      router.refresh();
    } catch (error) {
      console.error(error);
      // Revert optimistic update
      setVisible(!newVisibility);
      alert("Failed to update visibility");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleVisibility}
      disabled={loading}
      className={`p-1.5 rounded-lg transition-colors border ${visible
        ? "text-green-600 bg-green-50 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
        : "text-gray-500 bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        }`}
      title={visible ? "Publicly Visible" : "Hidden"}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : visible ? (
        <Eye size={16} />
      ) : (
        <EyeOff size={16} />
      )}
    </button>
  );
}
