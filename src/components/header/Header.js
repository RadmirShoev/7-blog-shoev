import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import defaultAvatar from '../../icons/defaultAvatar.png';
import { resetUser, setErrors } from '../../store/slices/userSlice';

import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  const onLogOut = () => {
    localStorage.removeItem('user');
    dispatch(resetUser());
    dispatch(setErrors(null));
    navigate('/');
  };

  const authorizationButton = (
    <div>
      <button className={styles['header__sing-in']} onClick={() => navigate('/articles/sign-in')}>
        Sign In
      </button>
      <button className={styles['header__active']} onClick={() => navigate('/articles/sign-up')}>
        Sign Up
      </button>
    </div>
  );

  const avatar = user.image ? user.image : defaultAvatar;

  const userInfo = (
    <div className={styles['user-container']}>
      <button className={styles['header__active']} onClick={() => navigate('/articles/new-article')}>
        Create article
      </button>
      <Link to="/articles/profile" className={styles.user}>
        <span className={styles.user__name}>{user.username}</span>
        <img className={styles.user__avatar} src={avatar} alt="avatar" />
      </Link>
      <button to="/" className={styles.logOut} onClick={() => onLogOut()}>
        Log Out
      </button>
    </div>
  );

  return (
    <header className={styles.header}>
      <Link to={'/articles'} className={styles.link}>
        <h1 className={styles['header__title']}>Realworld Blog</h1>
      </Link>
      {token ? userInfo : authorizationButton}
    </header>
  );
};

export default Header;
