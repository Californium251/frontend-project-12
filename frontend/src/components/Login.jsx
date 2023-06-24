/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Image, FloatingLabel, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import image from '../img/download.jpeg';
import { loginValidation } from './validations';
import { loginError } from '../slices/errorSlice';
import { setName } from '../slices/userSlice';
import AppHeader from './AppHeader';

function Login() {
  const { t } = useTranslation();
  const token = window.localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const error = useSelector((state) => state.errors.loginError);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/login', values);
        if (res.status === 200) {
          window.localStorage.setItem('token', res.data.token);
          dispatch(setName(values.username));
          dispatch(loginError(null));
          navigate('/');
        }
      } catch (err) {
        dispatch(loginError(err.message));
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
                            <h1 className="text-center mb-4">{t('loginHeader')}</h1>
                            <FloatingLabel className="mb-3" label={t('nicknameLabel')}>
                              <Form.Control className={error ? 'is-invalid' : null} type="text" name="username" id="username" value={formik.values.username} onChange={formik.handleChange} />
                              {formik.touched.username && formik.errors.username ? (
                                <div className="text-danger">{formik.errors.username}</div>
                              ) : null}
                            </FloatingLabel>
                            <div className="has-validation">
                              <FloatingLabel className="mb-3" label={t('passwordLabel')}>
                                <Form.Control className={error ? 'is-invalid' : null} type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} />
                                {formik.touched.password && formik.errors.password ? (
                                  <div className="text-danger">{formik.errors.password}</div>
                                ) : null}
                                {error ? (
                                  <div className="invalid-tooltip">
                                    {error}
                                  </div>
                                ) : null}
                              </FloatingLabel>
                            </div>
                            <Button variant="outline-primary" className="w-100 mb-3" type="submit">{t('loginButton')}</Button>
                          </Form>
                        </div>
                      )
                      : <Navigate to="/" state={{ from: location }} replace />}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="p-4 text-center">
                <span>{t('noAccount')}</span>
                {' '}
                <a href="/signup">{t('signupButton')}</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;
