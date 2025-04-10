import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ProductDetailsComponent.css'
export const ProductDetailsComponent = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log(`Error ${err}`)
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
  return (
    <div className="product-detail-container">
      <div>
        <input type='check'/>Mens
      </div>
    {
      product &&
    <div className="product-detail">
      <div className="image-container">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.category}</p>
        <p>{product.description}</p>
        
        <div>
          <span>${product.price}</span>
          <span>
            {product.rating.rate}  ({product.rating.count} reviews)
          </span>
        </div>
        
        <div>
          <button onClick={handleAddToCart}>Add to Cart</button>      
        </div>
      </div>
    </div>
    }
  </div>
  )
}
