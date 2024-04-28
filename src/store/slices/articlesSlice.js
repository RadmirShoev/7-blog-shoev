import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
    page: 1,
    limit: 5,
  },
  reducers: {
    addArticles(state, action) {
      state.articles = action.payload;
    },
    addArticle(state, action) {
      state.articles = [action.payload];
    },
    addArticlesCount(state, action) {
      state.articlesCount = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    likeArticle(state, action) {
      state.articles = state.articles.map((art) => (art.slug === action.payload.slug ? action.value : art));
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { addArticles, addArticle, addArticlesCount, setLimit, likeArticle, setPage } = articlesSlice.actions;
export default articlesSlice.reducer;
