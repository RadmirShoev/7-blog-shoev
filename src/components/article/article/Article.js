import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Markdown from 'react-markdown';
import classNames from 'classnames';

import { cutText } from '../../../utils/articleUtils';
import defaultAvatar from '../../../icons/defaultAvatar.png';
import { fetchArticles, fetchLike, deleteArticle } from '../../../service/service';

import styles from './Article.module.scss';

const Article = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const title = article.title.length < 1 ? 'NO TITLED ARTICLE' : article.title;
  const userName = cutText(article.username);
  const page = useSelector((state) => state.articles.page);
  const location = useSelector((state) => state.route.location);
  const fullArticle = `/articles/${article.slug}`;

  const { user } = useSelector((state) => state.user);
  const { token, username } = user;

  const [deleteAgree, setDeleteAgree] = useState(false);
  let [avatarImg, setAvatarImg] = useState(article.image);
  //avatarImg = article.image.length > 8 ? article.image : defaultAvatar;
  useEffect(() => {
    setAvatarImg(article.image);
  }, [article.image]);

  const fullArticleStyle = location === 'articles-list' ? null : styles['full-article'];

  const createTags = (arr) => {
    let allTags = [];
    arr.forEach((elem) => {
      let tag = <Tag key={uuidv4()}>{cutText(elem)}</Tag>;
      allTags.push(tag);
    });
    return allTags;
  };

  const allTags = createTags(article.tags);

  const setLike = async () => {
    if (token) {
      await dispatch(fetchLike(article.slug, article.liked, token));
      dispatch(fetchArticles(page, token));
    }
  };

  const likeStyles = classNames(
    styles['button-like'],
    token && styles['button-like--active'],
    article.liked && styles['button-like--red']
  );

  const onDelete = () => {
    dispatch(deleteArticle(token, id));
    navigate('/');
  };

  // Меню редактировать или удалить статью
  const buttonDelete = classNames(styles.button, styles.delete);
  const buttonEdit = classNames(styles.button, styles.edit);
  const buttonYes = classNames(styles.button, styles.yes);
  const buttonNo = classNames(styles.button, styles.no);

  let articleButtons = null;
  if (location === 'article-page' && article.username === username) {
    articleButtons = (
      <ul className={styles['article-buttons']}>
        <li>
          <button className={buttonDelete} type="button" onClick={() => setDeleteAgree(true)}>
            Delete
          </button>
        </li>
        <li>
          <button type="button" className={buttonEdit} onClick={() => navigate(`/articles/${id}/edit`)}>
            Edit
          </button>
        </li>
      </ul>
    );
  }

  let modalWindow = null;
  if (deleteAgree) {
    modalWindow = (
      <div className={styles['modal-window']}>
        <span className={styles['modal-window__label']}>Are you sure to delete this article?</span>
        <div className={styles['modal-window__buttons']}>
          <button type="button" className={buttonNo} onClick={() => setDeleteAgree(false)}>
            No
          </button>
          <button type="button" className={buttonYes} onClick={() => onDelete()}>
            Yes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className={styles['short-article']}>
        <div className={styles['article-info']}>
          <div className={styles['article-info__header']}>
            <Link to={fullArticle} className={styles.link}>
              <h5 className={styles['article-info__title']}>{title}</h5>
            </Link>
            <button className={likeStyles} onClick={() => setLike()}>
              {article.likes}
            </button>
          </div>

          <div className={styles['article-info__tags']}>{allTags}</div>
          <p className={styles['article-info__text']}>{article.description}</p>
        </div>
        <div className={styles['user-info']}>
          <h6 className={styles['user-info__name']}>{userName}</h6>
          <span className={styles['user-info__date']}>{article.date}</span>
          <img
            className={styles['user-info__img']}
            alt="user avatar"
            src={avatarImg}
            onError={() => setAvatarImg(defaultAvatar)}
          />
          {articleButtons}
        </div>
        {modalWindow}
        <section className={fullArticleStyle}>
          {location === 'article-page' && <Markdown>{article.text}</Markdown>}
        </section>
      </section>
    </div>
  );
};

export default Article;
