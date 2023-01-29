// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  passwords: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      console.log(current(state));
      // eslint-disable-next-line no-param-reassign
      state.email = action.payload.email;
    },
    setPassword: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.password = action.payload;
    },
  },
});

export const { setEmail, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
