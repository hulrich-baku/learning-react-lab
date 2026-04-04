import { useTodos } from "../../context/TodoContext";

const TodoFilter = () => {
  const { setFilter, filter } = useTodos();

  return (
    <div className="flex my-3 justify-between sticky top-0 bg-blue-100 rounded rounded-2xl">
      <button
        onClick={() => setFilter("all")}
        className={
          filter === "all"
            ? "bg-blue-500 font-bold text-white px-2 py-1 rounded-3xl"
            : "text-gray-500 pl-2"
        }
      >
        Toutes
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={
          filter === "completed"
            ? "bg-blue-500 font-bold text-white px-2 py-1 rounded-3xl"
            : "text-gray-500"
        }
      >
        Terminées
      </button>
      <button
        onClick={() => setFilter("uncompleted")}
        className={
          filter === "uncompleted"
            ? "bg-blue-500 font-bold text-white pl-2 py-1 rounded-3xl pr-2"
            : "text-gray-500 pr-2"
        }
      >
        En cours
      </button>
    </div>
  );
};

export default TodoFilter;
