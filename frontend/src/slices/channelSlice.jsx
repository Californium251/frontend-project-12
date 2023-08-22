/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  activeId: null,
  channelToBeChanged: null,
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
    removeChannel: (state, { payload }) => {
      if (payload === state.activeId) {
        state.activeId = 1;
      }
      delete state.value[payload];
    },
    renameName: (state, { payload }) => {
      const { id, name } = payload;
      state.value[id].name = name;
    },
    setChannelToBeChanged: (state, { payload }) => {
      state.channelToBeChanged = payload;
    },
  },
});

export const channelSliceActoins = channelSclice.actions;

export default channelSclice.reducer;
