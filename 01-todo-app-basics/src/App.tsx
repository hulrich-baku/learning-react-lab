import Header from "./components/Header";
import TodoFilter from "./components/todo/TodoFilter";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";

function App() {
  return (
    <>
      <Header />
      <TodoForm />
      <TodoFilter />
      <TodoList />
    </>
  );
}

export default App;
