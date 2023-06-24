/* eslint-disable import/no-extraneous-dependencies */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru';
import en from './en';

i18next
  .use(initReactI18next)
  .init({
    lng: 'ru',
    debug: true,
    resources: {
      en, ru,
    },
  });
