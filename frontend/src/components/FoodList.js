import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function FoodList({ cart, setCart }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/foods`).then(res => setFoods(res.data));
  }, []);

  const addToCart = (food) => {
    setCart([...cart, { ...food, qty: 1 }]);
  };

  return (
    <div className="row">
      {foods.map(food => (
        <div className="col-md-4" key={food._id}>
          <div className="card mb-3">
            <img src={food.image} className="card-img-top" alt={food.name} />
            <div className="card-body">
              <h5 className="card-title">{food.name}</h5>
              <p className="card-text">${food.price}</p>
              <button className="btn btn-primary" onClick={() => addToCart(food)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodList;
