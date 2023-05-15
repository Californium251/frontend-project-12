/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  activeId: 1,
};

const channelSclice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      state.value = payload;
    },
    makeActive: (state, { payload }) => {
      state.activeId = payload;
    },
  },
});

export const { addChannels, makeActive } = channelSclice.actions;

export default channelSclice.reducer;
