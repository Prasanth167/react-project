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
        <button  onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div >
      <div>
        <h1>Your Shopping Cart ({cartItems.length})</h1>
      </div>

     <div className="products-table">
     <div className='products'>
        <table className='table' >
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              {/* <th>Total</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} >
                <td >
                  <div >
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div >
                    <h3>{item.title}</h3>
                    {item.variant && <p>{item.variant}</p>}
                    <p >Seller: {item.seller || "Generic Seller"}</p>
                  </div>
                </td>
                <td >
                  <div >
                    <span >₹{item.discountedPrice?.toLocaleString() || item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <>
                        <span >₹{item.originalPrice.toLocaleString()}</span>
                        <span>
                          {calculateDiscount(item.originalPrice, item.discountedPrice || item.price)}% off
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td >
                  <div className='quantity-button'>
                 <div>
                 <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                 </div>
                  <span>{item.quantity}</span>
                  <div>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  </div>
                </td>
                {/* <td>
                  ₹{( item.price) * item.quantity}
                </td> */}
                <td >
                  <button onClick={() => removeItem(item.id)}>
                    REMOVE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='price-details'>
        <h2>PRICE DETAILS</h2>
        <div >
          <span>Total Amount</span>
          <span>₹{calculateTotal().toLocaleString()}</span>
        </div>
        <button
          className="checkout-button"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          CHECK OUT
        </button>
      </div>
     </div>

      {showConfirmation && (
        <div className='popup'>
          <div>
            <h3>Order Placed Successfully!</h3>
            <p>Your order has been confirmed. You'll receive an email shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};