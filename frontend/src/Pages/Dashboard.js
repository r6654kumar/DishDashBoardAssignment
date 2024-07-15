import React, { useState, useEffect } from 'react';
import axios from 'axios';
const DishItem = ({ dish, onToggle }) => (
  <div className='container'>
    <h3>{dish.dishName}</h3>
    <img src={dish.imageUrl} alt={dish.dishName} />
    <button onClick={() => onToggle(dish._id)}>
      {dish.isPublished ? 'Unpublish' : 'Publish'}
    </button>
  </div>
);

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
    const result = await axios.get('http://localhost:5000/api/dishes');
    console.log(result)
    setDishes(result.data);
  };

  const toggleDish = async (dishId) => {
    const result = await axios.post(`http://localhost:5000/api/dishes/${dishId}/toggle`);
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish._id === dishId ? result.data : dish
      )
    );
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <>
      <div className='displayMain'>
        {dishes.map((dish) => (
          <DishItem key={dish._id} dish={dish} onToggle={toggleDish} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
