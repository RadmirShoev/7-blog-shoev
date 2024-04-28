import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from './slices/articlesSlice';
import routeSlice from './slices/routeSlice';

const store = configureStore({
  reducer: {
    articles: articlesSlice,
    route: routeSlice,
  },
});

export default store;
