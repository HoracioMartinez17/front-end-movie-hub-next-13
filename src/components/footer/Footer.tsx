import Link from 'next/link';
import css from './footer.module.css';


export const Footer = () => {
    return (
        <footer className={`${css.footer} ${css.container}`}>
            <h3> Cine Max</h3>
            <ul>
                <li>
                <Link className={css.socials} href= './' >Instagram</Link>
                <Link className={css.socials} href= './' >Github</Link>
                <Link className={css.socials} href= './' >Linkedin</Link>
                </li>
            </ul>
            <p>© 2021 Cine Max</p>
        </footer>
    )
}
