import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../redux/product/productSlice.tsx';
import { logout } from '../redux/user/slice.tsx';
import { Link, useNavigate } from 'react-router-dom';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as 'collapse',
};

const thTdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left' as 'left',
};

const thStyle = {
  ...thTdStyle,
  backgroundColor: '#f2f2f2',
};

const trEvenStyle = {
  backgroundColor: '#f9f9f9',
};

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: any) => state.products.items || []);
  const isLoading = useSelector((state: any) => state.products.isLoading);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  
  useEffect(() => {
    console.log(products)
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Error during logout.');
    }
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/add-product">Add New Product</Link>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Model</th>
            <th style={thStyle}>Brand</th>
            <th style={thStyle}>Details</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index} style={index % 2 === 0 ? trEvenStyle : undefined}>
                <td style={thTdStyle}>{product.name}</td>
                <td style={thTdStyle}>{product.model}</td>
                <td style={thTdStyle}>{product.brand}</td>
                <td style={thTdStyle}>
                  <ul>
                    {Array.isArray(product.data) && product.data.map((detail, i) => (
                      <li key={i}>Price: {detail.price} - Color: {detail.color}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={thTdStyle}>No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
