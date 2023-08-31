/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import {
  Form, Modal, FormGroup, Button,
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

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.modals.renameChannel);
  const initialName = useSelector((state) => state.channels.value[id].name);
  const { renameChannel } = useApi();
  const onHide = () => {
    dispatch(hideModal({ modal: 'renameChannel' }));
  };
  const channelNames = useSelector(({ channels }) => Object
    .values(channels.value)
    .map(({ name }) => name));
  const nameField = useRef(null);
  useEffect(() => {
    nameField.current.focus();
  }, []);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const formik = useFormik({
    initialValues: { name: initialName },
    validationSchema: channelNameValidation(channelNames),
    onSubmit: (values) => {
      const newVals = {
        id,
        name: values.name,
        removable: true,
      };
      renameChannel(newVals).then(() => {
        dispatch(hideModal({ modal: 'renameChannel' }));
      }).then(() => {
        toast.success(t('channelRenamed'));
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
        <Modal.Title>{t('renameChannelHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="renameChannelForm" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Form.Control
              name="name"
              id="name"
              type="text"
              className="mb-2"
              ref={nameField}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name && !!formik.touched.name}
            />
            <label htmlFor="name" className="visually-hidden">{t('renameChannelLabel')}</label>
            <Form.Control.Feedback>
              {t('channelLength')}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" type="button" variant="secondary" onClick={onHide}>{t('cancel')}</Button>
              <Button type="submit" form="renameChannelForm">{t('send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
