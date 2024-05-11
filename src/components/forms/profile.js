import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateProfile } from '../../service/service';
import { setSubmit } from '../../store/slices/routeSlice';
import { setErrors } from '../../store/slices/userSlice';

import styles from './forms.module.scss';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const mainPage = useSelector((state) => state.route.mainPage);
  const updateError = useSelector((state) => state.user.errors);

  const emailError = updateError ? updateError.email : null;
  const nameError = updateError ? updateError.username : null;

  useEffect(() => {
    setErrors(false);
    if (mainPage) navigate('/');
  }, [mainPage, dispatch, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const submitForm = (formData) => {
    dispatch(setSubmit(false));
    dispatch(updateProfile(formData));
    reset();
  };

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.title}> Edit Profile </h1>

        <label className={styles['form__label']}>
          <span>Username</span>
          <input
            className={styles['form__input']}
            type="text "
            placeholder="Username"
            {...register('username', {
              require: 'Обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Имя должно включать минимум 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Имя не должно превышать 20 символов',
              },
            })}
            style={(errors.username || nameError) && { outline: '1px solid #F5222D' }}
          />
          {errors.username && <p className={styles.error}> {errors.username.message} </p>}
          {nameError && <p className={styles.error}> {`username ${nameError}`}</p>}
        </label>

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
          {emailError && <p className={styles.error}> {`username ${emailError}`}</p>}
        </label>

        <label className={styles['form__label']}>
          <span>New password</span>
          <input
            className={styles['form__input']}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Обязательно к заполнению',
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
          <span>Avatar image (url)</span>
          <input
            className={styles['form__input']}
            type="text"
            defaultValue={user.image}
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /https?:\/\/(?:www\.)?\S+\.\S+(?:\/[^\s]*)?/gi,
                message: 'url изображения не корректен',
              },
            })}
            style={errors.image && { outline: '1px solid #F5222D' }}
          />
          {errors.image && <p className={styles.error}>{errors.image.message}</p>}
        </label>

        <button className={styles['form__button']}> Save </button>
      </form>
    </div>
  );
}

export default Profile;
