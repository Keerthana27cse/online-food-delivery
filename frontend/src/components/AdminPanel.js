import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function AdminPanel() {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newFood, setNewFood] = useState({ name: "", category: "", price: "", image: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${API_URL}/foods`).then(res => setFoods(res.data));
    axios.get(`${API_URL}/orders`).then(res => setOrders(res.data));
  };

  const addFood = async () => {
    await axios.post(`${API_URL}/foods`, newFood);
    setNewFood({ name: "", category: "", price: "", image: "" });
    fetchData();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_URL}/orders/${id}/status`, { status });
    fetchData();
  };

  const markPaid = async (id) => {
    await axios.put(`${API_URL}/orders/${id}/payment`);
    fetchData();
  };

  return (
    <div>
      <h3>Admin Panel</h3>
      <div className="mb-4">
        <h5>Add Food</h5>
        <input className="form-control mb-2" placeholder="Name" value={newFood.name} onChange={(e) => setNewFood({...newFood, name: e.target.value})} />
        <input className="form-control mb-2" placeholder="Category" value={newFood.category} onChange={(e) => setNewFood({...newFood, category: e.target.value})} />
        <input className="form-control mb-2" placeholder="Price" value={newFood.price} onChange={(e) => setNewFood({...newFood, price: e.target.value})} />
        <input className="form-control mb-2" placeholder="Image URL" value={newFood.image} onChange={(e) => setNewFood({...newFood, image: e.target.value})} />
        <button className="btn btn-primary" onClick={addFood}>Add Food</button>
      </div>

      <h5>Orders</h5>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order._id} className="list-group-item">
            <strong>User:</strong> {order.userName} <br />
            <strong>Total:</strong> ${order.totalAmount} <br />
            <strong>Status:</strong> {order.status} <br />
            <strong>Payment:</strong> {order.paymentStatus} <br />
            <button className="btn btn-sm btn-info me-2" onClick={() => updateStatus(order._id, "Preparing")}>Preparing</button>
            <button className="btn btn-sm btn-warning me-2" onClick={() => updateStatus(order._id, "Out for Delivery")}>Out for Delivery</button>
            <button className="btn btn-sm btn-success me-2" onClick={() => updateStatus(order._id, "Delivered")}>Delivered</button>
            <button className="btn btn-sm btn-dark" onClick={() => markPaid(order._id)}>Mark Paid</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
