/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import {
  Formik, Form, ErrorMessage, Field,
} from 'formik';
import 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../slices/modalsSlice';
import Socket from './Socket';
import { channelNameValidation } from './validations';

function NewChannelModal() {
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(hideModal('newChannel'));
  };
  const channelNames = useSelector(({ channels }) => Object
    .values(channels.value)
    .map(({ name }) => name));
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={channelNameValidation(channelNames)}
          onSubmit={({ name }) => {
            Socket.emit('newChannel', {
              name,
              removable: true,
            });
            dispatch(hideModal('newChannel'));
          }}
        >
          <Form id="newChannelForm">
            <FormGroup>
              <Field name="name" type="text" className="mb-2 form-control" />
              <label htmlFor="name" className="visually-hidden">Имя канала</label>
              <ErrorMessage name="name">{(msg) => <div>{msg}</div>}</ErrorMessage>
            </FormGroup>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={onHide}>Отменить</Button>
        <Button type="submit" form="newChannelForm">Создать</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewChannelModal;
