import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { microService } from "../api/movieService";

export const useMovies = () => {
  // 1. Les états
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<String | null>(null);

  // 2. La fonction de récupération
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await microService.getPopularMovies();
      setMovies(data.results);
    } catch (error) {
      setError("Impossible de charger les films. Vérifiez votre connexion.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, loading, error, refresh: fetchMovies };
};
