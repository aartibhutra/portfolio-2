import { prisma } from "@/lib/prisma";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

const Blogs = async () => {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (blogs.length === 0) return null;

  return (
    <section id="blogs" className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">
              Latest Articles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
              From the Blog
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full mx-auto md:mx-0" />
          </div>

          <Link
            href="/blog"
            className="group hidden md:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {blog.coverImage ? (
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <span className="text-sm font-medium">No Cover Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {Math.ceil(blog.content.length / 1000)} min read
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                  {blog.content.replace(/[#*`]/g, "").substring(0, 150)}...
                </p>

                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium mt-auto">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
