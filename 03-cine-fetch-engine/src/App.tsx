import { useMovies } from "./hooks/useMovies";
import { getMoviePoster } from "./utils/movieHelpers";

function App() {
  const { movies, loading, error } = useMovies();

  if (loading)
    return <div className="text-white text-center p-20">Chargement...</div>;
  if (error)
    return <div className="text-red-500 text-center p-20">{error}</div>;

  return (
    <main className="p-8 bg-black min-h-screen">
      <h1 className="text-white mb-6 text-3xl font-bold">Popular movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg text-white">
              <img
                src={getMoviePoster(movie.poster_path)}
                alt={movie.title}
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
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
