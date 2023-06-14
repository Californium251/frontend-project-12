/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  activeId: null,
};

const channelSclice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      payload.forEach(({ id, name, removable }) => {
        state.value[id] = { name, removable };
      });
    },
    makeActive: (state, { payload }) => {
      state.activeId = payload;
    },
    newChannel: (state, { payload }) => {
      const { id, name, removable } = payload;
      state.value[id] = { name, removable };
    },
  },
});

export const { addChannels, makeActive, newChannel } = channelSclice.actions;

export default channelSclice.reducer;
