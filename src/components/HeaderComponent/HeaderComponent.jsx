import React from 'react'
import './HeaderComponent.css'
import { Link, useNavigate } from 'react-router-dom'
export const HeaderComponent = () => {
  const navigate = useNavigate();
  const handleLogout = async() => {
    await localStorage.removeItem('token');
    navigate('/'); 
  };
  return (
    <>
  <header className="header">
      <div className="header-container">
        <Link to="/home" className="logo">
          Shopping
        </Link>
        <nav className="nav">
          <Link to="/home" className="nav-link">
            <span>Home</span>
          </Link>
          <Link to="/cart" className="nav-link">
            <span>Cart</span>
          </Link>
          <button className="logout-button" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
    </>
  )
}
