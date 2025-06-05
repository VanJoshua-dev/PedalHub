import React from 'react'
import './App.css'
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './loginPage/LandingPage'
import Loginform from './loginPage/Loginform';
import SignupPage from './loginPage/SignupPage';
import HomePage from './userView/HomePage';
import PageError from './404Error/PageError';
import AdminDashboard from './adminPages/AdminDashboard';
import Transactions from './adminPages/Transactions';
import Orders from './adminPages/Orders';
import Products from './adminPages/Products';
import Sales from './adminPages/Sales';
import Users from './adminPages/Users';
function App() {
  return (
     
    <>
       <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Loginform />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* User Routing */}
          <Route path="/home" element={<HomePage />} />

          {/* Admin Routing */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/users" element={<Users />} />

          {/* Page not found */}
          <Route path="*" element={<PageError />} />
        </Routes>
    
    </>
     
  )
}

export default App
