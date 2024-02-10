
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import ProductDetailPage from './ProductDetailPage.jsx';

function App() {

  return (
    <>
          <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
