import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp.tsx';
import SignIn from './pages/SignIn.tsx';
import Products from './pages/Products.tsx';
import AddProduct from './pages/AddProduct.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
