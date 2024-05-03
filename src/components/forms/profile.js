import React from 'react';
//import { useForm } from 'react-hook-form';

import styles from './forms.module.scss';

function Profile() {
  return (
    <div className={styles['form-container']}>
      <form className={styles.form}>
        <h1 className={styles.title}> Edit Profile </h1>
        <label className={styles['form__label']}>
          <span>Username</span>
          <input className={styles['form__input']} type="text " placeholder="Username" />
        </label>
        <label className={styles['form__label']}>
          <span>Email address</span>
          <input className={styles['form__input']} type="email" placeholder="Email address" />
        </label>
        <label className={styles['form__label']}>
          <span>New password</span>
          <input className={styles['form__input']} type="password" placeholder="New password" />
        </label>
        <label className={styles['form__label']}>
          <span>Avatar image (url)</span>
          <input className={styles['form__input']} type="password" placeholder="Avatar image" />
        </label>
        <button className={styles['form__button']}> Save </button>
      </form>
    </div>
  );
}

export default Profile;
