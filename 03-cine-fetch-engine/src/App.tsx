import { useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { Header } from "./components/layout/Header";
import { MovieGrid } from "./components/movies/MovieGrid";

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

  return (
    <main className="p-8 bg-black min-h-screen">
      {/* L'En-tête */}
      <Header value={serachTerm} onChange={setSearchTerm} />

      {/* Grid qui gère l'affichage des films */}
      <MovieGrid movies={movies} loading={loading} error={error} />
    </main>
  );
}

export default App;
