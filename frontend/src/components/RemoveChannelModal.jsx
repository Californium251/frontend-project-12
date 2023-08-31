/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
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
import useApi from '../hooks/useApi';
import routes from '../routes/index';
import useAuth from '../hooks/useAuth';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(hideModal({ modal: 'removeChannel' }));
  };
  const { removeChannel } = useApi();
  const id = useSelector((state) => state.modals.removeChannel);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const formik = useFormik({
    initialValues: { id },
    onSubmit: (values) => {
      removeChannel(values).then(() => {
        dispatch(hideModal({ modal: 'removeChannel' }));
        toast.success(t('channelRemoved'));
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
        <Modal.Title>{t('removeChannelHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="removeChannelForm" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <p className="lead">{t('areYouSure')}</p>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={onHide}>{t('cancel')}</Button>
            <Button variant="danger" type="submit" form="removeChannelForm">{t('remove')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
