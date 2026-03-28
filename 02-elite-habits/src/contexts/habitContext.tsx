import { createContext, useContext, useEffect, useState } from "react";
import type { Habit, HabitContextType } from "../types/habit";

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const habitKey: string = "elite-habits";

export default function HabitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem(habitKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(habitKey, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitName: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: habitName,
      completedDay: new Array(7).fill(false),
      createdAt: Date.now(),
    };
    setHabits((prevHabits) => [newHabit, ...prevHabits]);
  };

  const updateHabit = (habitID: string, upadateName: string) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitID ? { ...habit, name: upadateName } : habit,
      ),
    );
  };

  const deleteHabit = (habitID: string) => {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitID),
    );
  };

  const toggleDay = (habitID: string, dayIndex: number) => {
    setHabits((prevHabit) =>
      prevHabit.map((habit) => {
        if (habit.id === habitID) {
          const newDays = habit.completedDay;
          newDays[dayIndex] = !newDays[dayIndex];
          return { ...habit, completedDay: newDays };
        }
        return habit;
      }),
    );
  };

  // Calcul de progression journalier en %
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // ajustement de lundi = 0
  const completedToday = habits.filter(
    (h) => h.completedDay[todayIndex],
  ).length;
  const todayProgress =
    habits.length > 0 ? (completedToday / habits.length) * 100 : 0;

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleDay,
        todayProgress,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context)
    throw new Error("useHabits doit être utilisé dans HabitProvider");

  return context;
};
