import React from "react";
import 'animate.css';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "@fontsource-variable/inter";
import Main from "./admin/main-container/main-container";
import AdminDashboard from "./admin/pages/admin-dashboard";
import TransactionList from "./admin/pages/categories";
import OrderList from "./admin/pages/order-list";
import ProductList from "./admin/pages/product-list";
import UserList from "./admin/pages/user-list";
import Loginform from "./auth-pages/login-form";
import LandingPage from "./landing-page/landing-page";
import SignupPage from "./auth-pages/register-form";
import ForgotPassword from "./auth-pages/forgot-password";
import ResetPassword from "./auth-pages/reset-password";
import ProductsCategories from "./admin/pages/categories";
function App() {
  return (
    <Routes>
      {/**
       * Default page
       */}
       <Route path="/" element={<LandingPage />} />

      {/**
       * Auth Pages
       */}
        <Route path="/login" element={<Loginform />} />
        <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/dashboard" element={<Main />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="products/categories" element={<ProductsCategories />} />
        <Route path="customers" element={<UserList />} />
      </Route>

      {/* Auth
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
    </Routes>
  );
}

export default App;
