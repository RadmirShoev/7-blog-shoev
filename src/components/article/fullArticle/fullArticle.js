import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOneArticle } from '../../../service/service';
import { setLocation, setStatus } from '../../../store/slices/routeSlice';
import { Article } from '../article';

import styles from './fullArticle.module.scss';

function FullArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.user.user);

  const { articles } = useSelector((state) => state.articles);
  const article = articles.find((item) => item.slug === id);

  useEffect(() => {
    dispatch(setLocation('article-page'));
    dispatch(setStatus('loading'));
    dispatch(fetchOneArticle(id, token));
  }, [dispatch, id]);

  const showArticle = article && Object.keys(article).length !== 0;

  return <div className={styles.main}>{showArticle && <Article article={article} />}</div>;
}

export default FullArticle;
