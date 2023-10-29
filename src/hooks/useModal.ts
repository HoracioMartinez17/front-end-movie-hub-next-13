'use client'
import { useState,useEffect } from 'react';

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
    // Evita que el modal se abra automáticamente al cargar la página
    useEffect(() => {
      if (initialValue) {
        openModal(); // Abre el modal solo si initialValue es verdadero
      }
    }, [initialValue])
  return [isOpen, openModal, closeModal] as const;
};
