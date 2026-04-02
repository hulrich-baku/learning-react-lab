import { Plus } from "lucide-react";
import { useHabits } from "../../contexts/habitContext";
import useInput from "../../hooks/useInput";

const AddHabitForm = () => {
  const { clear, ...inputHabit } = useInput();
  const { addHabit } = useHabits();

  const handleSave = () => {
    addHabit(inputHabit.value);
  };

  return (
    <form className="flex w-full max-w-2xl mx-auto p-4 gap-2">
      <input
        type="text"
        {...inputHabit}
        placeholder="Nouvelle habitue (ex: Lecture, Sport...)"
        className="flex-1 border px-2 rounded-lg border-slate-500"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSave();
          clear();
        }}
        className="flex gap-1 rounded-lg bg-transparent md:bg-green-400 border-0 md:border md-border-slate-500 p-0 md:px-3 md:py-2"
      >
        <Plus size={25} className="md:hidden text-green-400" />
        <span className="hidden md:inline">Ajouter</span>
      </button>
    </form>
  );
};

export default AddHabitForm;
