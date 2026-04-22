import { useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { Header } from "./components/layout/Header";
import { MovieGrid } from "./components/movies/MovieGrid";
import { useTheme } from "./hooks/useTheme";
import type { Movie } from "./types/movie";
import { MovieModal } from "./components/movies/MovieModal";

function App() {
  const [serachTerm, setSearchTerm] = useState(""); // ce que l'utisateur tape
  const [debouncedTerm, setDebouncedTerm] = useState(""); // ce qui déclenche l'API (retardé)

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const closeModal = () => setSelectedMovie(null);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(serachTerm);
    }, 1000); // on attend après une seconde de pause

    return () => clearTimeout(timer);
  }, [serachTerm]);

  const { movies, loading, error, setPage, hasMore, refresh } =
    useMovies(debouncedTerm);
  const { toggleTheme, theme } = useTheme();

  return (
    <main className="p-8 bg-slate-100 dark:bg-black min-h-screen transition-colors duration-500">
      {/* L'En-tête */}
      <Header
        value={serachTerm}
        onChange={setSearchTerm}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Grid qui gère l'affichage des films */}
      <MovieGrid
        onMovieClick={setSelectedMovie}
        movies={movies}
        loading={loading}
        error={error}
        refresh={refresh}
      />

      {/* Affichage conditionnel de la Modale */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Bouton de page suivante */}
      {hasMore && !loading && movies.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="w-full py-2 sm:w-1/3 md:w-1/4 text-slate-100 bg-slate-800 dark:bg-slate-900 rounded-full hover:bg-slate-700 dark:hover:bg-slate-800 border border-black dark:border-slate-300 shadow-md shadow-black/90 dark:shadow-slate-600 transition-colors duration-500"
          >
            Charger plus de films
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
