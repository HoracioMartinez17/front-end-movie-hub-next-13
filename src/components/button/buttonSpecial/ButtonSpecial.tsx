import { FC, ReactNode } from 'react';
import './buttonSpecial.css'

interface IconButtonProps {
    onClick?: () => void;
    children: ReactNode;
}

export const ButtonSpecial:FC<IconButtonProps> = ({children, onClick}) => {
  return (
    <button type='button' className="button" data-text="Awesome" onClick={onClick}>
    <span className="actual-text">&nbsp;{children}&nbsp;</span>
    <span aria-hidden="true" className="hover-text">&nbsp;{children}&nbsp;</span>
</button>
  )
}
