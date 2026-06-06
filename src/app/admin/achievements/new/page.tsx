import AchievementForm from "../components/AchievementForm";

export default function NewAchievementPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Achievement</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Record a new achievement or award.
        </p>
      </div>
      <AchievementForm />
    </div>
  );
}
