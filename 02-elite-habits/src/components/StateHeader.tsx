import { useHabits } from "../contexts/habitContext";

const StateHeader = () => {
  const { todayProgress, habits } = useHabits();
  const pourcentage = Math.round(todayProgress);

  return (
    <div className="p-4 rounded-0 md:rounded-2xl shadow-lg mb-1 border-0 md:border md:border-slate-500">
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
      <div className="w-full border h-2 rounded-full bg-slate-100 border border-slate-400">
        <div
          className="h-full bg-slate-500 rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${pourcentage}%` }}
        ></div>
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
