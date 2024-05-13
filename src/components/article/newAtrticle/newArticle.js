import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

import ArticleTag from '../../article/articleTags/articleTags.js';
import { setSubmit } from '../../../store/slices/routeSlice.js';
import { createTags } from '../../../store/slices/tagsSlice.js';
import { setErrors } from '../../../store/slices/userSlice.js';
import { editArticle } from '../../../service/service.js';

import styles from './newArticle.module.scss';

function NewArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tags } = useSelector((state) => state.tags);
  const { articles } = useSelector((state) => state.articles);
  const { id } = useParams();
  const article = articles.find((item) => item.slug === id);
  const { token, username } = useSelector((state) => state.user.user);
  const { mainPage } = useSelector((state) => state.route);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const submitForm = (formData) => {
    dispatch(setSubmit(false));

    id ? dispatch(editArticle(formData, tagsList, token, id)) : dispatch(editArticle(formData, tagsList, token));
    navigate(`/articles/`);
  };

  const tagsArr = tags.map((tag, idx) => (
    <ul key={tag.id} className={styles.tags}>
      <ArticleTag idx={idx} id={tag.id} value={tag.label} length={tags.length} />
    </ul>
  ));

  const tagsList = tags.map((tag) => tag.label).filter((tag) => tag !== '');

  useEffect(() => {
    if (id && article && Object.keys(article).length > 0) {
      const newTags = [];
      article.tags.forEach((tag) => {
        newTags.push({
          id: uuidv4(),
          label: tag,
        });
      });

      dispatch(createTags(newTags));
    } else {
      dispatch(createTags([{ id: uuidv4(), label: '' }]));
    }
  }, [dispatch, id, article]);

  useEffect(() => {
    if (id && article.username !== username) navigate('/');
    if (!token) navigate('/');
    if (mainPage) navigate('/');
    dispatch(setErrors(null));
  }, [mainPage, dispatch, navigate, id, token]);

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.title}>{id ? 'Edit article' : 'Create new article'}</h1>

        <label className={styles['form__label']}>
          <span>Title</span>
          <input
            className={styles['form__input']}
            type="text"
            id="title"
            placeholder="Title"
            defaultValue={id && article && article.title}
            {...register('title', {
              required: 'Обязательно к заполнению',
            })}
            style={errors.title && { outline: '1px solid #F5222D' }}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </label>

        <label className={styles['form__label']}>
          <span>Short description</span>
          <input
            className={styles['form__input']}
            type="text"
            id="description"
            placeholder="Short description"
            defaultValue={id && article && article.description}
            {...register('description', {
              required: 'Обязательно к заполнению',
            })}
            style={errors.description && { outline: '1px solid #F5222D' }}
          />
          {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        </label>

        <label className={styles['form__label']}>
          <span>Text</span>
          <textarea
            className={styles['form__textarea']}
            id="body"
            type="text"
            placeholder="Text"
            defaultValue={id && article && article.text}
            {...register('body', {
              required: 'Обязательно к заполнению',
            })}
            style={errors.body && { outline: '1px solid #F5222D' }}
          />
          {errors.body && <p className={styles.error}>{errors.body.message}</p>}
        </label>

        <label className={styles['form__label']}>
          <span>Tags</span>
          {tagsArr}
        </label>

        <button className={styles['form__button']}> Send </button>
      </form>
    </div>
  );
}

export default NewArticle;
