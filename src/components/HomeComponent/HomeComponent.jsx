
import React, { useEffect, useState } from 'react'
import './HomeComponent.css'
import { useNavigate } from 'react-router-dom';

export const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {   
        console.log('products data empty ')
      }  
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
    <h1>Our Products</h1>
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div>
            <img src={product.image} alt={product.title} />
          </div>
          <div>
            <h3>{product.title}</h3>
            <p>{product.category}</p>
            <p>
              {product.description.length > 100
                ? `${product.description.substring(0, 100)}...`
                : product.description}
            </p>
            <div className="product-footer">
              <span>${product.price}</span>
              <span>
                {product.rating.rate}  ({product.rating.count} reviews)
              </span>
            </div>
            <button onClick={() => navigate(`/product/${product.id}`)} >Product Details</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
