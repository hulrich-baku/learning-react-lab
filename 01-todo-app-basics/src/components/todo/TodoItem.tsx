import type { Todo } from "../../types/todo";
import { useTodos } from "../../context/TodoContext";
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
    // Lorsque le mode édition est activé, on focus l'input
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
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
    <div className="border border-blue-600 radius-lg rounded-lg p-4 mb-2">
      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="w-full"
        />
      ) : (
        <p>
          Tâche : <span className="font-bold">{todo.text}</span>
        </p>
      )}
      <p className="text-gray-600 mt-1">
        {new Date(todo.createdAt).toLocaleString()}
      </p>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
      />{" "}
      <span>
        {todo.isCompleted ? (
          <span className="text-green-400">Terminée </span>
        ) : (
          <span className="text-blue-400">En cours</span>
        )}
      </span>
      <div className="flex gap-2 mt-2">
        {isEditing ? (
          <button
            onMouseDown={(e) => {
              e.preventDefault(); // empêcher le blur de l'input
              handleSave();
            }}
            className="text-green-500 font-semibold"
          >
            Sauvegarder
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 font-semibold"
          >
            Modifier
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 font-semibold"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
