import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Cart({ cart, setCart }) {
  const [userName, setUserName] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(null);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const placeOrder = async () => {
    const order = {
      userName,
      items: cart.map(c => ({ foodId: c._id, qty: c.qty })),
      totalAmount: total
    };
    const res = await axios.post(`${API_URL}/orders`, order);
    setOrderPlaced(res.data);
    setCart([]); // clear cart
  };

  return (
        <div
      style={{
        backgroundImage: 'url("/images/bg-2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                {item.name} - ${item.price} x {item.qty}
              </li>
            ))}
          </ul>
          <h5>Total: ${total}</h5>
          <input
            type="text"
            placeholder="Your Name"
            className="form-control mb-2"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="btn btn-success" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
      {orderPlaced && (
        <div className="alert alert-success mt-3">
          Order placed! Your Order ID: {orderPlaced._id}
        </div>
      )}
    </div>
  );
}

export default Cart;
