import { GENRES_URL,USER_URL } from "@/global/serverUrl";
import {getAccessToken} from "@auth0/nextjs-auth0";

interface UserData {
    id: string;
    name: string;
    email: string;
    movies: Movie[];
  }

export const getUser = async (userId: string) => {
    try {
      const token = await getAccessToken();
      const response = await fetch(`${USER_URL}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {tags: ["users"]}
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      if(response.ok){
        return await response.json() as UserData[]
      }

    } catch (error) {
      console.error("There was a problem with the request:", error);
    }
  };
  interface Movie {
    id: string;
    title: string;
    year: number;
    language: string;
    description: string;
   image: {
    public_id?: string | undefined;
    secure_url: string;
   }
  }
  interface GenreMovies {
    [genre: string]: Movie[];
  }

  export const fetchAllMoviesByGenres = async (genres: string[], userId: string) => {
    const allMovies: GenreMovies = {};
    try {
      for (const genre of genres) {
        const token = await getAccessToken();
        const response = await fetch(`${GENRES_URL}/${genre}/${userId}`,
          {
            method: "GET", headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            next: {tags: ["movies"]}
          });
        const data = await response.json();
        allMovies[genre] = data.movies;
      }
      return allMovies;
    } catch (error) {
      console.error('Error fetching movies by genres:', error);
      return {};
    }
  };