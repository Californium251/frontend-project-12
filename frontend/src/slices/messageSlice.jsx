/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, { payload }) => {
      const {
        id,
        text,
        username,
        channelId,
      } = payload;
      state[id] = { text, username, channelId };
    },
  },
});

export const { newMessage } = messageSlice.actions;

export default messageSlice.reducer;
