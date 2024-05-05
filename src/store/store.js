import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from './slices/articlesSlice';
import routeSlice from './slices/routeSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    articles: articlesSlice,
    route: routeSlice,
    user: userSlice,
  },
});

export default store;
