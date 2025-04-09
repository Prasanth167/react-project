
import React, { useEffect, useState } from 'react'
import './HomeComponent.css'
import { useNavigate } from 'react-router-dom';

export const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  return (
    <div className="product-page">
    <h1>Our Products</h1>
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <h3>{product.title}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">
              {product.description.length > 100
                ? `${product.description.substring(0, 100)}...`
                : product.description}
            </p>
            <div className="product-footer">
              <span className="product-price">${product.price}</span>
              <span className="product-rating">
                {product.rating.rate}  ({product.rating.count} reviews)
              </span>
            </div>
            <button className="add-to-cart"  onClick={() => navigate(`/product/${product.id}`)} >Product Details</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
