'use client'
import Modal from '../modal/Modal'
import { MoviesFormEdit } from '../movies/MoviesFormEdit'
import { ModalConfirmation } from '../movies/ModalConfirmation'
import css from './description.module.css'
import { useModal } from '@/hooks/useModal'
import { useRouter } from 'next/navigation';
import ButtonComponent from '../button/ButtonComponent'
import Link from 'next/link';
import React from 'react'
const { NEXT_PUBLIC_API_URL } = process.env;

interface Movie {
    movieId?: string;
    title: string;
    year: number;
    language: string;
    description: string;
    image?: FileList | null;
    imageId?: string;
    imageUrl: string;
}

const DescriptionsCard: React.FC<Movie> = async ({ ...props }:Movie) => {
    const [isOpenModalDelete, openModalDelte, closeModalDelete] = useModal(false)
    const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false)
    const router = useRouter();
    return (
        <>
            <Modal isOpen={isOpenModalEdit} closeModal={closeModalEdit}>
                <MoviesFormEdit movieId={props.movieId ?? ''} onClose={closeModalEdit}/>
            </Modal>
            <Modal isOpen={isOpenModalDelete} closeModal={closeModalDelete}>
                <ModalConfirmation movieId={props.movieId ?? ''} onClose={closeModalDelete} />
            </Modal>
            <section className={css.container}>
                <div className={css.descriptionContainer}>
                    <div className={css.img_container}>
                        <img className={css.card_img} src={props.imageUrl} alt="card img" />
                    </div>
                    <div className={css.information_container}>
                        <h2 className={css.title}>{props.title}</h2>
                        <p className={css.description_parrafo_date}>Language:
                            <span className={css.description_span_date}>
                                {props.language}</span></p>
                        <p className={css.description_parrafo_date}>Year:
                            <span className={css.description_span_date}>
                                {props.year}</span></p>
                        <p className={css.description_parrafo_date_description}>Description:<span className={css.description_parrafo}>
                            {props.description}</span></p>
                        <div className={css.button_divCard}>
                            <ButtonComponent onClick={() => router.back()} button_hover="button_hover_green" backgroundColor="blackBackground"
                                textSize="largeText" className={css.buttonClasses}>
                                <Link className={css.button_span_go_back}
                                    href={`${NEXT_PUBLIC_API_URL}descriptions/${props.movieId}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                                    </svg>
                                    Go back
                                </Link>
                            </ButtonComponent>
                            <ButtonComponent onClick={openModalEdit} button_hover="button_hover_green" backgroundColor="greenBackground"
                                textSize="largeText" className={css.buttonClasses}>
                                <span className={css.button_span_addMovie}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                    Edit
                                </span>
                            </ButtonComponent>
                            <ButtonComponent onClick={openModalDelte} button_hover="button_hover_red" backgroundColor="blackBackground"
                                textSize="largeText" className={css.buttonClasses}>
                                <span className={css.button_span_deleteMovie}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                    Delete
                                </span>
                            </ButtonComponent>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DescriptionsCard