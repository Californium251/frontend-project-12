import React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Socket from './Socket';

function SendMessageForm() {
  const channelId = useSelector((state) => state.channels.activeId);
  const { t } = useTranslation();
  const username = window.localStorage.getItem('username');
  return (
    <Formik
      initialValues={{
        text: '',
      }}
      onSubmit={(values, { resetForm }) => {
        Socket.emit('newMessage', {
          ...values,
          username,
          channelId,
        });
        resetForm();
      }}
    >
      <div className="mt-auto px-5 py-3">
        <Form className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <Field name="text" type="text" className="border-0 p-0 ps-2 form-control" />
            <button type="submit" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
              <span className="visually-hidden">{t('send')}</span>
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
}

export default SendMessageForm;
