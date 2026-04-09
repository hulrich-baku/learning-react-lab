import api from "./axios";
import type { TMDBResponse } from "../types/movie";

export const microService = {
  // Récupérer les films populaires
  getPopularMovies: async (page = 1): Promise<TMDBResponse> => {
    const response = await api.get<TMDBResponse>("movie/popular", {
      params: { page },
    });
    return response.data;
  },

  // Chercher des films par mot clé
  searchMovie: async (query: string, page = 1): Promise<TMDBResponse> => {
    const response = await api.get<TMDBResponse>("search/movie", {
      params: { query, page },
    });
    return response.data;
  },
};
