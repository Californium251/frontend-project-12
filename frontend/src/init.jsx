import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import resources from './locales/index';
import { channelSliceActoins } from './slices/channelSlice';
import { sendMessage } from './slices/messageSlice';
import store from './slices/index';
import ApiContext from './context/ApiContext';
import { AuthProvider } from './context/AuthProvider';

const init = async () => {
  const Socket = io('/');
  const i18n = i18next.createInstance();
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'testenv',
  };

  const newMessageCallback = (socket) => {
    store.dispatch(sendMessage(socket));
  };
  const newChannelCallback = (socket) => {
    if (socket.name) {
      store.dispatch(channelSliceActoins.newChannel(socket));
    }
  };
  const removeChannelCallback = ({ id }) => {
    store.dispatch(channelSliceActoins.removeChannel(id));
  };
  const renameChannelCallback = (data) => {
    store.dispatch(channelSliceActoins.renameName(data));
  };
  const promisify = (asyncFn) => (...args) => {
    const promise = new Promise((resolve, reject) => {
      asyncFn.call(Socket, ...args, (data, err) => (err ? reject(err) : resolve(data)));
    });
    return promise;
  };
  const newMessage = (data) => promisify(Socket.emit)('newMessage', data);
  const newChannel = (data) => promisify(Socket.emit)('newChannel', data);
  const removeChannel = (data) => promisify(Socket.emit)('removeChannel', data);
  const renameChannel = (data) => promisify(Socket.emit)('renameChannel', data);
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
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <Provider store={store}>
              <ApiContext.Provider value={{
                newMessage, newChannel, removeChannel, renameChannel,
              }}
              >
                <I18nextProvider i18={i18n}>
                  <App />
                </I18nextProvider>
              </ApiContext.Provider>
            </Provider>
          </AuthProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
