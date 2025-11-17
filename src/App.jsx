import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "@fontsource-variable/inter";
import Main from "./admin/main-container/main-container";
import AdminDashboard from "./admin/pages/admin-dashboard";
import TransactionList from "./admin/pages/transaction-list";
import OrderList from "./admin/pages/order-list";
import ProductList from "./admin/pages/product-list";
import UserList from "./admin/pages/user-list";
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Main />}>
        <Route index element={<AdminDashboard />} />
        <Route path="transactions" element={<TransactionList />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="users" element={<UserList />} />
      </Route>

      {/* Auth
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
    </Routes>
  );
}

export default App;
