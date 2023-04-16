/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  ErrorMessage,
  Formik,
  Field,
  Form,
} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

function Login() {
  const token = window.localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  let error;
  return (
    !token
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
                <label htmlFor="username">Email</label>
                <Field name="username" type="text" />
                <ErrorMessage name="username" />
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" />
                {!error ? null : <div>{error}</div>}
                <button type="submit">Войти</button>
              </Form>
            )}
          </Formik>
        </div>
      )
      : <Navigate to="/" state={{ from: location }} replace />
  );
}

export default Login;
