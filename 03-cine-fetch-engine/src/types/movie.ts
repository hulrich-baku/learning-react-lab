export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null; // chemin d'arrière plan (image de fond)
  poster_path: string | null; // affiche du film
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}
