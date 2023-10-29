import React from 'react';
import css from './card.module.css';
import ButtonComponent from '../button/ButtonComponent';
import Link from "next/link";
import Image from 'next/image'
import { Suspense } from 'react'
import { DESCRIPTION_URL } from '@/global/serverUrl';

interface MovieCar {
  movieId: string;
  title: string;
  image: FileList | null;
  imageId?: string;
  imageUrl: string;

}




export const Card  = ({ ...props}: MovieCar) => {
  return (
    <>
    <Suspense fallback={<p>Loading feed...</p>}>
      <div className={css.card}>
        <Image className={css.card_img} src={props.imageUrl} alt="card img"
        // placeholder="blur"
        // blurDataURL={image?.secure_url}
        width={500}
        height={500}
        priority/>
        <div className={css.descriptions}>
          <h2>{props.title}</h2>
          <div className={css.button_divCard}>
            <ButtonComponent button_hover="button_hover_green" backgroundColor="greenBackground"
              textSize="largeText" className={css.buttonClasses}>
              <Link className={css.button_moreInformation}
                href={`${DESCRIPTION_URL}/${props.movieId}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                More information
              </Link>
            </ButtonComponent>
          </div>
        </div>
      </div>
      </Suspense>
    </>


  );
};
