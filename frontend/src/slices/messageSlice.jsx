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
        body,
        username,
        channelId,
      } = payload;
      state[id] = { body, username, channelId };
    },
    addMessages: (state, { payload }) => {
      payload.reduce((res, el) => {
        const {
          id, body, username, channelId,
        } = el;
        res[id] = {
          id, body, username, channelId,
        };
        return res;
      }, state);
    },
  },
});

export const { newMessage, addMessages } = messageSlice.actions;

export default messageSlice.reducer;
