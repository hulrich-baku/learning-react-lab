import Header from "./components/Header";
import TodoFilter from "./components/TodoFilter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

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
