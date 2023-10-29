'use client'
import React from 'react'
import { useEffect } from 'react';
import { Card } from '../card/Card'
import css from './main.module.css'
import { useUserContext } from '@/context/userContext'




const MoviesListContainer = () => {
	const { userData, allMovies, movieUpdate, moviesDelete, movies, fetchUserMoviesByGenres } = useUserContext();
	const { horror, action, comedy } = allMovies?.allMovies || {};

	useEffect(() => {
		if (userData) {
			fetchUserMoviesByGenres(['horror', 'action', 'comedy'], userData.id);
		}

	}, [userData, movieUpdate, moviesDelete, movies]);
	return (
		<main>
			<section className={`${css.movies} ${css.container}`}>
				<h2 className={css.titleMovies}>Horror Movies</h2>
				<hr className={css.hrMovies} />

				<div className={css.boxContainer_1}>
					{horror?.map((movie) => (
						<div key={movie.id} className={css.box1}>
							<Card movieId={movie.id} title={movie.title} imageUrl={movie.imageUrl} image={movie.image} />
						</div>
					))}
					{horror?.length === 0 && (
						<div className={css.box1}>
							<p className={css.p_movie_empty}>You don't have any horror movies created😞</p>
						</div>
					)}
				</div>


				<button type="button" className={css.loadMore} id={css.loadMore1}> Load more</button>

			</section>
			<section className={`${css.movies} ${css.container}`}>
				<h2 className={css.titleMovies}>Action Movies</h2>
				<hr className={css.hrMovies} />
				<div className={css.boxContainer_2}>
					{action?.map((movie) => (
						<div key={movie.id} className={css.box2}>
							<Card movieId={movie.id} title={movie.title}
								imageUrl={movie.imageUrl}
								image={movie.image} />
						</div>
					))}
					{action?.length === 0 && (
						<div className={css.box2}>
							<p className={css.p_movie_empty}>You don't have any action movies created😞</p>
						</div>
					)}
				</div>
				<button type="button" className={css.loadMore} id={css.loadMore2}> Load more</button>

			</section>
			<section className={`${css.movies} ${css.container}`}>
				<h2 className={css.titleMovies}> Comedy Movies</h2>
				<hr className={css.hrMovies} />
				<div className={css.boxContainer_3}>
					{comedy?.map((movie) => (
						<div key={movie.id} className={css.box3}>
							<Card movieId={movie.id} title={movie.title}
								imageUrl={movie.imageUrl}
								image={movie.image} />
						</div>
					))}
					{comedy?.length === 0 && (
						<div className={css.box3}>
							<p className={css.p_movie_empty}>You don't have any comedy movies created😞</p>
						</div>
					)}
				</div>
				<button type="button" className={css.loadMore} id={css.loadMore3}> Load more</button>

			</section>
		</main>
	)
}

export default MoviesListContainer