import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./loginPage/LandingPage";
import Loginform from "./loginPage/Loginform";
import SignupPage from "./loginPage/SignupPage";
import HomePage from "./userView/HomePage";
import PageError from "./404Error/PageError";
import AdminDashboard from "./adminPages/AdminDashboard";
import Transactions from "./adminPages/Transactions";
import Orders from "./adminPages/Orders";
import Products from "./adminPages/Products";
import Sales from "./adminPages/Sales";
import Users from "./adminPages/Users";
import SampleHome from "./userView/SampleHome";
import Cart from "./userView/Cart";
import CheckoutPage from "./userView/CheckOut";
import CartPage from "./userView/Cart";
import InvalidAccess from "./404Error/InvalidAccess";
import ForgotPassword from "./otherPage/Forgot";
import VerifyCode from "./otherPage/Verify";
import ResetPassword from "./otherPage/ResetPass";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* User Routing */}
        <Route path="/shop" element={<HomePage />} />
        <Route path="/samplehome" element={<SampleHome />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Admin Routing */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/users" element={<Users />} />

        {/* Page not found */}
        <Route path="*" element={<PageError />} />
        <Route path="/unauthorized" element={<InvalidAccess />} />

        {/* Auth */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
