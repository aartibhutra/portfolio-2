import { prisma } from "@/lib/prisma";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  const blog = await prisma.blog.findUnique({
    where: { slug: slug },
  });

  if (!blog || !blog.published) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white dark:bg-black transition-colors pt-24 pb-20">
      {/* Header / Cover */}
      <div className="container px-4 mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-6 text-center mb-12">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {Math.ceil(blog.content.length / 1000)} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {blog.title}
          </h1>
        </div>

        {blog.coverImage && (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container px-4 mx-auto max-w-3xl">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
