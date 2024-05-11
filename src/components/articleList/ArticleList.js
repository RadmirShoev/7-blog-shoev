import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Alert, Spin, ConfigProvider } from 'antd';

import { fetchArticles } from '../../service/service';
import { setPage } from '../../store/slices/articlesSlice';
import { goMainPage, setStatus, setLocation } from '../../store/slices/routeSlice';
import Article from '../article/article/Article';

import styles from './ArticleList.module.scss';

function ArticleList() {
  const articles = useSelector((state) => state.articles.articles);
  const page = useSelector((state) => state.articles.page);
  const status = useSelector((state) => state.route.status);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  useEffect(() => {
    dispatch(goMainPage(false));
    dispatch(setLocation('articles-list'));
    dispatch(setStatus('loading'));
    dispatch(fetchArticles(page, token));
  }, [page, dispatch, token]);

  //создаем список превью статей
  const shortArticlesList = articles.map((article) => (
    <li key={article.slug}>
      <Article article={article} />
    </li>
  ));

  const createStatusMessage = (status) => {
    switch (status) {
      case 'loading':
        return <Spin size="large" />;
      case '404':
        return <Alert className={styles.alert} message="Ничего не найдено" type="error" showIcon />;
      case 'error':
        return <Alert className={styles.alert} message="Произошла ошибка" type="error" showIcon />;
      case 'offline':
        return <Alert className={styles.alert} message="Нет интернета" type="error" showIcon />;
      default:
        return null;
    }
  };
  const statusMessage = useMemo(() => {
    return createStatusMessage(status);
  }, [status]);

  const onChangePage = (page) => {
    dispatch(setPage(page));
  };

  return (
    <main className={styles.main}>
      <ul className={styles.list}>
        {statusMessage}
        {shortArticlesList}
      </ul>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fff',
            colorBgContainer: '#1890FF',
            borderRadius: 5,
          },
        }}
      >
        <Pagination
          className={styles.pagination}
          total={articlesCount}
          hideOnSinglePage
          current={page}
          pageSize={5}
          showSizeChanger={false}
          onChange={(page) => onChangePage(page)}
        />
      </ConfigProvider>
    </main>
  );
}

export default ArticleList;
