import React from "react";
import { Link } from "react-router-dom";

function NavBar({ cart }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Food Delivery</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Foods</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart ({cart.length})</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/status">My Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
