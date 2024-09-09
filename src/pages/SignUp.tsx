import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signUp } from '../services/authService';
import { Link } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUpForm: React.FC = () => {
  const handleSubmit = async (values: FormValues) => {
    try {
      const token = await signUp(values);
      alert('User registered successfully! Token: ' + token);
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="username">Email:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
      <div>
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  );
};

export default SignUpForm;
