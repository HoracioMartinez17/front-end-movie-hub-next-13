import { USER_URL,MOVIES_URL } from "@/global/serverUrl";
import {getAccessToken} from "@auth0/nextjs-auth0";



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
        const data = await response.json()
        return data
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
    genre?: string;
    description: string;
    image: {
      public_id?: string | undefined;
      secure_url: string;
    }
  
  }
export const getMoviesByMovieId = async (movieId: string) => {
    try {
      const token = await getAccessToken();
      const response = await fetch(`${MOVIES_URL}/${movieId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const {movie} = await response.json()
        return movie as Movie

    } catch (error) {
      console.error("There was a problem with the request:", error);
    }
  };
