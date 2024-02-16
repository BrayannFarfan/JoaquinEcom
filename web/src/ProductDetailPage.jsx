import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productHighs, setProductHighs] = useState([]);
  const [productColor, setProductColor] = useState([]);
  const [colors , setColor] = useState([])
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzA3OTQyMjgzLCJleHAiOjE3MDg1NDcwODN9.fPMtDd9Bz1omgzun-CrxsOPRfqqgqc8PIcogJLNiXxE';

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`, {
          headers: {
            'x-access-token': apiKey 
          }
        });
        setProduct(response.data.getOneProducts);
        setProductHighs(response.data.highs);
        setProductColor(response.data.colors)
      } catch (error) {
        console.error('Error al obtener el detalle del producto:', error);
        // Manejo de errores
      }
    };

    const fetchColors = async () =>{
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/color`, {
          headers: {
            'x-access-token': apiKey 
          }
        })

        console.log(res.data);
        setColor(res.data)
      } catch (error) {
        
      }
    }

    fetchProductDetail();
    fetchColors();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Precio: {product.price}</p>
      <p>Descripción: {product.description}</p>
      <h3> Highs</h3>
      {
        productHighs.map((item, i) =>{
          return <li key={i}>{item.name}</li>
        })
      }
      <h3>Colores</h3>
      {
      productColor.map((item, i) =>{
        return <li key={i}>{item.name}</li>
        
      })
      }

      <select name="" id="">
        {
          colors.map( (item, i) =>{
            return <option value={i}>{item.name}</option>
          })
        }
      </select>

    </div>
  );
};

export default ProductDetailPage;
