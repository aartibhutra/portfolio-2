import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, ArrowLeft, Award, ExternalLink } from "lucide-react";
import DeleteCertificationButton from "./components/DeleteCertificationButton";

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: { issueDate: "desc" },
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your licenses and certifications.
            </p>
          </div>
          <Link
            href="/admin/certifications/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus size={18} />
            Add New Certification
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <Award size={24} />
                  </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                  {cert.issuer}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Issued: {new Date(cert.issueDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </p>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 mt-3 hover:underline"
                  >
                    View Credential <ExternalLink size={10} />
                  </a>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href={`/admin/certifications/${cert.id}`}
                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <Edit size={16} />
                </Link>
                <DeleteCertificationButton id={cert.id} />
              </div>
            </div>
          ))}
          {certifications.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              No certifications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
