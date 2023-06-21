/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginError: null,
  signUpError: null,
};

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    loginError: (state, { payload }) => {
      state.loginError = payload;
    },
    signUpError: (state, { payload }) => {
      state.signUpError = payload;
    },
  },
});

export const { loginError, signUpError } = errorSlice.actions;

export default errorSlice.reducer;
