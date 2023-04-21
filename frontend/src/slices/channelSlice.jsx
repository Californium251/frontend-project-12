/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const channelSclice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { addChannels } = channelSclice.actions;

export default channelSclice.reducer;
