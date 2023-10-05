"use client"
import {useRouter} from 'next/navigation';
import css from './notFound.module.css';
import ButtonComponent from '../button/ButtonComponent';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={css.h2_noFounnd}>
        <h2>This page does not exist</h2>
        <ButtonComponent onClick={() => router.back()} button_hover="button_hover_green" backgroundColor="blackBackground"
                                textSize="largeText" className={css.buttonClasses}>
                                <span className={css.button_span_go_back}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                                    </svg>
                                    Return to the previous page
                                </span>
                            </ButtonComponent>
    </div>
  )
}
export default NotFoundPage
