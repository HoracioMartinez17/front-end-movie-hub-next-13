import { useState, ChangeEvent } from "react";

interface MovieCreated {
  id?: string;
  title: string;
  year: number;
  genre:string;
  language: string;
  description: string;
  image: string;
}



export const useForm = (initialObj: MovieCreated = {
  title: "",
  year: 0,
  language: "",
  description: "",
  image: "",
 genre:''
}) => {
  const [form, setForm] = useState(initialObj);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return { form, handleChange };
};

