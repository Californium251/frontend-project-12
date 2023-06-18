/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const channelNameValidation = (channelNames) => Yup.object().shape({
  name: Yup.string().required().notOneOf(channelNames),
});
