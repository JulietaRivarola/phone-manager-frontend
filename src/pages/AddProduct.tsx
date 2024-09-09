import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  model: Yup.string().required('Model is required'),
  brand: Yup.string().required('Brand is required'),
  data: Yup.array().of(
    Yup.object({
      price: Yup.number().required('Price is required').min(0, 'Price must be zero or positive'),
      color: Yup.string().required('Color is required'),
    })
  ).min(1, 'At least one detail is required'),
});

interface ProductDetail {
  price: number;
  color: string;
}

interface FormValues {
  name: string;
  model: string;
  brand: string;
  data: ProductDetail[];
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      await axiosInstance.post('/products', values);
      alert('Product added successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <Formik
        initialValues={{ name: '', model: '', brand: '', data: [{ price: 0, color: '' }] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="model">Model:</label>
              <Field type="text" name="model" />
              <ErrorMessage name="model" component="div" />
            </div>
            <div>
              <label htmlFor="brand">Brand:</label>
              <Field type="text" name="brand" />
              <ErrorMessage name="brand" component="div" />
            </div>
            <FieldArray name="data">
              {({ insert, remove, push }) => (
                <div>
                  <h3>Details</h3>
                  {values.data.length > 0 && (
                    <div>
                      {values.data.map((detail, index) => (
                        <div key={index}>
                          <div>
                            <label htmlFor={`data.${index}.price`}>Price:</label>
                            <Field type="number" name={`data.${index}.price`} />
                            <ErrorMessage name={`data.${index}.price`} component="div" />
                          </div>
                          <div>
                            <label htmlFor={`data.${index}.color`}>Color:</label>
                            <Field type="text" name={`data.${index}.color`} />
                            <ErrorMessage name={`data.${index}.color`} component="div" />
                          </div>
                          <button type="button" onClick={() => remove(index)}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button type="button" onClick={() => push({ price: 0, color: '' })}>
                    Add Detail
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
            <button type="button" onClick={() => navigate('/products')}>
              Back to Products
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
