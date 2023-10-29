import Link from 'next/link';
import css from './footer.module.css';


export const Footer = () => {
    return (
        <footer className={`${css.footer} ${css.container}`}>
            <h3> Cine Max</h3>
            <ul>
                <li>
                <Link className={css.socials} href= 'instagram.com' >Instagram</Link>
                <Link className={css.socials} href= 'https://github.com/HoracioMartinez17' >Github</Link>
                <Link className={css.socials} href= 'https://www.linkedin.com/in/horacio-jose-martinez-971887269/' >Linkedin</Link>
                </li>
            </ul>
            <p>© 2021 Cine Max</p>
        </footer>
    )
}
