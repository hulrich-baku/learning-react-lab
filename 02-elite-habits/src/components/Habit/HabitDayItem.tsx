import { Check } from "lucide-react";
import { useHabits } from "../../contexts/habitContext";

interface Props {
  id: string;
  completedDays: boolean[];
}

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimache",
];

const HabitDayItem = ({ id, completedDays }: Props) => {
  const { toggleDay, todayIndex } = useHabits();
  return (
    <div className="flex flex-col mt-1">
            {/* Tablette-PC */}
            <div className="flex justify-between">
              {DAYS.map((day, index) => (
                <span
                  key={day}
                  className={`hidden md:inline ${todayIndex === index ? "font-semibold text-cyan-500" : "font-light"} w-7 text-center uppercase`}
                >
                  {day.slice(0, 3)}
                </span>
              ))}
            </div>
            {/* Mobile */}
            <div className="flex justify-between">
              {DAYS.map((day, index) => (
                <span
                  key={day}
                  className={`inline md:hidden ${todayIndex === index ? "font-semibold text-cyan-500" : "font-light"} w-7 text-center uppercase`}
                >
                  {day.slice(0, 1)}
                </span>
              ))}
            </div>
            <div className="flex justify-between">
              {completedDays.map((isCompleted, index) => (
                <button
                  key={`${id}-${index}`}
                  onClick={() => {
                    toggleDay(id, index);
                  }}
                  className={`w-6 h-6 rounded-full border
                  ${todayIndex === index ? "bg-cyan-500" : ""}
                  ${
                    isCompleted
                      ? "bg-green-500 border-slate-600 shadow-sm"
                      : "bg-transparent border-2 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {isCompleted && <Check className="w-6 h-6 text-white" />}
                </button>
              ))}
            </div>
          </div>
  );
};

export default HabitDayItem;
