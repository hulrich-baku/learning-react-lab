import { useHabits } from "../../contexts/habitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits } = useHabits();

  if (habits.length === 0)
    return (
      <div className="text-center px-4">
        <p>Aucune habitude pour le moment. Prêt à défier ?</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 mt-6">
      {habits.map((habit) => (
        <HabitItem habit={habit} key={habit.id} />
      ))}
    </div>
  );
};

export default HabitList;
