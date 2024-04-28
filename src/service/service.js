import { format } from 'date-fns';

import { addArticles, addArticlesCount, addArticle } from '../store/slices/articlesSlice';
import { setStatus } from '../store/slices/routeSlice';

const baseUrl = 'https://blog.kata.academy/api';

const createHeaders = (key) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${key}`,
});

const getArticlesData = (arr) =>
  arr.map((elem) => {
    return {
      title: elem.title,
      text: elem.body,
      description: elem.description,
      slug: elem.slug,
      likes: elem.favoritesCount,
      tags: elem.tagList,
      favorited: elem.favorited,
      username: elem.author.username,
      date: format(new Date(elem.updatedAt), 'MMMM d, yyyy'),
      image: elem.author.image,
    };
  });

export const fetchArticles =
  (page, limit, key = '') =>
  async (dispatch) => {
    const fetchUrl = `${baseUrl}/articles?&limit=${limit}&offset=${(page - 1) * limit}`;
    try {
      const responce = await fetch(fetchUrl, { headers: createHeaders(key) });
      const data = await responce.json();

      dispatch(addArticles(getArticlesData(data.articles)));
      dispatch(addArticlesCount(data.articlesCount));
      dispatch(setStatus('ok'));
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        dispatch(setStatus('404'));
      } else {
        dispatch(setStatus('error'));
      }
    }
  };

export const fetchOneArticle =
  (slug, key = '') =>
  async (dispatch) => {
    const fetchUrl = `${baseUrl}/articles/${slug}`;
    try {
      const responce = await fetch(fetchUrl, { headers: createHeaders(key) });
      const singleArticle = await responce.json();
      dispatch(addArticle(getArticlesData(singleArticle.data.article)));
      dispatch(setStatus('ok'));
    } catch (error) {
      dispatch(setStatus('error'));
    }
  };
