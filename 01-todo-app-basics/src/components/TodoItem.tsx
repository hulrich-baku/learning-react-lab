import type { Todo } from "../types/todo";
import { useTodos } from "../context/TodoContext";
import { useEffect, useRef, useState } from "react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { deleteTodo, toggleTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  const handleSave = () => {
    updateTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
    if (e.key === "Enter") handleSave();
  };

  return (
    <div className="border radius-lg">
      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p>{todo.text}</p>
      )}
      <p>{new Date(todo.createdAt).toLocaleString()}</p>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
      />{" "}
      <span>{todo.isCompleted ? "Terminé" : "En cours"}</span>
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleSave} className="text-green-500">Sauvegarder</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-500">Modifier</button>
        )}
        <button onClick={() => deleteTodo(todo.id)} className="text-red-500">Supprimer</button>
      </div> 
    </div>
  );
};

export default TodoItem;