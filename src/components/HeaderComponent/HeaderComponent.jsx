import React from 'react'
import './HeaderComponent.css'
import { Link } from 'react-router-dom'
import { FaHome, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
export const HeaderComponent = () => {


  return (
    <>
  <header className="ecommerce-header">
      <div className="header-container">
        <Link to="/" className="logo">
          Shopping
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            {/* <FaHome className="nav-icon" /> */}
            <span>Home</span>
          </Link>
          
          <Link to="/cart" className="nav-link cart-link">
            {/* <FaShoppingCart className="nav-icon" /> */}
            {/* <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )} */}
            <span>cart</span>
          </Link>
          
          <button  className="nav-link logout-btn">
            {/* <FaSignOutAlt className="nav-icon" /> */}
            
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
    </>
  )
}
