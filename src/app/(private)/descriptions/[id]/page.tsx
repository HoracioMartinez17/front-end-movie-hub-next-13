import { getMoviesByMovieId } from '@/server/user.servers';
import { Metadata } from 'next';
import DescriptionsCard from '@/components/descriptions/DescriptionsCard';
import css from './descriptionPage.module.css'
import {Suspense} from "react";
import dynamic from "next/dynamic";
import NotFoundPage from '@/components/page-not-found/NotFound';
import LoadingSkeleton from '@/components/loaders/LoadingSkeleton';
const CharacterList = dynamic(() => import ("@/components/descriptions/DescriptionsCard"))
type Props = {
  params: {
    id: string
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movieId = params.id;
  const movie = await getMoviesByMovieId(movieId)
  return {
    title: `${movie?.title} Page`,
    description: movie?.description,
  }
}

const DescriptionMovie = async ({ params }: Props) => {
  const movieId = params.id;
  const movie = await getMoviesByMovieId(movieId)
  if (movie) {
    return (
      <>
       
        <DescriptionsCard
          title={movie.title}
          year={movie.year}
          language={movie.language}
          description={movie.description}
          imageUrl={movie.imageUrl}
          movieId={movieId}
        />
    
      </>
    );
  } else {
  
    return (<NotFoundPage/>);
  }
};

export default DescriptionMovie