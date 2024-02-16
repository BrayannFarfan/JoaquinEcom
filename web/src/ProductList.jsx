import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductListItem from './ProductListItem';

const ProductList = () => {
  const [products, setProducts] = useState([]);


  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzA3NTI4MzUwLCJleHAiOjE3MDgxMzMxNTB9.dk__4vv-BCBJu48geqNvdENvo1NeXAmGb4sFGyakTzM'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/products', {
            headers:{
              'x-access-token': apiKey 
            }
          });
        setProducts(response.data.getAllProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        // Manejo de errores
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map(product => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
