import AddHabitForm from "./components/Habit/AddHabitForm";
import HabitList from "./components/Habit/HabitList";
import StateHeader from "./components/StateHeader";
import HabitProvider from "./contexts/habitContext";

function App() {
  return (
    <HabitProvider>
      <main className="min-h-screen bg-slate-50 py-5">
        <div className="max-w-2xl mx-auto">
          <StateHeader />
          <AddHabitForm />
          <HabitList />
        </div>
      </main>
    </HabitProvider>
  );
}

export default App;
