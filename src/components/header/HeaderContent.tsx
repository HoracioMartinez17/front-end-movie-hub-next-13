'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import css from './header.module.css'
import Link from 'next/link'
import { useModal } from '@/hooks/useModal'
import Modal from '../modal/Modal'
import { ButtonSpecial } from '../button/buttonSpecial/ButtonSpecial'
import { DropdownMenu } from '../dropdownMenu/DropdownMenu'
import { MoviesForm } from '../movies/MoviesForm';
import { UserForms } from '../useForms/UserForms';
import { UserFormDelete } from '../useForms/UserFormDelete';
import { useUserContext } from '@/context/userContext';
import Loader from '../loaders/Loader';



const HeaderContent = () => {
    const [isOpenModal1, openModal1, closeModal1] = useModal(false)
    const [isOpenModal3, openModal3, closeModal3] = useModal(false)
    const [isOpenModal4, openModal4, closeModal4] = useModal(false)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
     const { userCreate,userData,updateUser } = useUserContext();
    const { user, error, isLoading } = useUser();
    useEffect(() => {
      userCreate(user);
    }, [user,updateUser]);

    if (isLoading) return <Loader/>;
    if (error) return <div>{error.message}</div>;
  
  
    const handleProfileHover = () => {
      setIsDropdownVisible(true);
    };
  
    const handleProfileLeave = () => {
      setIsDropdownVisible(false);
    };
  return (
    <>
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        <MoviesForm  onClose={closeModal1}/>
      </Modal>
      <Modal isOpen={isOpenModal3} closeModal={closeModal3}>
        <UserForms onClose={closeModal3}/>
      </Modal>
      <Modal isOpen={isOpenModal4} closeModal={closeModal4}>
        <UserFormDelete onClose={closeModal4} />
      </Modal>
      <header className={css.header}>
        <div className={`${css.menu} ${css.container}`}>
          <Link className={css.logo} href='/' >Cine Max</Link>
          <input type="checkbox" id={css.menu} />
          <label htmlFor={css.menu}>
            <img className={css.menu_icon} src='assets/menu.png' alt="menu" />
          </label>
          <nav className={`${css.navbar} ${css.container}`}>
            <ul className={css.navList}>
              <li className={css.navItem}>
                <ButtonSpecial onClick={openModal1}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                    ></path>
                  </svg>
                  add movies
                </ButtonSpecial>
              </li>
              <li
                className={css.navItem}
                onMouseEnter={handleProfileHover} // Mostrar el menú cuando se hace hover
                onMouseLeave={handleProfileLeave} // Ocultar el menú cuando se deja de hacer hover
              >
                <span className={css.navItem_span}><svg className={css.svg_profile} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>{userData?.name}</span>
                <ul className={`${css.ul_second} ${isDropdownVisible ? css.visible : ''}`}>
                  {isDropdownVisible && <DropdownMenu isDropdownVisible={isDropdownVisible}
                   openModal3={openModal3}  openModal4={openModal4} />}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className={`${css.header_content} ${css.container}`}>
          <div className={css.header1}>
            <img src='assets/venom.png' alt="Venom imagen" />
          </div>
          <div className={css.header2}>
            <h1>The best <hr /> Movies </h1>
            {/* <img src={play} alt="btn_play" /> */}
          </div>
        </div>
      </header>
    </>

  )
}

export default HeaderContent
