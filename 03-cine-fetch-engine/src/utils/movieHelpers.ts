const IMAGE_BASE_URL=import.meta.env.VITE_TMDB_IMAGE_BASE_URL

export const getMoviePoster = (path: string | null, size: string = 'w500') => {
    if (!path) {
        // on retourne une image par défaut
        return 'https://via.placeholder.com/500x750?text=No+Image';
    }
    return `${IMAGE_BASE_URL}/${size}${path}`
}