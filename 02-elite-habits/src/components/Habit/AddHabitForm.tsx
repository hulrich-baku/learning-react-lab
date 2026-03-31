import { Plus } from "lucide-react";
import { useHabits } from "../../contexts/habitContext";
import useInput from "../../hooks/useInput";

const AddHabitForm = () => {
  const inputHabit = useInput();
  const { addHabit } = useHabits();

  const handleSave = () => {
    addHabit(inputHabit.value);
    inputHabit.setValue("");
  };

  return (
    <div className="flex w-full max-w-2xl mx-auto">
      <input
        type="text"
        {...inputHabit}
        placeholder="Nouvelle habitue (ex: Lecture, Sport...)"
        className="flex-1"
      />
      <button onClick={handleSave}>
        <Plus size={20} />
        <span className="hidden sm-inline">Ajouter</span>
      </button>
    </div>
  );
};

export default AddHabitForm;
