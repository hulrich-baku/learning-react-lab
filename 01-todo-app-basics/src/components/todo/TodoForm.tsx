import { useTodos } from "../../context/TodoContext";
import useInput from "../../hooks/useInput";

const TodoForm = () => {
  const inputTodo = useInput("");
  const todoContext = useTodos();

  const submission = () => {
    todoContext.addTodo(inputTodo.value);
    inputTodo.reset();
  };

  return (
    <div className="flex items-center px-4 py-3">
      <div>
        <button
          className="bg-gray-400 p-2 rounded-xl text-white border-blue-500 border"
          onClick={() => inputTodo.reset()}
        >
          Reset
        </button>
      </div>
      <div className="relative w-80 mx-auto">
        <input
          {...inputTodo}
          id="todoText"
          name="todoText"
          placeholder=" "
          className="
            peer h-10 w-full border-b-2 border-gray-300 
            text-gray-900 placeholder-transparent px-1
            focus:outline-none focus:border-blue-600
          "
        />
        <label
          htmlFor="todoText"
          className="
            absolute left-0 -top-2 text-gray-600 text-sm transition-all  mx-1
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-blue-600 peer-focus:text-sm
          "
        >
          Nouvelle tâche
        </label>
      </div>
      <div className="">
        <button
          className="bg-blue-400 p-2 rounded-xl text-white border border-gray-500"
          onClick={submission}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
