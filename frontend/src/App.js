import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import FoodList from "./components/FoodList";
import Cart from "./components/Cart";
import OrderStatus from "./components/OrderStatus";
import AdminPanel from "./components/AdminPanel";
import './App.css';  // or the correct CSS file path


function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <NavBar cart={cart} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<FoodList cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/status" element={<OrderStatus />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
