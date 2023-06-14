/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import {
  Formik, Form, ErrorMessage, Field,
} from 'formik';
import 'bootstrap';
import { useDispatch } from 'react-redux';
import { hideModal } from '../slices/modalsSlice';
import Socket from './Socket';

function NewChannelModal() {
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(hideModal('newChannel'));
  };
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={({ name }) => {
            Socket.emit('newChannel', {
              name,
              removable: true,
            });
          }}
        >
          <Form>
            <FormGroup>
              <Field name="name" type="text" className="mb-2 form-control" />
              <label htmlFor="name" className="visually-hidden">Имя канала</label>
              <ErrorMessage name="name" />
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={onHide}>Отменить</button>
                <button type="submit" className="btn btn-primary">Отправить</button>
              </div>
            </FormGroup>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default NewChannelModal;
