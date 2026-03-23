import { createContext, useContext, useEffect, useState } from "react";
import type { Todo } from "../types/todo";

type FilterType = "all" | "completed" | "uncompleted";

interface TodoContextType {
  todos: Todo[];
  filter: FilterType;
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, newtext: string) => void;
  setFilter: (filterType: FilterType) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const jsonTodos = localStorage.getItem("todos");
    try {
      return jsonTodos ? JSON.parse(jsonTodos) : [];
    } catch {
      // JSON inavlide
      return [];
    }
  });
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "completed":
        return todo.isCompleted;
      case "uncompleted":
        return !todo.isCompleted;
      default:
        return true;
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (!text.trim()) return; // chaîne vide

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      isCompleted: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const updateTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText ? newText : todo.text }
          : todo,
      ),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        toggleTodo,
        addTodo,
        deleteTodo,
        setFilter,
        updateTodo,
        filter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos doit être utilisé dans TodoProvider");

  return context;
};
