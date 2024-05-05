import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user'))
      ? JSON.parse(localStorage.getItem('user'))
      : {
          image: '',
          bio: '',
          token: '',
          username: '',
          email: '',
          password: '',
        },
    errors: false,
  },
  reducers: {
    setUser(state, action) {
      const { user } = action.payload;
      state.user = { ...state.user, ...user };
    },
    resetUser(state) {
      state.user = {
        image: '',
        bio: '',
        token: '',
        username: '',
        email: '',
        password: '',
      };
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, resetUser, setErrors } = userSlice.actions;
