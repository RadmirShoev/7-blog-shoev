import { createSlice } from '@reduxjs/toolkit';

const routeSlice = createSlice({
  name: 'route',
  initialState: {
    location: 'articles-list',
    routePath: '',
    mainPage: false,
    status: 'loading',
    submit: true,
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setRoutePath(state, action) {
      state.routePath = action.payload;
    },
    goMainPage(state, action) {
      state.mainPage = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSubmit(state, action) {
      state.submit = action.payload;
    },
  },
});

export const { setLocation, setRoutePath, goMainPage, setStatus, setSubmit } = routeSlice.actions;
export default routeSlice.reducer;
