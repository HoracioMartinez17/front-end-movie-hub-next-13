"use server"
import {revalidateTag,revalidatePath} from "next/cache";
import { GENRES_URL, MOVIES_URL, USER_URL } from "@/global/serverUrl";
import {getAccessToken} from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";


export const createUserApi = async (user: UserProfile | undefined) => {

    try {
      const token = await getAccessToken();
      const response = await fetch(`${USER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });
    if (response.ok) {
        revalidateTag("users")
        const data = await response.json()
        return data
    }else {
      revalidatePath('/')
    }
    }catch (error) {
        console.error('error in post request:', error);
      }
    };


export const deleteUserById = async (userId: string): Promise<Response> => {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${USER_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error deleting movie: ${errorData.message}`);
    }
        revalidateTag("users")
        return response;

  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

interface userUpdate {
  name: string;
  email: string;
}
export const putUpdateUsers = async (userId: string, userUpdate: userUpdate) => {

  try {
    const token = await getAccessToken();
    const response = await fetch(`${USER_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userUpdate),
    });

    if (response.ok) {
        revalidateTag("users")
        return await response.json()
    } else {
      console.error('Error updating movie:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating movie:', error);
  }
};


export const savetMoviesUser = async (userId: string, formData: FormData) => {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${MOVIES_URL}/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
        if(response.ok) {
         revalidateTag("movies")
         return await response.json()
        }

  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};


export const updateMoviesUser = async (movieId: string, formData: FormData) => {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${MOVIES_URL}/${movieId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body:formData
    });
    if(response.ok) {
        revalidateTag("movies")
        return await response.json()
       }
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};
export const deleteMoviesUser = async (movieId: string): Promise<Response> => {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${MOVIES_URL}/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error deleting movie: ${errorData.message}`);
    }
        revalidateTag("movies")
        return response

  } catch (error) {
    console.error('Error posting movie:', error);
    throw error;

  }
}

interface Movie {
    id: string;
    title: string;
    year: number;
    language: string;
    description: string;
    image: FileList | null;
    imageUrl: string,
    imageId: string,
  }
  interface GenreMovies {
    [genre: string]: Movie[];
  }

  export const fetchAllMoviesByGenres = async (genres: string[],  userId: string) => {
    const allMovies: GenreMovies = {};
    try {
      for (const genre of genres) {
        const token =  await getAccessToken();
        const response = await fetch(`${GENRES_URL}/${genre}/${userId}`,
          {
            method: "GET", headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
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

