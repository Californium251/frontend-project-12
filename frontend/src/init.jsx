import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './App';
import resources from './locales/index';
import {
  newChannel, removeChannel, renameChannel,
} from './slices/channelSlice';
import { newMessage } from './slices/messageSlice';
import store from './slices/index';
import SocketContext from './context/SocketContext';

const init = async () => {
  const Socket = io('http://localhost:3000/');
  const i18n = i18next.createInstance();

  const newMessageCallback = (socket) => {
    store.dispatch(newMessage(socket));
  };
  const newChannelCallback = (socket) => {
    if (socket.name) {
      store.dispatch(newChannel(socket));
    }
  };
  const removeChannelCallback = ({ id }) => {
    store.dispatch(removeChannel(id));
  };
  const renameChannelCallback = (data) => {
    store.dispatch(renameChannel(data));
  };
  const newMessageEmit = async (data) => {
    Socket.emit('newMessage', data);
  };
  const newChannelEmit = async (data) => {
    Socket.emit('newChannel', data);
  };
  const removeChannelEmit = async (data) => {
    Socket.emit('removeChannel', data);
  };
  const renameChannelEmit = async (data) => {
    Socket.emit('renameChannel', data);
  };
  Socket.on('newMessage', newMessageCallback);
  Socket.on('newChannel', newChannelCallback);
  Socket.on('removeChannel', removeChannelCallback);
  Socket.on('renameChannel', renameChannelCallback);
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <SocketContext.Provider value={{
        newMessageEmit, newChannelEmit, removeChannelEmit, renameChannelEmit,
      }}
      >
        <I18nextProvider i18={i18n}>
          <App />
        </I18nextProvider>
      </SocketContext.Provider>
    </Provider>
  );
};

export default init;