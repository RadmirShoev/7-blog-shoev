import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './forms.module.scss';

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const submitForm = (data) => {
    console.log(data);
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
              require: 'Введите новое имя пользователя',
              minLength: {
                value: 3,
                message: 'Имя должно включать минимум 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Имя не должно превышать 20 символов',
              },
            })}
            style={errors.username && { outline: '1px solid #F5222D' }}
          />
          {errors.username && <p className={styles.error}> {errors.username.message} </p>}
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
            style={errors.email && { outline: '1px solid #F5222D' }}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </label>

        <label className={styles['form__label']}>
          <span>New password</span>
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
          <span>Avatar image (url)</span>
          <input
            className={styles['form__input']}
            type="text"
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
