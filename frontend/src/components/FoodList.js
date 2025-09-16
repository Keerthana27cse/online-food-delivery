import React, { useEffect, useState } from "react";
import axios from "axios";



const API_URL = process.env.REACT_APP_API_URL;

function FoodList({ cart, setCart }) {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [updatedFood, setUpdatedFood] = useState({ name: "", category: "", price: "", image: "" });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = () => {
    axios.get(`${API_URL}/foods`)
      .then(res => setFoods(res.data))
      .catch(err => console.error("Error fetching foods:", err));
  };

  const addToCart = (food) => {
    setCart([...cart, { ...food, qty: 1 }]);
  };

  const deleteFood = (id) => {
    axios.delete(`${API_URL}/foods/${id}`)
      .then(() => fetchFoods())
      .catch(err => console.error("Error deleting food:", err));
  };

  const startEdit = (food) => {
    setEditingFood(food._id);
    setUpdatedFood({ name: food.name, category: food.category, price: food.price, image: food.image });
  };

  const saveEdit = (id) => {
    axios.put(`${API_URL}/foods/${id}`, updatedFood)
      .then(() => {
        setEditingFood(null);
        fetchFoods();
      })
      .catch(err => console.error("Error updating food:", err));
  };

  return (
    <div className="container my-4">
      <div className="row">
        {foods.length === 0 ? (
          <p>Loading food items...</p>
        ) : (
          foods.map(food => (
            <div className="col-12 col-sm-6 col-md-4 mb-3" key={food._id}>
              <div className="card h-100">
                <img
                  src={food.image}
                  className="card-img-top"
                  alt={food.name}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body d-flex flex-column">
                  {editingFood === food._id ? (
                    <>
                      <input
                        className="form-control mb-2"
                        value={updatedFood.name}
                        onChange={(e) => setUpdatedFood({ ...updatedFood, name: e.target.value })}
                      />
                      <input
                        className="form-control mb-2"
                        value={updatedFood.category}
                        onChange={(e) => setUpdatedFood({ ...updatedFood, category: e.target.value })}
                      />
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={updatedFood.price}
                        onChange={(e) => setUpdatedFood({ ...updatedFood, price: e.target.value })}
                      />
                      <input
                        className="form-control mb-2"
                        value={updatedFood.image}
                        onChange={(e) => setUpdatedFood({ ...updatedFood, image: e.target.value })}
                      />
                      <button className="btn btn-success mb-2" onClick={() => saveEdit(food._id)}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setEditingFood(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{food.name}</h5>
                      <p className="card-text">📍 ${food.price}</p>
                      <button className="btn btn-primary mb-2" onClick={() => addToCart(food)}>Add to Cart</button>
                      <button className="btn btn-warning me-2" onClick={() => startEdit(food)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteFood(food._id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FoodList;
