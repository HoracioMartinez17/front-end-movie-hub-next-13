import { useForm } from 'react-hook-form'
import css from './userForms.module.css'
import { useUserContext } from '../../context/userContext';
import Loader from '../loaders/Loader';
import { AlertMessageSuccess } from '../alertMessageSuccess/AlertMessageSuccess';
import { useState } from 'react';



interface userUpdate {
    name: string;
    email: string;
}
interface MoviesFormEditProps {
  onClose: () => void;
}

export const UserForms:React.FC<MoviesFormEditProps>  = ({onClose}) => {
    const { updateUsersData, userData } = useUserContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<userUpdate>({
        defaultValues: {
            name: userData?.name,
            email: userData?.email
        }
    });
    const { register, handleSubmit, formState:{errors} } = form;


    const onSubmit = async (userUpdate: userUpdate) => {
      try {
        setIsLoading(true);
        const response = await updateUsersData(userData?.id ?? '', userUpdate);
         if (response.status.toString() === 'success') {
          setIsSuccess(true);
          setTimeout(() => {
              onClose()
              setIsSuccess(false);
          }, 2000)
      }

      } catch (error) {
        console.error(error);
      }finally {
        setIsLoading(false);
    }
    }

    return (
      <>
        {isLoading && <Loader />}
                {isSuccess && <AlertMessageSuccess>
                  Successful data editing!
                </AlertMessageSuccess>}
        <form className={css.form_user} onSubmit={handleSubmit(onSubmit)}>
            <div className={css.flex}>
            <div className={`${css.login} ${css.color}`}>EDIT USER</div>
            <label className={css.color}>Username :</label>
          <input type="text" className={css.input} placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
            {errors.name && <p className={css.error_input}>{errors.name.message}</p>}
            <label className={css.color}>Email :</label>
          <input type="text" className={css.input} placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email must be a valid email address",
              },
            })}
          />
          {errors.email && <p className={css.error_input}>{errors.email.message}</p>}
          <button type="submit" className={css.button_userForm}>EDIT</button>

            </div>
        </form>
      </>
      );
        }
