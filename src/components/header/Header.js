import React from 'react';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h6 className={styles['header__title']}>Realworld Blog</h6>
      <button className={styles['header__sing-in']}>Sing In</button>
      <button className={styles['header__active']}>Sing Up</button>
    </header>
  );
};

export default Header;
