import { useTodos } from "../context/TodoContext";

const TodoFilter = () => {
  const { setFilter, filter } = useTodos();

  return (
    <div>
      <button
        onClick={() => setFilter("all")}
        className={
          filter === "all"
            ? "bg-blue-500 font-bold text-white"
            : "text-gray-500"
        }
      >
        Tous
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={
          filter === "completed"
            ? "bg-blue-500 font-bold text-white"
            : "text-gray-500"
        }
      >
        Terminées
      </button>
      <button
        onClick={() => setFilter("uncompleted")}
        className={
          filter === "uncompleted"
            ? "bg-blue-500 font-bold text-white"
            : "text-gray-500"
        }
      >
        En cours
      </button>
    </div>
  );
};

export default TodoFilter;
