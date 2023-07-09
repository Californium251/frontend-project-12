/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const channelNameValidation = (channelNames) => Yup.object().shape({
  name: Yup.string().required().min(3).max(20)
    .notOneOf(channelNames),
});

export const loginValidation = Yup.object().shape({
  username: Yup.string(),
  password: Yup.string(),
});

export const signupValidation = (keys) => Yup.object().shape({
  username: Yup.string().min(3, keys.username).max(20, keys.username),
  password: Yup.string().min(6, keys.password),
  passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], keys.passwordsMustMatch),
});

export const newMessageValidation = Yup.object().shape({
  body: Yup.string().required('Required!'),
});
