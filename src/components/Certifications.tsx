import { prisma } from "@/lib/prisma";
import { Award, Calendar, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

const Certifications = async () => {
  const certifications = await prisma.certification.findMany({
    orderBy: { issueDate: "desc" },
  });

  return (
    <section id="certifications" className="py-20">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Licenses & Certifications
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="View Credential"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                {cert.title}
              </h3>

              <div className="text-gray-600 dark:text-gray-400 font-medium text-sm mb-4">
                {cert.issuer}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Calendar size={14} />
                <span>
                  Issued {new Date(cert.issueDate).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}

          {certifications.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              Certifications details available upon request.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
