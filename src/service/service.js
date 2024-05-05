import { format } from 'date-fns';

import { addArticles, addArticlesCount, addArticle } from '../store/slices/articlesSlice';
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

//Работа с данными пользователя
export const signUpUser = (formData) => (dispatch) => {
  console.log('Запуск функции signUpUser');
  const userData = JSON.stringify({
    user: formData,
  });

  fetch(`${baseUrl}/users`, {
    ...postHeader,
    body: userData,
  })
    .then((responce) => {
      return responce.json();
    })
    .then((userInfo) => {
      console.log('Пришел ответ от сервера', userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo.user));
      dispatch(setUser({ user: userInfo.user }));
      dispatch(setErrors(null));
      dispatch(goMainPage(true));
      dispatch(setSubmit(true));
    })
    .catch((error) => {
      console.log('ОШИБКА в регистрации', error);
      dispatch(setSubmit(true));
      if (error.response.status === 422) {
        dispatch(setUser(JSON.parse(userData)));
        dispatch(setErrors(error.response.data.errors));
      }
    });
};

export const signInUser = (formData) => async (dispatch) => {
  console.log('функция запустилась');
  const userData = JSON.stringify({
    user: formData,
  });
  try {
    const responce = await fetch(`${baseUrl}/users/login`, {
      ...postHeader,
      body: userData,
    });
    const userInfo = await responce.json();
    console.log(userInfo);

    localStorage.setItem('user', JSON.stringify(userInfo.user));
    dispatch(setUser({ user: userInfo.user }));
    dispatch(setErrors(null));
    dispatch(goMainPage(true));
    dispatch(setSubmit(true));
  } catch (error) {
    dispatch(setSubmit(true));
    if (error.response.status === 422) {
      dispatch(setSubmit(true));
      dispatch(setUser(JSON.parse(userData)));
      dispatch(setErrors(error.response.data.errors));
    }
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
    console.log(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo.user));
    dispatch(setUser({ user: userInfo.user }));
    dispatch(setErrors(null));
    dispatch(setSubmit(true));
  } catch (error) {
    dispatch(setSubmit(true));
    dispatch(setErrors(error.response.data.errors));
  }
};
