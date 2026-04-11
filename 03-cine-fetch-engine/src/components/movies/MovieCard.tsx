import type { Movie } from "../../types/movie";
import { getMoviePoster } from "../../utils/movieHelpers";

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({movie} : MovieCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg text-white border border-slate-900 dark:border-white">
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
      <h2 className="font-semibold truncate mt-2 text-sm text-slate-800 dark:text-white">
        {movie.title}
      </h2>
      <p className="text-xs font-bold text-cyan-700 dark:text-cyan-500">
        ⭐ {movie.vote_average.toFixed(1)}
      </p>
    </div>
  );
};
