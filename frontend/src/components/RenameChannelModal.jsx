/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import {
  Formik, Form, ErrorMessage, Field,
} from 'formik';
import 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../slices/modalsSlice';
import Socket from './Socket';
import { channelNameValidation } from './validations';
import { setChannelToBeChanged } from '../slices/channelSlice';

function RenameChannelModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.modals.renameChannel);
  const initialName = useSelector((state) => state.channels.value[id].name);
  const onHide = () => {
    dispatch(hideModal('renameChannel'));
  };
  const channelNames = useSelector(({ channels }) => Object
    .values(channels.value)
    .map(({ name }) => name));
  const nameField = useRef(null);
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('renameChannelHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: initialName }}
          validationSchema={channelNameValidation(channelNames)}
          onSubmit={(values) => {
            const newVals = {
              id,
              name: values.name,
              removable: true,
            };
            Socket.emit('renameChannel', newVals, (res) => {
              if (res.status === 'ok') {
                dispatch(setChannelToBeChanged(id));
                dispatch(hideModal('renameChannel'));
              }
            });
          }}
        >
          <Form id="renameChannelForm">
            <FormGroup>
              <Field name="name" type="text" className="mb-2 form-control" ref={nameField} />
              <label htmlFor="name" className="visually-hidden">{t('renameChannelLabel')}</label>
              <ErrorMessage name="name">{(msg) => <div>{msg}</div>}</ErrorMessage>
            </FormGroup>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={onHide}>{t('cancel')}</Button>
        <Button type="submit" form="renameChannelForm">{t('rename')}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RenameChannelModal;
