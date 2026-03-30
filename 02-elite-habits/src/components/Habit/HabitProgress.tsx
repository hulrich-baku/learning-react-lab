interface Props {
  progress: boolean[];
}

const HabitProgress = ({progress }: Props) => {
  const completedCount = progress.filter((bool) => bool).length;
  const totalDays = progress.length;
  const pourcent = Math.floor((completedCount/totalDays)*100)

  return (
    <div>
      <span className="text-gray-400">
        {completedCount}/{totalDays} complété(s)
      </span>
      <div className="h-1 w-full bg-gray-300 rounded">
        <div className={`w-${[pourcent]}% h-full bg-green-500 rounded`}></div>
      </div>
    </div>
  );
};

export default HabitProgress;
