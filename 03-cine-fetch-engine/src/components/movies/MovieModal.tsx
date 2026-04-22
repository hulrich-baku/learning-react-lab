import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import { getMoviePoster } from "../../utils/movieHelpers";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  // Bloquer le scroll du body quand la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose} // Ferme si on clique sur le fond flou
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()} // 👈 Crucial : empêche la fermeture au clic sur le contenu
      >
        {/* Bouton Fermer Mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full z-10 md:hidden"
        >
          ✕
        </button>

        {/* Poster */}
        <div className="w-full md:w-2/5 h-64 md:h-auto">
          <img
            src={getMoviePoster(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Détails avec Scroll interne */}
        <div className="p-6 md:p-10 md:w-3/5 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white">
              {movie.title}
            </h2>
            <button
              onClick={onClose}
              className="hidden md:block text-slate-400 hover:text-slate-600 dark:hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-3 mb-6">
            <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 text-sm font-semibold rounded-full">
              {movie.release_date.split("-")[0]}
            </span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 text-sm font-semibold rounded-full">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
            {movie.overview || "Aucun synopsis disponible pour ce film."}
          </p>
        </div>
      </div>
    </div>
  );
};
