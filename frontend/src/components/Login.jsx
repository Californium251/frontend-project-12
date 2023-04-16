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
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={yup.object().shape({
          username: yup.string().required('Required!'),
          password: yup.string().required('Required!'),
        })}
        onSubmit={async (values) => {
          const res = await axios.post('/api/v1/login', values);
          if (res.status === 200) {
            window.localStorage.setItem('token', res.data.token);
            setAuth({ user: true });
            navigate('/chat');
          }
        }}
      >
        {() => (
          <Form>
            <label htmlFor="username">Email</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username  " />
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
            <button type="submit">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
