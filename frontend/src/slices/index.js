/* eslint-disable react/jsx-filename-extension */
import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelSlice';
import messageSlice from './messageSlice';
import modalsSlice from './modalsSlice';
import errorSlice from './errorSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messageSlice,
    modals: modalsSlice,
    errors: errorSlice,
  },
});
