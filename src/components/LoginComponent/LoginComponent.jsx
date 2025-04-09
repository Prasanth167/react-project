import axios from 'axios';
import React from 'react'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HeaderComponent } from '../HeaderComponent/HeaderComponent';

export const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  let header = HeaderComponent;
  if(header){
    <HeaderComponent/>
  }
    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Invalid login!");
    }
  };
  return (
    <div className="login-container">
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

// export default LoginComponent