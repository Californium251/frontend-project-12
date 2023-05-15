/* eslint-disable react/jsx-filename-extension */
import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelSlice';
import messageSlice from './messageSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messageSlice,
  },
});
