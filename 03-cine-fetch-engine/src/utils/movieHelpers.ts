import no_poster from '../assets/no_poster.png'
const IMAGE_BASE_URL=import.meta.env.VITE_TMDB_IMAGE_BASE_URL

export const getMoviePoster = (path: string | null, size: string = 'w500') => {
    if (!path || !IMAGE_BASE_URL) {
        // on retourne une image par défaut
        return no_poster;
    }
    return `${IMAGE_BASE_URL}/${size}${path}`
}