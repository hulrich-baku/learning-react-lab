import { useHabits } from "../contexts/habitContext";

const StateHeader = () => {
  const { todayProgress, habits } = useHabits();
  const pourcentage = Math.round(todayProgress);

  return (
    <div className="p-6 rounded-2xl shadow-sm mb-8">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold">Ma discipline</h1>
          <p className="text-sm">
            {habits.length} habitude{habits.length > 1 ? "s" : ""} suivie
            {habits.length > 1 ? "s" : ""}
          </p>
        </div>
        <span>{pourcentage}%</span>
      </div>

      {/*La barre de progression globale*/}
      <div className="w-full">
        <div className="h-full" style={{ width: `$pourcentage%` }}></div>
      </div>
      <p className="mt-3 text-xs italic">
        {pourcentage === 100
          ? "Félicitatipon! Journée poarfaite. 🔥"
          : "Continue comme ça!"}
      </p>
    </div>
  );
};

export default StateHeader;
