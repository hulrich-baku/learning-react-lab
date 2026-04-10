import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { useMovies } from "./hooks/useMovies";
import { getMoviePoster } from "./utils/movieHelpers";
import { MovieSkeleton } from "./components/movies/MovieSkeleton";

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

  if (loading) {
    return (
      <main className="p-8 bg-black min-h-sreen">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/** tableau des 10 élements pour afficher le squelette */}
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }
  if (error)
    return <div className="text-red-500 text-center p-20">{error}</div>;

  return (
    <main className="p-8 bg-black min-h-screen">
      <h1 className="text-white mb-6 text-3xl font-bold">Cine Fetch Engine</h1>

      {/**La bare de recherche */}
      <SearchBar value={serachTerm} onChange={setSearchTerm}></SearchBar>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg text-white border">
              <img
                src={getMoviePoster(movie.poster_path)}
                alt={movie.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4">
                <p className="text-xs italic line-clamp-3">{movie.overview}</p>
              </div>
            </div>
            <h2 className="font-semibold truncate mt-2 text-sm text-white">
              {movie.title}
            </h2>
            <p className="text-xs font-bold text-cyan-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
