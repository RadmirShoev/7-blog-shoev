import React from 'react';
import { useSelector } from 'react-redux';
import { Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Markdown from 'react-markdown';

import { cutText } from '../../utils/articleUtils';
import defaultAvatar from '../../icons/defaultAvatar.png';

import styles from './Article.module.scss';

const Article = ({ article }) => {
  const title = article.title.length < 1 ? 'NO TITLED ARTICLE' : article.title;
  const avatarImg = article.image.length > 8 ? article.image : defaultAvatar;
  const userName = cutText(article.username);
  const location = useSelector((state) => state.route.location);

  const createTags = (arr) => {
    let allTags = [];
    arr.forEach((elem) => {
      let tag = <Tag key={uuidv4()}>{cutText(elem)}</Tag>;
      allTags.push(tag);
    });
    return allTags;
  };

  const allTags = createTags(article.tags);
  return (
    <div>
      <section className={styles['short-article']}>
        <div className={styles['article-info']}>
          <div className={styles['article-info__header']}>
            <h5 className={styles['article-info__title']}>{title}</h5>
            <button className={styles['button-like']}> {article.likes} </button>
          </div>

          <div className={styles['article-info__tags']}>{allTags}</div>
          <p className={styles['article-info__text']}>{article.description}</p>
        </div>
        <div className={styles['user-info']}>
          <h6 className={styles['user-info__name']}>{userName}</h6>
          <span className={styles['user-info__date']}>{article.date}</span>
          <img className={styles['user-info__img']} alt="user avatar" src={avatarImg} />
        </div>
      </section>
      <section className={styles['full-article']}>
        {location === 'article-page' && <Markdown className={styles.pageText} />}
      </section>
    </div>
  );
};

export default Article;
