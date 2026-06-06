import SkillForm from "../components/SkillForm";

export default function NewSkillPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Skill</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add a new skill to your portfolio.
        </p>
      </div>
      <SkillForm />
    </div>
  );
}
