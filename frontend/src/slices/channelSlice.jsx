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
    addChannel: (state, { payload }) => {
      const { id, name, removable } = payload;
      state.value[id] = { name, removable };
    },
    deleteChannel: (state, { payload }) => {
      delete state.value[payload];
    },
    changeChannelName: (state, { payload }) => {
      const { id, name } = payload;
      state.value[id].name = name;
    },
    setChannelToBeChanged: (state, { payload }) => {
      state.channelToBeChanged = payload;
    },
  },
});

export const {
  addChannels, makeActive, addChannel, deleteChannel, changeChannelName, setChannelToBeChanged,
} = channelSclice.actions;

export default channelSclice.reducer;
