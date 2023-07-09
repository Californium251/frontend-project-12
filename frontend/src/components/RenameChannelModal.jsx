/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useContext, useEffect } from 'react';
import {
  Form, Modal, FormGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../slices/modalsSlice';
import { channelNameValidation } from './validations';
import SocketContext from '../context/SocketContext';

function RenameChannelModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.modals.renameChannel);
  const initialName = useSelector((state) => state.channels.value[id].name);
  const { renameChannelEmit } = useContext(SocketContext);
  const onHide = () => {
    dispatch(hideModal('renameChannel'));
  };
  const channelNames = useSelector(({ channels }) => Object
    .values(channels.value)
    .map(({ name }) => name));
  const nameField = useRef(null);
  useEffect(() => {
    nameField.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: { name: initialName },
    validationSchema: channelNameValidation(channelNames),
    onSubmit: (values) => {
      const newVals = {
        id,
        name: values.name,
        removable: true,
      };
      renameChannelEmit(newVals).then(() => {
        dispatch(hideModal('renameChannel'));
      }).then(() => {
        toast.success(t('channelRenamed'));
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
}

export default RenameChannelModal;
