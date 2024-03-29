/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import {
  Modal, Form, FormGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../slices/modalsSlice';
import { channelNameValidation } from './validations';
import useApi from '../hooks/useApi';
import routes from '../routes/index';
import useAuth from '../hooks/useAuth';

const NewChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(hideModal({ modal: 'newChannel' }));
  };
  const channelNames = useSelector(({ channels }) => Object
    .values(channels.value)
    .map(({ name }) => name));
  const { newChannel } = useApi();
  const nameField = useRef(null);
  useEffect(() => {
    nameField.current.focus();
  }, []);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameValidation(channelNames),
    onSubmit: ({ name }) => {
      newChannel({
        name,
        removable: true,
      }).then(() => {
        dispatch(hideModal({ modal: 'newChannel' }));
        toast.success(t('channelCreated'));
      }).catch((err) => {
        if (!err.isAxiosError) {
          toast(t('UNKNOWN_ERR'));
        } else if (err.code === 'ERR_BAD_REQUEST') {
          toast(t('ERR_BAD_REQUEST'));
          logout();
          navigate(routes.loginPage);
        } else {
          toast(t('ERR_NETWORK'));
        }
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
