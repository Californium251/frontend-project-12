/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import {
  Formik, Form, ErrorMessage, Field,
} from 'formik';
import 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../slices/modalsSlice';
import { channelNameValidation } from './validations';
import SocketContext from '../context/SocketContext';

function NewChannelModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(hideModal('newChannel'));
  };
  const channelNames = useSelector(({ channels }) => Object
    .values(channels.value)
    .map(({ name }) => name));
  const { newChannelEmit } = useContext(SocketContext);
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('newChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={channelNameValidation(channelNames)}
          onSubmit={({ name }) => {
            newChannelEmit({
              name,
              removable: true,
            }).then(() => {
              dispatch(hideModal('newChannel'));
              toast.success(t('channelCreated'));
            });
          }}
        >
          <Form id="newChannelForm">
            <FormGroup>
              <Field name="name" type="text" className="mb-2 form-control" />
              <label htmlFor="name" className="visually-hidden">{t('channelName')}</label>
              <ErrorMessage name="name">{(msg) => <div>{msg}</div>}</ErrorMessage>
            </FormGroup>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={onHide}>{t('cancel')}</Button>
        <Button type="submit" form="newChannelForm">{t('create')}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewChannelModal;
