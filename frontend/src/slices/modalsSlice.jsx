/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newChannel: false,
  editChannel: null,
  removeChannel: null,
  renameChannel: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      const currentState = state;
      currentState[payload] = true;
    },
    hideModal: (state, { payload }) => {
      const currentState = state;
      currentState[payload] = false;
    },
    editChannel: (state, { payload }) => {
      const currentState = state;
      currentState.editChannel = payload;
    },
    showRemoveChannel: (state, { payload }) => {
      const currentState = state;
      currentState.removeChannel = payload;
    },
    showRenameChannel: (state, { payload }) => {
      const currentState = state;
      currentState.renameChannel = payload;
    },
  },
});

export const {
  showModal, hideModal, editChannel, showRemoveChannel, showRenameChannel,
} = modalsSlice.actions;

export default modalsSlice.reducer;
