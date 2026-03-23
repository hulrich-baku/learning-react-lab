import { useTodos } from "../context/TodoContext";
import useInput from "../hooks/useInput";

const TodoForm = () => {
  const inputTodo = useInput("");
  const todoContext = useTodos();

  const submission = () => {
    todoContext.addTodo(inputTodo.value);
    inputTodo.reset();
  };

  return (
    <div>
      <div>
        <input {...inputTodo} name="todoText" />
        <label htmlFor="todoText">Nouvelle tâche</label>
      </div>
      <div>
        <button onClick={submission}>Ajouter</button>
        <button onClick={() => inputTodo.reset()}>Reset</button>
      </div>
    </div>
  );
};

export default TodoForm;
