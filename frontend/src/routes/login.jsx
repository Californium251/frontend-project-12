import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Login() {
  return (
    <div>
      <Formik
        initialValues={{ email: '', passwords: '' }}
        validate={async (values) => schema.validate(values)}
      >
        {(values) => (
          <form>
            <input
              type="email"
              name="email"
              value={values.email}
            />
            <input
              type="password"
              name="password"
              value={values.password}
            />
            <button type="submit">Войти</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
