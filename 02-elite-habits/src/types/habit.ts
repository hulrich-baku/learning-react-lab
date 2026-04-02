export interface Habit {
  id: string;
  name: string;
  completedDays: boolean[]; // [Lun, Mar, Mer, Jeu, Ven, Sam, Dim]
  createdAt: number;
}

export interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: string) => void;
  updateHabit: (habitID: string, newName: string) => void;
  deleteHabit: (habitID: string) => void;
  toggleDay: (habitID: string, dayIndex: number) => void;
  todayProgress: number;
}
