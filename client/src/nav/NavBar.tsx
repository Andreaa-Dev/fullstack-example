import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to="/">Products</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/user">User</Link>

      <Link to="/cart">Cart</Link>
    </div>
  );
}
