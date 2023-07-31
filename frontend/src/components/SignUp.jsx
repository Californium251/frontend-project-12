import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Container, Row, Col, Card, Form, Button, Image,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { signupValidation } from './validations';
import { signUpError } from '../slices/errorSlice';
import image from '../img/signup.jpeg';
import AppHeader from './AppHeader';
import useAuth from '../hooks/useAuth';

const SignUp = () => {
  const { t } = useTranslation();
  const { auth, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const error = useSelector((state) => state.errors.signUpError);
  const dispatch = useDispatch();
  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema: signupValidation({
      username: t('usernameLength'),
      password: t('passwordLength'),
      passwordsMustMatch: t('passwordsMustMatch'),
      required: t('required'),
    }),
    onSubmit: async (values) => {
      try {
        const { username, password } = values;
        const res = await axios.post('/api/v1/signup', { username, password });
        if (res.status === 201) {
          login(res.data);
          dispatch(signUpError(null));
          navigate('/');
        }
      } catch (err) {
        dispatch(signUpError(err.message));
      }
    },
  });
  return (
    <Container fluid className="d-flex flex-column vh-100 bg-light">
      <AppHeader />
      <Container fluid className="h-100">
        <Row className="justify-content-md-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <Card className="shadow-sm">
              <Card.Body className="p-5 row">
                <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                  <Image src={image} roundedCircle />
                </Col>
                {!auth.token
                  ? (
                    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                      <h1 className="text-center mb-4">{t('signUpFormHeader')}</h1>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="text"
                          name="username"
                          id="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!formik.touched.username && !!formik.errors.username}
                          ref={usernameInput}
                          placeholder={t('usernameLength')}
                          required
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {t(formik.errors.username)}
                        </Form.Control.Feedback>
                        <label htmlFor="username">{t('signUpNicknameLabel')}</label>
                      </Form.Floating>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="password"
                          name="password"
                          id="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!formik.errors.password && !!formik.touched.password}
                          placeholder={t('passwordLength')}
                          required
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {t(formik.errors.password)}
                        </Form.Control.Feedback>
                        <label htmlFor="password">{t('passwordLabel')}</label>
                      </Form.Floating>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="password"
                          name="passwordRepeat"
                          id="passwordRepeat"
                          value={formik.values.passwordRepeat}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!formik.errors.passwordRepeat
                            && !!formik.touched.passwordRepeat}
                          required
                          placeholder={t('passwordsMustMatch')}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {t(formik.errors.passwordRepeat)}
                        </Form.Control.Feedback>
                        <label htmlFor="passwordRepeat">{t('passwordConfirmation')}</label>
                      </Form.Floating>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(error)}
                      </Form.Control.Feedback>
                      <Button variant="outline-primary" className="w-100 mb-3" type="submit">{t('signupButton')}</Button>
                    </Form>
                  )
                  : <Navigate to="/" state={{ from: location }} replace />}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SignUp;
