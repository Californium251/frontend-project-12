// eslint-disable-next-line react/jsx-filename-extension
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, { payload }) => {
      const currentState = state;
      currentState.name = payload;
    },
  },
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;
