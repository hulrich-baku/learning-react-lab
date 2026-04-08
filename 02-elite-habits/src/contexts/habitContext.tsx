import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Habit, HabitContextType } from "../types/habit";

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const habitKey: string = "elite-habits";

const getTodayIndex = () => {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1; // ajustement de lundi = 0
};

export default function HabitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [habits, setHabits] = useState<Habit[]>(() => {
    // Vérification de sécurité pour le SSR (Vercel/Next)
    if (typeof window === "undefined") return [];

    try {
      // 2. On essaie de lire (Sécurité Navigation Privée/Chrome)
      const saved = localStorage.getItem(habitKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      // 3. En cas de bug, on renvoie un tableau vide au lieu de crasher
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(habitKey, JSON.stringify(habits));
  }, [habits]);

  // Calcul de progression journalier en %
  const { todayIndex, todayProgress } = useMemo(() => {
    const index = getTodayIndex();
    const completedToday = habits.filter((h) => h.completedDays[index]).length;
    const progress =
      habits.length > 0 ? (completedToday / habits.length) * 100 : 0;

    return { todayIndex: index, todayProgress: Math.round(progress) };
  }, [habits]);

  const addHabit = (habitName: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: habitName,
      completedDays: new Array(7).fill(false),
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
          const newDays = [...habit.completedDays];
          newDays[dayIndex] = !newDays[dayIndex];
          return { ...habit, completedDays: newDays };
        }
        return habit;
      }),
    );
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleDay,
        todayProgress,
        todayIndex,
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
