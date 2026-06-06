import { prisma } from "@/lib/prisma";
import BlogForm from "../components/BlogForm";
import { notFound } from "next/navigation";

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const blog = await prisma.blog.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <BlogForm initialData={blog} />
    </div>
  );
}
