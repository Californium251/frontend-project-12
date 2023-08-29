/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Image, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import image from '../img/download.jpeg';
import { loginValidation } from './validations';
import AppHeader from './AppHeader';
import useAuth from '../hooks/useAuth';
import routes from '../routes/index';

const Login = () => {
  const { t } = useTranslation();
  const { auth, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.login, values);
        login(res.data);
        setError(null);
        navigate('/');
      } catch (err) {
        if (!err.isAxiosError) {
          setError('UNKNOWN_ERR');
        } else if (err.code === 'ERR_BAD_REQUEST') {
          setError(err.code);
        } else {
          setError('ERR_NETWORK');
        }
      }
    },
  });
  return (
    <Container fluid className="d-flex flex-column vh-100">
      <AppHeader />
      <Container fluid className="h-100 bg-light">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <Card>
              <Card.Body className="p-5 row">
                <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                  <Image src={image} roundedCircle />
                </Col>
                {!auth.token
                  ? (
                    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">{t('loginHeader')}</h1>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="text"
                          name="username"
                          id="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          className={error ? 'is-invalid' : ''}
                          isInvalid={!!error}
                          required
                          placeholder={t('nicknameLabel')}
                        />
                        <label htmlFor="username">{t('nicknameLabel')}</label>
                      </Form.Floating>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="password"
                          name="password"
                          id="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          isInvalid={!!error}
                          required
                          placeholder={t('passwordLabel')}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {t(error)}
                        </Form.Control.Feedback>
                        <label htmlFor="password">{t('passwordLabel')}</label>
                      </Form.Floating>
                      <Button variant="outline-primary" className="w-100 mb-3" type="submit">{t('loginButton')}</Button>
                    </Form>
                  )
                  : <Navigate to="/" state={{ from: location }} replace />}
              </Card.Body>
              <Card.Footer className="p-4 text-center">
                <span>{t('noAccount')}</span>
                {' '}
                <a href="/signup">{t('signUpFormHeader')}</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
