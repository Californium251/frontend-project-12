/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelSclice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      state.channels = payload;
    },
  },
});

export const { addChannels } = channelSclice.actions;

export default channelSclice.reducer;
