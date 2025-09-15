import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function OrderStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/orders`).then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h3>My Orders</h3>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order._id} className="list-group-item">
              <strong>Order ID:</strong> {order._id} <br />
              <strong>Status:</strong> {order.status} <br />
              <strong>Payment:</strong> {order.paymentStatus} <br />
              <strong>Total:</strong> ${order.totalAmount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderStatus;
