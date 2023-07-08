import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button, Image,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { signupValidation } from './validations';
import { signUpError } from '../slices/errorSlice';
import { setName } from '../slices/userSlice';
import image from '../img/signup.jpeg';
import AppHeader from './AppHeader';

function SignUp() {
  const { t } = useTranslation();
  const token = window.localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const error = useSelector((state) => state.errors.signUpError);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/signup', { username: values.username, password: values.password });
        if (res.status === 201) {
          window.localStorage.setItem('token', res.data.token);
          window.localStorage.setItem('username', values.username);
          dispatch(signUpError(null));
          dispatch(setName(values.username));
          navigate('/');
        }
      } catch (err) {
        dispatch(signUpError(err.message));
      }
    },
  });
  return (
    <Container fluid className="d-flex flex-column vh-100">
      <AppHeader />
      <Container fluid className="h-100">
        <Row className="justify-content-md-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <Card>
              <Card.Body>
                <Row className="p-5">
                  <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                    <Image src={image} roundedCircle />
                  </Col>
                  <Col xs="12" md="6" className="mt-3 mt-mb-0 justify-content-md-center align-content-center">
                    {!token
                      ? (
                        <div>
                          <Form onSubmit={formik.handleSubmit}>
                            <h1 className="text-center mb-4">{t('signUpFormHeader')}</h1>
                            <FloatingLabel className="mb-3" label={t('nicknameLabel')}>
                              <Form.Control
                                className={error ? 'is-invalid' : null}
                                type="text"
                                name="username"
                                id="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.username}
                                required
                              />
                              <Form.Control.Feedback type="invalid" tooltip>
                                {t(formik.errors.username)}
                              </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" label={t('passwordLabel')}>
                              <Form.Control
                                className={error ? 'is-invalid' : null}
                                type="password"
                                name="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.password}
                                required
                              />
                              <Form.Control.Feedback type="invalid" tooltip>
                                {t(formik.errors.password)}
                              </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" label={t('passwordConfirmation')}>
                              <Form.Control
                                className={error ? 'is-invalid' : null}
                                type="password"
                                name="passwordRepeat"
                                id="passwordRepeat"
                                value={formik.values.passwordRepeat}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.passwordRepeat}
                                required
                              />
                              <Form.Control.Feedback type="invalid" tooltip>
                                {t(formik.errors.passwordRepeat)}
                              </Form.Control.Feedback>
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid" tooltip>
                              {t(error)}
                            </Form.Control.Feedback>
                            <Button variant="outline-primary" className="w-100 mb-3" type="submit">{t('signupButton')}</Button>
                          </Form>
                        </div>
                      )
                      : <Navigate to="/" state={{ from: location }} replace />}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SignUp;
