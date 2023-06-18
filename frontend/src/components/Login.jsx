/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  ErrorMessage,
  Formik,
  Field,
} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Image, FloatingLabel, Button, Form,
} from 'react-bootstrap';
import image from '../img/download.jpeg';

function Login() {
  const token = window.localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  let error;
  return (
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
                        <Formik
                          initialValues={{ username: '', password: '' }}
                          validationSchema={yup.object().shape({
                            username: yup.string().required('Required!'),
                            password: yup.string().required('Required!'),
                          })}
                          onSubmit={async (values) => {
                            try {
                              const res = await axios.post('/api/v1/login', values);
                              if (res.status === 200) {
                                window.localStorage.setItem('token', res.data.token);
                                navigate('/');
                              }
                            } catch (err) {
                              error = err.message;
                            }
                          }}
                        >
                          {() => (
                            <Form>
                              <h1 className="text-center mb-4">Войти</h1>
                              <Field
                                name="username"
                                render={({ field }) => (
                                  <FloatingLabel className="mb-3" label="Ваш ник">
                                    <Form.Control type="text" value={field.value} onChange={field.onChange} />
                                    <ErrorMessage name="username" />
                                  </FloatingLabel>
                                )}
                              />
                              <Field
                                name="password"
                                render={({ field }) => (
                                  <FloatingLabel className="mb-3" label="Пароль">
                                    <Form.Control type="password" value={field.value} onChange={field.onChange} />
                                    <ErrorMessage name="password" />
                                  </FloatingLabel>
                                )}
                              />
                              {!error ? null : <div>{error}</div>}
                              <Button variant="outline-primary" className="w-100 mb-3  " type="submit">Войти</Button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    )
                    : <Navigate to="/" state={{ from: location }} replace />}
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <span>Нет аккаунта?</span>
              {' '}
              <a href="/signup">Регистрация</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
