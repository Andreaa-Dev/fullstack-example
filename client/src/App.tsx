import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";
import AccountRegisterForm from "./components/users/AccountRegisterForm";
import AccountLogInForm from "./components/users/AccountLogInForm";
import UserInformation from "./components/users/UserInformation";
import CartList from "./components/cart/CartList";
import NavBar from "./nav/NavBar";
import OrderList from "./components/orders/OrderList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:id" element={<ProductDetail />} />

        <Route path="/register" element={<AccountRegisterForm />} />
        <Route path="/login" element={<AccountLogInForm />} />
        <Route path="/user" element={<UserInformation />} />

        <Route path="/cart" element={<CartList />} />
        <Route path="/order" element={<OrderList />} />
      </Routes>
    </div>
  );
}

export default App;
