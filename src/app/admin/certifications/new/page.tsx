import CertificationForm from "../components/CertificationForm";

export default function NewCertificationPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Certification</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add details of your certification.
        </p>
      </div>
      <CertificationForm />
    </div>
  );
}
