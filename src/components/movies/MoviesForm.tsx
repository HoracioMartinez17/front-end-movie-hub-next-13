import css from './moviesForm.module.css';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Loader } from '../loaders/Loader';
import { AlertMessageSuccess } from '../alertMessageSuccess/AlertMessageSuccess';
import { revalidateTag } from 'next/cache';
import { useUserContext } from '@/context/userContext';


interface MovieCreated {
    id?: string;
    title: string;
    year: number;
    genre: string;
    language: string;
    description: string;
    image: string;
}


export const MoviesForm = () => {
    const { userData, moviesSave } = useUserContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm({
        defaultValues: {
            title: 'Batman',
            year: 1900,
            description: '',
            language: '',
            image: '',
            genre: '',
        },
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (newMovieData: MovieCreated) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('title', newMovieData.title);
            formData.append('year', newMovieData.year.toString());
            formData.append('language', newMovieData.language);
            formData.append('description', newMovieData.description);
            formData.append('genre', newMovieData.genre);
            formData.append('image', newMovieData.image[0]);

          const response = await  moviesSave(userData?.id ?? '', formData);

            if (response.status.toString() === 'success') {
                setIsSuccess(true);
                 revalidateTag("movies")
                setTimeout(() => {
                    setIsSuccess(false);
                }, 4000)
            }
        } catch (error) {
            console.error('Error saving movie:', error);
        }  finally {
            setIsLoading(false);
        }
    };



    return (
        <section className={css.container}>
            {isLoading && <Loader />}
                {isSuccess && <AlertMessageSuccess>
                    Movie create successfully
                </AlertMessageSuccess>}
            <header>ADD Movie</header>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)} >
                <div className={css.input_box}>
                    <label htmlFor='title'>Title</label>
                    <input
                        {...register('title', {
                            required: 'Title is required',
                        })}
                        placeholder='Enter full title'
                        type='text'
                        id='title'
                    />
                    {errors.title && <span className={css.error_input}>{errors.title.message}</span>}
                </div>
                <div className={css.column}>
                    <div className={css.input_box}>
                        <label htmlFor='language'>Language</label>
                        <input
                            {...register('language', {
                                required: 'Language is required',
                            })}
                            placeholder='Enter movie language'
                            type='text'
                            id='language'
                        />
                        {errors.language && <span className={css.error_input}>{errors.language.message}</span>}
                    </div>
                    <div className={css.input_box}>
                        <label htmlFor='year'> Movie Year</label>
                        <input
                            {...register('year', {
                                required: 'Year is required',
                                min: {
                                    value: 1900,
                                    message: 'Year must be at least 1900',
                                },
                                max: {
                                    value: 2023,
                                    message: 'Year must be at most 2023',
                                },
                            })}
                            placeholder='Enter movie year'
                            type='number'
                            min='1900'
                            max='2023'
                            id='year'
                        />
                        {errors.year && <span className={css.error_input}>{errors.year.message}</span>}
                    </div>
                </div>
                <div className={css.gender_box}>
                    <label htmlFor='genre'>Gender</label>
                    <div className={css.gender_option}>
                        <div className={css.gender}>
                            <input {...register("genre", { required: true })} id="check-action" type="radio" value="64e6528e8c0d6c104567dc96" />
                            <label htmlFor="check-action">Action</label>
                        </div>
                        <div className={css.gender}>
                            <input {...register("genre", { required: true })} id="check-horror" type="radio" value="64e65b981c47fa8590a8fb1e" />
                            <label htmlFor="check-horror">Horror</label>
                        </div>
                        <div className={css.gender}>
                            <input {...register("genre", { required: true })} id="check-comedy" type="radio" value="64e65b8f1c47fa8590a8fb1d" />
                            <label htmlFor="check-comedy">Comedy</label>
                        </div>
                    </div>
                    {errors.genre && <span className={css.error_input}>Genre is required</span>}
                </div>
                <div className={`${css.input_box} ${css.description}`} >
                    <label htmlFor='description'>Description</label>
                    <input
                        {...register('description', {
                            required: 'Please enter a description',
                        })}
                        placeholder='Enter movie description'
                        type='text'
                        id='description'
                    />
                    {errors.description && <span className={css.error_input}>{errors.description.message}</span>}
                    <label className={css.label_file} htmlFor='image'>Choose a file:</label>
                    <input className={css.inpdddut}
                        id='image'
                        type='file'
                        accept='image/*'

                        {...register('image', {
                            required: 'Please choose a file',
                        })}

                    />
                    {errors.image && <span className={css.error_input}>{errors.image.message}</span>}
                </div>
                <button type='submit'>ADD Movie</button>
            </form>
        </section>
    );
};
