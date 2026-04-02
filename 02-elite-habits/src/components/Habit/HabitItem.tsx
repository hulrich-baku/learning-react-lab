import { useEffect, useRef, useState } from "react";
import { useHabits } from "../../contexts/habitContext";
import type { Habit } from "../../types/habit";
import useInput from "../../hooks/useInput";
import { Check } from "lucide-react";

interface Props {
  habit: Habit;
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

const HabitItem = ({ habit }: Props) => {
  const [isEdtiting, setIsEditing] = useState(false);
  const { deleteHabit, updateHabit, toggleDay } = useHabits();
  const { clear ,...restInput } = useInput(habit.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdtiting && inputRef) {
      inputRef.current?.focus();
    }
  }, [isEdtiting]);

  const handleSave = () => {
    updateHabit(habit.id, restInput.value);
    setIsEditing(false);
  };

  const completedDaysCount = habit.completedDays.filter(Boolean).length;
  const totalDays = habit.completedDays.length;
  const pourcent =
    completedDaysCount > 0
      ? Math.round((completedDaysCount / totalDays) * 100)
      : 0;

  return (
    <div className="p-4 border border-slate-400 rounded-lg mx-4 shadow-lg">
      {isEdtiting ? (
        <input
          type="text"
          ref={inputRef}
          {...restInput}
          onBlur={handleSave}
          className="w-full"
        />
      ) : (
        <p className="font-bold">{habit.name}</p>
      )}

      <button
        onMouseDown={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className={`text-green-500 font-semibold ${isEdtiting ? "visible" : "hidden"} mt-2`}
      >
        Sauvegarder
      </button>

      {/* La progression de l'habitude */}
      <div className="py-2">
        <p className="text-gray-400">
          <span>{completedDaysCount}</span>
          <span> sur </span>
          <span>{totalDays}</span>{" "}
          complété{completedDaysCount > 1 ? "s" : ""}
        </p>
        <div className="h-1 w-full bg-gray-300 rounded">
          <div
            className="h-full bg-green-500 rounded transition-all duration-1000 ease-in-out"
            style={{ width: `${pourcent}%` }}
          ></div>
        </div>
      </div>

      {/** Les jours */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex justify-between">
          {DAYS.map((day) => (
            <span key={day} className="w-7 text-center font-light uppercase">
              {day.slice(0,3)}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          {habit.completedDays.map((isCompleted, index) => (
            <button
              key={`${habit.id}-${index}`}
              onClick={() => {
                console.log(
                  `Habit: ${habit.name}, Count: ${completedDaysCount}, Pourcentage: ${pourcent}%`,
                );
                toggleDay(habit.id, index);
              }}
              className={`w-7 h-7 rounded-md border-2 
            ${
              isCompleted
                ? "bg-green-500 border-green-600 shadow-sm"
                : "bg-transparent border-gray-200 hover:bg-gray-400"
            }`}
            >
              {isCompleted ? <Check className="w-6 h-6" /> : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <div>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className={` text-gray-500 font-semibold ${isEdtiting ? "invisible" : "visible"}`}
          >
            Modifier
          </button>
        </div>
        <div className="text-red-500 font-semibold">
          <button onClick={() => deleteHabit(habit.id)}>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
