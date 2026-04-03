import { useEffect, useRef, useState } from "react";
import { useHabits } from "../../contexts/habitContext";
import type { Habit } from "../../types/habit";
import useInput from "../../hooks/useInput";
import { Check, Pencil, Trash2Icon } from "lucide-react";
import HabitProgress from "./HabitProgress";
import HabitDayItem from "./HabitDayItem";

interface Props {
  habit: Habit;
}

const HabitItem = ({ habit }: Props) => {
  const [isEdtiting, setIsEditing] = useState(false);
  const { deleteHabit, updateHabit } = useHabits();
  const { clear, ...restInput } = useInput(habit.name);
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

  return (
    <div className="p-3 border border-cyan-700 rounded-lg mx-4 shadow-lg shadow-gray-200">
      {/** Le titre et la modification */}
      <div className="flex justify-between gap-2">
        {isEdtiting ? (
          <input
            type="text"
            ref={inputRef}
            {...restInput}
            onBlur={handleSave}
            className="w-full pl-2 border focus:outline-none focus:border-cyan-700 focus:ring-1 rounded-md"
          />
        ) : (
          <p className="font-bold text-cyan-700">{habit.name}</p>
        )}

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className={`text-cyan-700 font-semibold ${isEdtiting ? "visible" : "hidden"} mt-2`}
        >
          <Check />
        </button>
      </div>

      {/** La progression de l'habitude */}
      <HabitProgress progress={habit.completedDays} />

      {/** Les jours */}
      <HabitDayItem id={habit.id} completedDays={habit.completedDays} />

      {/** Les 2 boutons en bas */}
      <div className="flex justify-between mt-4">
        <div>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className={` text-gray-500 ${isEdtiting ? "invisible" : "visible"}`}
          >
            <Pencil />
          </button>
        </div>
        <div className="text-red-500">
          <button onClick={() => deleteHabit(habit.id)}>
            <Trash2Icon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
