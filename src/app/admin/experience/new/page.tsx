import ExperienceForm from "../components/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Experience</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add a new work experience entry.
        </p>
      </div>
      <ExperienceForm />
    </div>
  );
}
