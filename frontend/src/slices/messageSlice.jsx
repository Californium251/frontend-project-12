/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: (state, { payload }) => {
      const {
        id,
        body,
        username,
        channelId,
      } = payload;
      state[id] = { body, username, channelId };
    },
    addMessages: (state, { payload }) => {
      payload.forEach((el) => {
        const {
          id,
          body,
          username,
          channelId,
        } = el;
        state[id] = { body, username, channelId };
      });
    },
  },
});

export const { sendMessage, addMessages } = messageSlice.actions;

export default messageSlice.reducer;
