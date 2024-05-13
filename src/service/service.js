import { format } from 'date-fns';

import { addArticles, addArticlesCount, addArticle, likeArticle } from '../store/slices/articlesSlice';
import { setStatus, goMainPage, setSubmit } from '../store/slices/routeSlice';
import { setUser, setErrors } from '../store/slices/userSlice';

const baseUrl = 'https://blog.kata.academy/api';

const createHeaders = (key) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${key}`,
});

const postHeader = {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const getArticlesData = (arr) =>
  arr.map((elem) => {
    return {
      title: elem.title,
      text: elem.body,
      description: elem.description,
      slug: elem.slug,
      likes: elem.favoritesCount,
      tags: elem.tagList,
      liked: elem.favorited,
      favorited: elem.favorited,
      username: elem.author.username,
      date: format(new Date(elem.updatedAt), 'MMMM d, yyyy'),
      image: elem.author.image,
    };
  });

const getSingleArticleData = (article) => {
  return {
    title: article.title,
    text: article.body,
    description: article.description,
    slug: article.slug,
    likes: article.favoritesCount,
    tags: article.tagList,
    liked: article.favorited,
    favorited: article.favorited,
    username: article.author.username,
    date: format(new Date(article.updatedAt), 'MMMM d, yyyy'),
    image: article.author.image,
  };
};

export const fetchArticles =
  (page, key = '') =>
  async (dispatch) => {
    const fetchUrl = `${baseUrl}/articles?&limit=5&offset=${(page - 1) * 5}`;
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

      dispatch(addArticle(getSingleArticleData(singleArticle.article)));
      dispatch(setStatus('ok'));
    } catch (error) {
      dispatch(setStatus('error'));
    }
  };

export const fetchLike = (slug, liked, token) => async (dispatch) => {
  const fetchUrl = `${baseUrl}/articles/${slug}/favorite`;
  const fetchMethod = liked ? 'delete' : 'post';

  try {
    const response = await fetch(fetchUrl, {
      method: fetchMethod,
      headers: createHeaders(token),
    });
    const body = await response.json();

    if (!body.errors) {
      dispatch(setStatus('ok'));
      dispatch(likeArticle(getArticlesData([body.article])));
    } else {
      dispatch(setSubmit(true));
      dispatch(setStatus('error'));
    }
  } catch (error) {
    dispatch(setSubmit(true));
    dispatch(setStatus('error'));
  }
};

export const editArticle = (data, tagsArr, token, id) => async (dispatch) => {
  const article = JSON.stringify({ article: { ...data, tagList: tagsArr } });
  const featchUrl = id ? `${baseUrl}/articles/${id}` : `${baseUrl}/articles`;
  const featchMethod = id ? 'put' : 'post';

  try {
    const responce = await fetch(featchUrl, {
      method: featchMethod,
      headers: createHeaders(token),
      body: article,
    });
    const body = await responce.json();

    if (!body.errors) {
      dispatch(setStatus('ok'));
      dispatch(setSubmit(true));
      dispatch(goMainPage);
    } else {
      dispatch(setSubmit(true));
      dispatch(setStatus('error'));
    }
  } catch (error) {
    dispatch(setSubmit(true));
    dispatch(setStatus('error'));
  }
};

export const deleteArticle = (token, id) => async (dispatch) => {
  const featchUrl = `${baseUrl}/articles/${id}`;
  try {
    const responce = await fetch(featchUrl, {
      method: 'delete',
      headers: createHeaders(token),
    });

    const body = await responce.json();

    if (!body.errors) {
      dispatch(setStatus('ok'));
      dispatch(goMainPage(true));
      dispatch(setSubmit(true));
    } else {
      dispatch(setSubmit(true));
      dispatch(setStatus('error'));
    }
  } catch (error) {
    dispatch(setSubmit(true));
    dispatch(setStatus('error'));
  }
};

//Работа с данными пользователя
export const signUpUser = (formData) => async (dispatch) => {
  const userData = JSON.stringify({
    user: formData,
  });
  try {
    const responce = await fetch(`${baseUrl}/users`, {
      ...postHeader,
      body: userData,
    });
    const userInfo = await responce.json();

    if (!userInfo.errors) {
      localStorage.setItem('user', JSON.stringify(userInfo.user));

      dispatch(setUser({ user: userInfo.user }));
      dispatch(setErrors(null));
      dispatch(goMainPage(true));
      dispatch(setSubmit(true));
    } else {
      dispatch(setSubmit(true));
      dispatch(setUser(JSON.parse(userData)));
      dispatch(setErrors(userInfo.errors));
    }
  } catch (error) {
    dispatch(setSubmit(true));
    dispatch(setUser(JSON.parse(userData)));
    dispatch(setErrors(error));
  }
};

export const signInUser = (formData) => async (dispatch) => {
  const userData = JSON.stringify({
    user: formData,
  });
  try {
    const responce = await fetch(`${baseUrl}/users/login`, {
      ...postHeader,
      body: userData,
    });

    const userInfo = await responce.json();
    if (!userInfo.errors) {
      localStorage.setItem('user', JSON.stringify(userInfo.user));
      dispatch(setUser({ user: userInfo.user }));
      dispatch(setErrors(null));
      dispatch(goMainPage(true));
      dispatch(setSubmit(true));
    } else {
      dispatch(setSubmit(true));
      dispatch(setUser(JSON.parse(userData)));
      dispatch(setErrors(userInfo.errors));
    }
  } catch (error) {
    dispatch(setSubmit(true));
    dispatch(setUser(JSON.parse(userData)));
    dispatch(setErrors(error));
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const userData = JSON.stringify({
    user: formData,
  });

  try {
    const responce = await fetch(`${baseUrl}/user`, {
      method: 'put',
      headers: createHeaders(token),
      body: userData,
    });
    const userInfo = await responce.json();

    if (!userInfo.errors) {
      localStorage.setItem('user', JSON.stringify(userInfo.user));

      dispatch(setUser({ user: userInfo.user }));
      dispatch(setErrors(null));
      dispatch(goMainPage(true));
      dispatch(setSubmit(true));
    } else {
      dispatch(setSubmit(true));
      dispatch(setErrors(userInfo.errors));
    }
  } catch (error) {
    dispatch(setSubmit(true));
    dispatch(setErrors(error));
  }
};
