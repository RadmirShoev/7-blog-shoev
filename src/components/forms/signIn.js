import React from 'react';
//import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import styles from './forms.module.scss';

function SignIn() {
  return (
    <div className={styles['form-container']}>
      <form className={styles.form}>
        <h1 className={styles.title}> Sign In </h1>
        <label className={styles['form__label']}>
          <span>Email address</span>
          <input className={styles['form__input']} type="email" placeholder="Email address" />
        </label>
        <label className={styles['form__label']}>
          <span>Password</span>
          <input className={styles['form__input']} type="password" placeholder="Password" />
        </label>

        <button className={styles['form__button']}> Create </button>
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
