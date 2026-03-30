import { useEffect, useRef, useState } from "react";
import { useHabits } from "../../contexts/habitContext";
import type { Habit } from "../../types/habit";
import HabitDayItem from "./HabitDayItem";
import HabitProgress from "./HabitProgress";
import useInput from "../../hooks/useInput";

interface Props {
  habit: Habit;
}

const HabitItem = ({ habit }: Props) => {
  const [isEdtiting, setIsEditing] = useState(false);
  const { deleteHabit, updateHabit } = useHabits();
  const habitInput = useInput(habit.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdtiting && inputRef) {
      inputRef.current?.focus();
    }
  }, [isEdtiting]);

  const handleSave = () => {
    updateHabit(habit.id, habitInput.value);
    setIsEditing(false);
  };

  return (
    <div>
      {isEdtiting ? (
        <input
          type="text"
          ref={inputRef}
          {...habitInput}
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
        className={`text-green-500 ${isEdtiting ? "visible" : "hidden"}`}
      >
        Sauvegarder
      </button>

      <HabitProgress progress={habit.completedDay} key={habit.id} />

      <div className="grid grid-col-7 gap-1">
        {habit.completedDay.map((value, index) => (
          <HabitDayItem id={habit.id} isCompleted={value} dayIndex={index} />
        ))}
      </div>

      <div className="flex justify-between">
        <div>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className={` text-gray-500 ${!isEdtiting && "invisible"}`}
          >
            Modifier
          </button>
        </div>
        <div className="text-red-500">
          <button onClick={() => deleteHabit(habit.id)}>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
