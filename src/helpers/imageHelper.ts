const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const getImageUrl = (path: string | null | undefined, size: string = 'original') => {
    if (!path) return '';
    return `${IMAGE_BASE_URL}${size}${path}`
}

