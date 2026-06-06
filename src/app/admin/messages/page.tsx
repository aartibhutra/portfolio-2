import { prisma } from "@/lib/prisma";
import { Mail, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { sentAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Inquiries from your portfolio contact form.
          </p>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {msg.name}
                    </h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                  <Calendar size={12} />
                  {new Date(msg.sentAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="pl-11">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl text-sm">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-500">
              No messages yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
