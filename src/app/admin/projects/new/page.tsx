import ProjectForm from "../components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Showcase your latest work.
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
