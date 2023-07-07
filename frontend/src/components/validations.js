/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const channelNameValidation = (channelNames) => Yup.object().shape({
  name: Yup.string().required().min(3).max(20)
    .notOneOf(channelNames),
});

export const loginValidation = Yup.object().shape({
  username: Yup.string().required('Required!'),
  password: Yup.string().required('Required!'),
});

export const signupValidation = Yup.object().shape({
  username: Yup.string().min(3).required('Required!'),
  password: Yup.string().min(6).required('Required!'),
  passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const newMessageValidation = Yup.object().shape({
  body: Yup.string().required('Required!'),
});
