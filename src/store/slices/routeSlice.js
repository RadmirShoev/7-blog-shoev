import { createSlice } from '@reduxjs/toolkit';

const routeSlice = createSlice({
  name: 'route',
  initialState: {
    location: 'articles-list',
    mainPage: false,
    status: 'loading',
    submit: true,
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
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
export default routeSlice.reducer;
export const { setLocation, goMainPage, setStatus, setSubmit } = routeSlice.actions;
