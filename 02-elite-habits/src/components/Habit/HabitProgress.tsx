interface Props {
  progress: boolean[];
}

const HabitProgress = ({progress }: Props) => {
  const completedDaysCount = progress.filter((bool) => bool).length;
  const totalDays = progress.length;
  const pourcent = Math.round((completedDaysCount/totalDays)*100)

  return (
    <div className="py-2">
        <p className="text-cyan-600 italic text-sm">
          <span>{completedDaysCount}</span>
          <span> sur </span>
          <span>{totalDays}</span> complété{completedDaysCount > 1 ? "s" : ""}
        </p>
        <div className="h-1 w-full bg-slate-100 rounded border border-slate-500">
          <div
            className="h-full bg-slate-500 rounded transition-all duration-1000 ease-in-out"
            style={{ width: `${pourcent}%` }}
          ></div>
        </div>
      </div>
  );
};

export default HabitProgress;
