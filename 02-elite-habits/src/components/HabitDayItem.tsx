import { Check } from "lucide-react";
import { useHabits } from "../contexts/habitContext";

interface Props {
  id: string;
  isCompleted: boolean;
  dayIndex: number;
}

const HabitDayItem = ({ id, isCompleted, dayIndex }: Props) => {
  const { toggleDay } = useHabits();
  return (
    <button
      onClick={() => toggleDay(id, dayIndex)}
      className={`w-8 h-8 rounded-md border-2 
            ${
              isCompleted
                ? "bg-green-500 border-green-600 shadow-sm"
                : "bg-transparent border-gray-200 hover:bg-gray-400"
            }`}
    >
      {isCompleted && <Check className="w-4 h-4" />}
    </button>
  );
};

export default HabitDayItem;
