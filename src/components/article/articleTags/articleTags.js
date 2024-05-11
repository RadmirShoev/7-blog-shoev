import React from 'react';
import { useDispatch } from 'react-redux';

import { addTag, deleteTag, editTag } from '../../../store/slices/tagsSlice';

import styles from './articleTags.module.scss';

function ArticleTag({ id, idx, length, value }) {
  const dispatch = useDispatch();
  const lastTag = idx === length - 1;

  const onLabelChange = (value) => {
    if (value !== undefined) {
      dispatch(
        editTag({
          id,
          label: value.trim(),
        })
      );
    }
  };

  const onDelete = () => {
    dispatch(deleteTag(id));
  };

  const onAdd = () => {
    dispatch(addTag());
  };

  return (
    <div className={styles['tag-container']}>
      <input
        type="text"
        placeholder="Tag"
        defaultValue={value}
        className={styles.tag}
        onChange={(e) => onLabelChange(e.target.value)}
      />
      {length > 1 && !lastTag && (
        <button className={styles['button-delete']} type="button" onClick={onDelete}>
          Delete
        </button>
      )}
      {lastTag && (
        <button className={styles['button-add']} type="button" onClick={onAdd}>
          Add Tag
        </button>
      )}
    </div>
  );
}

export default ArticleTag;
