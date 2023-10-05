import React from 'react'
import css from './description.module.css'
import { getMoviesByMovieId } from '@/server/user.servers';
import { Metadata } from 'next';

type Props = {
    params: {
        id: string
    }
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const movieId = params.id;
    const movie = await getMoviesByMovieId(movieId)
    return {
        title: `${movie?.title} Page`,
        description: movie?.description,
    }
}

const DescriptionMovie = async({params}: Props) => {
    const movieId = params.id;
    const movie = await getMoviesByMovieId(movieId)
  return (
    <section className={css.container}>
      <div className={css.descriptionContainer}>
      <h2>{movie?.title}</h2>
      <div className={css.img_container}>
      <img className={css.card_img}  src={movie?.image?.secure_url} alt="card img" />
      </div>
          <p className={css.description_parrafo}>{movie?.description}</p>
          <p className={css.description_parrafo_date}>Language:  <span className={css.description_span_date}>{movie?.language}</span></p>
          <p className={css.description_parrafo_date}>Year: <span className={css.description_span_date}>{movie?.year}</span></p>
      </div>
    </section>
  )
}

export default DescriptionMovie