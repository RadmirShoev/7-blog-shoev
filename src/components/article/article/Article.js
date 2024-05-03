import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Markdown from 'react-markdown';
//import classNames from 'classnames';

import { cutText } from '../../../utils/articleUtils';
import defaultAvatar from '../../../icons/defaultAvatar.png';
import { setRoutePath } from '../../../store/slices/routeSlice';

import styles from './Article.module.scss';

const Article = ({ article }) => {
  const dispatch = useDispatch();
  const title = article.title.length < 1 ? 'NO TITLED ARTICLE' : article.title;
  const avatarImg = article.image.length > 8 ? article.image : defaultAvatar;
  const userName = cutText(article.username);
  const location = useSelector((state) => state.route.location);
  const fullArticle = `/articles/${article.slug}`;
  //const { id } = useParams();

  const fullArticleStyle = location === 'articles-list' ? null : styles['full-article'];

  const createTags = (arr) => {
    let allTags = [];
    arr.forEach((elem) => {
      let tag = <Tag key={uuidv4()}>{cutText(elem)}</Tag>;
      allTags.push(tag);
    });
    return allTags;
  };

  useEffect(() => {
    if (location === 'full-article') dispatch(setRoutePath(''));
  }, []);

  const allTags = createTags(article.tags);

  return (
    <div>
      <section className={styles['short-article']}>
        <div className={styles['article-info']}>
          <div className={styles['article-info__header']}>
            <Link to={fullArticle} className={styles.link}>
              <h5 className={styles['article-info__title']}>{title}</h5>
            </Link>
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
        <section className={fullArticleStyle}>
          {location === 'article-page' && <Markdown>{article.text}</Markdown>}
        </section>
      </section>
    </div>
  );
};

export default Article;
