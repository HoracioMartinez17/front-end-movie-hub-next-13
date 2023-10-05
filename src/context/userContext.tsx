'use client'
import { createUserApi, deleteMoviesUser, deleteUserById, fetchAllMoviesByGenres, putUpdateUsers, savetMoviesUser, updateMoviesUser } from '@/actions/users.action';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { UserProfile } from "@auth0/nextjs-auth0/client"



interface UserData {
  id: string;
  name: string;
  email: string;
  movies: Movie[];
}
interface userUpdate {
  name: string;
  email: string
}

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


interface allMoviesByGenres {
  allMovies: {
    [genre: string]: Movie[]
  };
}
interface UserContextType {
  userData: UserData | undefined
  updateUser: userUpdate | null
  allMovies: allMoviesByGenres | null
  movies: Response | null
  movieUpdate: Response | null
  moviesDelete: Response | null
  userCreate: (user: UserProfile | undefined) =>  void;
  updateUsersData: (userId: string, userUpdate: userUpdate) =>  Promise<Response>
  deleteUsersData: (userId: string) =>  Promise<Response>;
  moviesSave: (userId: string, newMovieData: FormData) =>  Promise<Response>
  moviesUpdate: (movieId: string, movieUpdate: FormData) =>  Promise<Response>
  movieDelete: (movieId: string) =>  Promise<Response>
  fetchUserMoviesByGenres: (genres: string[], userId: string) =>  void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProviderApi: FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [allMovies, setAllMovies] = useState<allMoviesByGenres | null>(null);
  const [movies, setNewMovies] = useState<Response | null>(null);
  const [updateUser, setupdateUser] = useState<userUpdate | null>(null);
  const [movieUpdate, setMovieUpdate] = useState<Response | null>(null);
  const [moviesDelete, setMovieDelete] = useState<Response | null>(null);


  const userCreate = async (user: UserProfile | undefined) => {
    try {
      if (user) {
      const userResponse = await createUserApi(user);
      console.log(userResponse)
      setUserData(userResponse.user)
      }
    }catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }

  };

 

  const fetchUserMoviesByGenres = async (genres: string[], userId: string) => {
    try {

      const moviesByGenre = await fetchAllMoviesByGenres(genres, userId);

      console.log(moviesByGenre)
      setAllMovies({ allMovies: moviesByGenre });
    } catch (error) {
      console.error('Error fetching movies by genres:', error);
      throw error
    }
  };

  const moviesSave = async (userId: string, newMovieData: FormData): Promise<Response> => {
    try {
      const newMovieCreated = await savetMoviesUser(userId, newMovieData);
      setNewMovies(newMovieCreated);
      return newMovieCreated
    } catch (error) {
      console.error('Error saving movie:', error);
      throw error;
    }
  }

  const moviesUpdate = async (movieId: string, updateMovieData: FormData): Promise<Response> => {
    try {

      const newMovieUpdate = await updateMoviesUser(movieId, updateMovieData);
      setMovieUpdate(newMovieUpdate);
      return newMovieUpdate
    } catch (error) {
      console.error('Error delete user:', error);
      throw error;
    }
  }
  const movieDelete = async (movieId: string): Promise<Response> => {
    try {
      const response = await deleteMoviesUser(movieId);
      setMovieDelete(response);
      return response

    } catch (error) {
      console.error('Error delete movie:', error);
      throw error
    }
  };

  const updateUsersData = async (userId: string, userUpdate: userUpdate): Promise<Response> => {
    try {

      const response = await putUpdateUsers(userId, userUpdate);
      setupdateUser(response);
      return response
    } catch (error) {
      console.error('Error updating user:', error);
      throw error
    }
  }
  const deleteUsersData = async (userId: string): Promise<Response> => {
    try {
      const response = await deleteUserById(userId);
      return response
    } catch (error) {
      console.error('Error delete user:', error);
      throw error;
    }
  }

  return (
    <UserContext.Provider value={{
      allMovies, userData, movies, movieUpdate, moviesDelete, userCreate,
      fetchUserMoviesByGenres, updateUser, moviesSave, moviesUpdate, movieDelete, updateUsersData,
      deleteUsersData
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser usado dentro de un UserProviderApi');
  }
  return context;
};

