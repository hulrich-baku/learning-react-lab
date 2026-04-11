import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { microService } from "../api/movieService";

export const useMovies = (searchQuery: string = "") => {
  // 1. Les états
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Reset quand la recherche change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

  // 2. La fonction de récupération
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      if (searchQuery.trim().length > 0) {
        const data = await microService.searchMovies(searchQuery, page);

        // on ajoute les nouveaux resultats si la page change
        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results],
        );

        // vérification des pages restantes
        setHasMore(page < data.total_pages);
      } else {
        const data = await microService.getPopularMovies(page);

        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results],
        );

        setHasMore(page < data.total_pages);
      }
    } catch (error) {
      setError("Impossible de charger les films. Vérifiez votre connexion.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery, page]); // déclenche si la page ou la recherche change

  return { movies, loading, error, hasMore, setPage, refresh: fetchMovies };
};
