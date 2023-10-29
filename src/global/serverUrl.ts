const { NEXT_PUBLIC_API_URL } = process.env;

export const USER_URL = NEXT_PUBLIC_API_URL + 'user';
export const MOVIES_URL = NEXT_PUBLIC_API_URL + 'movies';
export const GENRES_URL = NEXT_PUBLIC_API_URL + 'genres';
export const DESCRIPTION_URL = process.env.NEXT_PUBLIC_API_URL_DINAMIC + 'descriptions';

