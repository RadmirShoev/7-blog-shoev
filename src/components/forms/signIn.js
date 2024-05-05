import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { signInUser } from '../../service/service';
//import { setSubmit } from '../../store/slices/routeSlice';

import styles from './forms.module.scss';

function SignIn() {
  //const { dispatch } = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const submitForm = (formData) => {
    console.log('Нажали кнопку формы');
    //dispatch(setSubmit(false));
    //dispatch(signInUser(formData));
    signInUser(formData);
    reset();
  };

  const signInError = useSelector((state) => state.user.errors);

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.title}> Sign In </h1>
        <label className={styles['form__label']}>
          <span>Email address</span>
          <input
            className={styles['form__input']}
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Обязательно к заполнению',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Email address не корректный',
              },
            })}
            style={errors.email && { outline: '1px solid #F5222D' }}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </label>
        <label className={styles['form__label']}>
          <span>Password</span>
          <input
            className={styles['form__input']}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Обязательно к заполнению',
            })}
            style={errors.password && { outline: '1px solid #F5222D' }}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          {signInError && (
            <p
              className={styles.error}
            >{`${Object.entries(signInError)[0][0]} ${Object.entries(signInError)[0][1]}`}</p>
          )}
        </label>

        <button className={styles['form__button']}> Login </button>
        <span className={styles['form__text']}>
          Don’t have an account?
          <Link to="/articles/sign-up" className={styles.link}>
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignIn;
