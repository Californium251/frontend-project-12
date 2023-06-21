/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const channelNameValidation = (channelNames) => Yup.object().shape({
  name: Yup.string().required().notOneOf(channelNames),
});

export const loginValidation = Yup.object().shape({
  username: Yup.string().required('Required!'),
  password: Yup.string().required('Required!'),
});

export const signupValidation = Yup.object().shape({
  username: Yup.string().required('Required!'),
  password: Yup.string().required('Required!').min(6),
  passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
