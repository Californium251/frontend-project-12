/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Modal, FormGroup, Button,
} from 'react-bootstrap';
import {
  Formik, Form,
} from 'formik';
import 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../slices/modalsSlice';
import Socket from './Socket';
import { setChannelToBeChanged } from '../slices/channelSlice';

function RemoveChannelModal() {
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(hideModal('removeChannel'));
  };
  const id = useSelector((state) => state.modals.removeChannel);
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ id }}
          onSubmit={(values) => {
            Socket.emit('removeChannel', values, (res) => {
              if (res.status === 'ok') {
                dispatch(setChannelToBeChanged(id));
                dispatch(hideModal('removeChannel'));
              }
            });
          }}
        >
          <Form id="removeChannelForm">
            <FormGroup>
              <p className="lead">Уверены?</p>
            </FormGroup>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Отменить</Button>
        <Button variant="danger" type="submit" form="removeChannelForm">Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveChannelModal;
