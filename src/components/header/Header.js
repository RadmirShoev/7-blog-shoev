import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const goSingUp = () => {
    navigate('/articles/sign-up');
  };
  const goSingIn = () => {
    navigate('/articles/sign-in');
  };

  return (
    <header className={styles.header}>
      <Link to={'/articles'} className={styles.link}>
        <h6 className={styles['header__title']}>Realworld Blog</h6>
      </Link>
      <button className={styles['header__sing-in']} onClick={goSingIn}>
        Sign In
      </button>
      <button className={styles['header__active']} onClick={goSingUp}>
        Sign Up
      </button>
    </header>
  );
};

export default Header;
