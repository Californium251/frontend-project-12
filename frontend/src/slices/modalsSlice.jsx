/* eslint-disable react/jsx-filename-extension */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  data: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      const currentState = state;
      const { modal, data } = payload;
      currentState[modal] = data;
    },
    hideModal: (state, { payload }) => {
      const currentState = state;
      const { modal } = payload;
      currentState[modal] = null;
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
