import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function FoodList({ cart, setCart }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/foods`)
      .then(res => setFoods(res.data))
      .catch(err => console.error("Error fetching foods:", err));
  }, []);

  const addToCart = (food) => {
    setCart([...cart, { ...food, qty: 1 }]);
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
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">📍 ${food.price}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(food)}
                  >
                    Add to Cart
                  </button>
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
