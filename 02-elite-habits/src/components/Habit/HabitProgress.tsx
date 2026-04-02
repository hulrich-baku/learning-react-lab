interface Props {
  progress: boolean[];
}

const HabitProgress = ({progress }: Props) => {
  const completedCount = progress.filter((bool) => bool).length;
  const totalDays = progress.length;
  const pourcent = Math.round((completedCount/totalDays)*100)

  return (
    <div className="py-2">
      <span className="text-gray-400">
        {completedCount}/{totalDays} complété(s)
      </span>
      <div className="h-1 w-full bg-gray-300 rounded">
        <div className="h-full bg-green-500 rounded transition-all duration-1000 ease-in-out" style={{width: `${pourcent}%`}}></div>
      </div>
    </div>
  );
};

export default HabitProgress;
