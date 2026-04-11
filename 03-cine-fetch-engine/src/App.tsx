import { useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { Header } from "./components/layout/Header";
import { MovieGrid } from "./components/movies/MovieGrid";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [serachTerm, setSearchTerm] = useState(""); // ce que l'utisateur tape
  const [debouncedTerm, setDebouncedTerm] = useState(""); // ce qui déclenche l'API (retardé)

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(serachTerm);
    }, 1000); // on attend après une seconde de pause

    return () => clearTimeout(timer);
  }, [serachTerm]);

  const { movies, loading, error } = useMovies(debouncedTerm);
  const {toggleTheme, theme} = useTheme();

  return (
    <main className="p-8 bg-slate-100 dark:bg-black min-h-screen transition-colors duration-500">
      {/* L'En-tête */}
      <Header value={serachTerm} onChange={setSearchTerm} theme={theme} toggleTheme={toggleTheme} />

      {/* Grid qui gère l'affichage des films */}
      <MovieGrid movies={movies} loading={loading} error={error} />
    </main>
  );
}

export default App;
