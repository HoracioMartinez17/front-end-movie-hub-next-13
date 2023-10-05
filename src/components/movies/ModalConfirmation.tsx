import React from 'react';
import css from './modalConfirmation.module.css';
import { useUserContext } from '@/context/userContext';




interface ModalConfirmationProps {
  movieId: string
  onClose: () => void;
}

export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ onClose, movieId }) => {
  const { movieDelete } = useUserContext();


  const handleDelete = () => {
    try {

      movieDelete(movieId)
      onClose()

    } catch (error) {
      console.error('Error delete movie:', error);
    }
  };

  return (
    <div className={css.modal_container}>
      <div className={css.modal_content}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this movie?</p>
        <div className={css.button_container}>
          <button className={css.cancel_button} onClick={onClose}>Cancel</button>
          <button className={css.confirm_button} onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

