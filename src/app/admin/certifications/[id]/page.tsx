import { prisma } from "@/lib/prisma";
import CertificationForm from "../components/CertificationForm";
import { notFound } from "next/navigation";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certId = parseInt(id);

  if (isNaN(certId)) return notFound();

  const cert = await prisma.certification.findUnique({
    where: { id: certId },
  });

  if (!cert) return notFound();

  const initialData = {
    id: cert.id,
    title: cert.title,
    issuer: cert.issuer,
    issueDate: cert.issueDate.toISOString(),
    credentialId: cert.credentialId || undefined,
    credentialUrl: cert.credentialUrl || undefined,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Certification</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update certification details.
        </p>
      </div>
      <CertificationForm initialData={initialData} />
    </div>
  );
}
