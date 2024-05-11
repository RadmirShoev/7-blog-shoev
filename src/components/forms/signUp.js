import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setSubmit } from '../../store/slices/routeSlice';
import { signUpUser } from '../../service/service';
import { setErrors } from '../../store/slices/userSlice';

import styles from './forms.module.scss';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const singUpError = useSelector((state) => state.user.errors);
  const emailError = singUpError ? singUpError.email : null;
  const usernameError = singUpError ? singUpError.username : null;
  const mainPage = useSelector((state) => state.route.mainPage);

  useEffect(() => {
    setErrors(false);
    if (mainPage) navigate('/');
  }, [mainPage, dispatch, navigate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ mode: 'onBlur' });

  const submitForm = (formData) => {
    console.log('Нажали отправить форму');
    dispatch(setSubmit(false));
    dispatch(signUpUser(formData));
    reset();
  };

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.title}> Create new account </h1>

        <label className={styles['form__label']}>
          <span>Username</span>
          <input
            className={styles['form__input']}
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Имя должно включать минимум 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Имя не должно превышать 20 символов',
              },
            })}
            style={(errors.username || usernameError) && { outline: '1px solid #F5222D' }}
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          {usernameError && <p className={styles.error}> {`${user.username} ${usernameError}`}</p>}
        </label>

        <label className={styles['form__label']}>
          <span>Email address</span>
          <input
            className={styles['form__input']}
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Введите Email address',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Email address не корректный',
              },
            })}
            style={(errors.email || emailError) && { outline: '1px solid #F5222D' }}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          {emailError && <p className={styles.error}> {`${user.email} ${emailError}`}</p>}
        </label>

        <label className={styles['form__label']}>
          <span>Password</span>
          <input
            className={styles['form__input']}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 6,
                message: 'Пароль должен включать минимум 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Пароль не должен превышать 40 символов',
              },
            })}
            style={errors.password && { outline: '1px solid #F5222D' }}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </label>

        <label className={styles['form__label']}>
          <span>Repeat Password</span>
          <input
            className={styles['form__input']}
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Повторите пароль!',
              validate: (value) => {
                const { password } = getValues();
                return password === value || 'Пароль не совпадает';
              },
            })}
            style={errors.repeatPassword && { outline: '1px solid #F5222D' }}
          />
          {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}
        </label>

        <div className={styles['checkbox-container']}>
          <input
            type="checkbox"
            className={styles['checkbox-container__checkbox']}
            {...register('checkbox', {
              required: 'Подтвердите обработку персональных данных',
            })}
          />
          <span className={styles['checkbox-container__text']}>
            I agree to the processing of my personal information
          </span>
        </div>
        {errors.checkbox && <span className={styles.error}>{errors.checkbox.message}</span>}

        <input type="submit" value="Create" className={styles['form__button']} />

        <span className={styles['form__text']}>
          Already have an account?
          <Link to="/articles/sign-in" className={styles.link}>
            Sign In.
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignUp;
