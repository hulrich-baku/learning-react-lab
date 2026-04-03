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
        className="flex-1 border px-2 rounded-lg border-slate-500 focus:outline-none focus:border-cyan-700 focus:ring-1"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (inputHabit.value) {
            handleSave();
            clear();
          }
        }}
        className="rounded-lg bg-cyan-500 border md-border-slate-500 px-2 py-1 text-white"
      >
        Ajouter
      </button>
    </form>
  );
};

export default AddHabitForm;
