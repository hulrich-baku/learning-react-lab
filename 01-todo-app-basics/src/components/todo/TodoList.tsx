import { useTodos } from "../../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todoContext = useTodos();

  return (
    <div className="mx-4">
      {todoContext.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
