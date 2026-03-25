export const getImageUrl = (path: string | null | undefined, size: string = 'original') => {
    if (!path) return '';
    const isDev = import.meta.env.DEV;
    if (isDev) return `https://image.tmdb.org/t/p/${size}${path}`;
    return `/api/image/${size}${path}`;
}

