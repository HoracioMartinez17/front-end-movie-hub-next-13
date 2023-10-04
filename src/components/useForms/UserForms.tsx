import { useForm } from 'react-hook-form'
import css from './userForms.module.css'
import { useUserContext } from '../../context/userContext';



interface userUpdate {
    name: string;
    email: string;
}

export const UserForms = () => {
    const { updateUsersData, userData } = useUserContext();

    const form = useForm<userUpdate>({
        defaultValues: {
            name: userData?.name,
            email: userData?.email
        }
    });
    const { register, handleSubmit, formState:{errors} } = form;


    const onSubmit = async (userUpdate: userUpdate) => {
      try {
         updateUsersData(userData?.id ?? '', userUpdate);

      } catch (error) {
        console.log(error);
      }
    }

    return (
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
      );
        }
