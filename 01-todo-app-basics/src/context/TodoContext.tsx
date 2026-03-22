import { createContext, useContext, useEffect, useState } from "react";
import type { Todo } from "../types/todo";

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export default function TodoProvider({children}: {children: React.ReactNode}) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const jsonTodos = localStorage.getItem("todos");
    try {
      return jsonTodos ? JSON.parse(jsonTodos) : [];
    } catch {
      // JSON inavlide
      return [];
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

  return (
    <TodoContext.Provider value={{ todos, toggleTodo, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos doit être utilisé dans TodoProvider");

  return context;
};