import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { LoginComponent } from './components/LoginComponent/LoginComponent'
import { HomeComponent } from './components/HomeComponent/HomeComponent'
import { ProductDetailsComponent } from './components/ProductDetailsComponent/ProductDetailsComponent'
import { CartComponent } from './components/CartComponent/CartComponent'
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'


const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/" />
}

function App() {
  return (
    <>
      <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/home" element={<PrivateRoute><HomeComponent /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetailsComponent /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><CartComponent /></PrivateRoute>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
