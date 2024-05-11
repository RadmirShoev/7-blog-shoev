import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from './slices/articlesSlice';
import routeSlice from './slices/routeSlice';
import userSlice from './slices/userSlice';
import tagsSlice from './slices/tagsSlice';

const store = configureStore({
  reducer: {
    articles: articlesSlice,
    route: routeSlice,
    user: userSlice,
    tags: tagsSlice,
  },
});

export default store;
