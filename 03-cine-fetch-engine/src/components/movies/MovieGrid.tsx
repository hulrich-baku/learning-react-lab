import type { Movie } from "../../types/movie";
import { MovieCard } from "./MovieCard";
import { MovieSkeleton } from "./MovieSkeleton";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const MovieGrid = ({ movies, loading, error }: MovieGridProps) => {
  // 1. Etat : chargement initial
  if (loading && movies.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    );
  }

  // 2. Etat : erreur
  if (error) {
    return (
      <div className="text-center p-20">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  // 3. État : Aucun résultat
  if (movies.length === 0 && !loading) {
    return (
      <div className="text-center p-20 text-slate-500">
        Aucun film trouvé pour votre recherche.
      </div>
    );
  }

  // 3. Etat : succès
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 transition-opacity duration-300 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
