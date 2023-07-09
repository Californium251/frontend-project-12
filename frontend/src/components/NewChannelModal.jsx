/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useRef, useEffect } from 'react';
import {
  Modal, Form, FormGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../slices/modalsSlice';
import { channelNameValidation } from './validations';
import SocketContext from '../context/SocketContext';

const NewChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(hideModal('newChannel'));
  };
  const channelNames = useSelector(({ channels }) => Object
    .values(channels.value)
    .map(({ name }) => name));
  const { newChannelEmit } = useContext(SocketContext);
  const nameField = useRef(null);
  useEffect(() => {
    nameField.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameValidation(channelNames),
    onSubmit: ({ name }) => {
      newChannelEmit({
        name,
        removable: true,
      }).then(() => {
        dispatch(hideModal('newChannel'));
        toast.success(t('channelCreated'));
      });
    },
  });
  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('newChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="newChannelForm" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              type="text"
              className="mb-2"
              isInvalid={!!formik.errors.name && !!formik.touched.name}
              ref={nameField}
            />
            <label htmlFor="name" className="visually-hidden">{t('channelName')}</label>
            <Form.Control.Feedback type="invalid">
              {t('channelLength')}
            </Form.Control.Feedback>
            <div className="justify-content-end d-flex">
              <Button className="me-2" type="button" variant="secondary" onClick={onHide}>{t('cancel')}</Button>
              <Button type="submit" form="newChannelForm">{t('send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannelModal;
