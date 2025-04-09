import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ProductDetailsComponent.css'
export const ProductDetailsComponent = () => {
  const { id } = useParams(); // This gets the ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
   
      existingCart[existingItemIndex].quantity += 1;
    } else {
     
      existingCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
   
    navigate('/cart');
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to Products</button>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-container">
    <button className="back-button" onClick={() => navigate(-1)}>
      &larr; Back
    </button>
    
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <span className="product-price">${product.price}</span>
          <span className="product-rating">
            {product.rating.rate}  ({product.rating.count} reviews)
          </span>
        </div>
        
        <div className="product-actions">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>      
        </div>
      </div>
    </div>
  </div>
  )
}
