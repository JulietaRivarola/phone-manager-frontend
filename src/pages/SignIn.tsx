import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/user/slice.tsx';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  username: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface FormValues {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const error = useSelector((state: any) => state.user.error);
  const isLoading = useSelector((state: any) => state.user.isLoading);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      dispatch(loginRequest(values as any));
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="username">Email:</label>
            <Field
              type="text"
              name="username"
              placeholder="Email"
            />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" />
          </div>
          {error && <div>{error}</div>}
          <button type="submit" disabled={isSubmitting || isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          <div>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
