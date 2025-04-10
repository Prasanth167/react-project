import React, { useEffect, useState } from 'react';
import './CartComponent.css';
import { useNavigate } from 'react-router-dom';

export const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = id => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () =>
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  const calculateDiscount = (originalPrice, discountedPrice) => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  const handleCheckout = () => {
    setShowConfirmation(true);
    localStorage.removeItem("cart");
    setCartItems([]);
    setTimeout(() => {
      setShowConfirmation(false);
      navigate("/cart");
    }, 3000);
  };

  if (cartItems.length === 0 && !showConfirmation) {
    return (
      <div >
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/home")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h2>Shopping Cart ({cartItems.length})</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td className="product-cell">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p className="category">Category: {item.category}</p>
                  </div>
                </td>
                <td>₹{item.price}</td>
                <td>
                  <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-right">
        <h3>Price Details</h3>
        {cartItems.map(item => (
          <div className="price-item" key={item.id}>
            <span>{item.title}</span>
            <span>₹{item.price} × {item.quantity}</span>
          </div>
        ))}
        <hr />
        <h4>Total: ₹{calculateTotal()}</h4>
        <button onClick={handleCheckout} disabled={cartItems.length === 0}>Checkout</button>
      </div>

      {showConfirmation && (
        <div className="popup">
          <p>Order Placed Successfully!</p>
        </div>
      )}
    </div>

  );
};