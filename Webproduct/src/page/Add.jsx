import React, { useState } from "react";
import RestaurantService from "../services/restaurant.service";
import Swal from "sweetalert2";

const Add = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantService.insertRestaurant(restaurant);
      if (response.status === 200) {
        Swal.fire({
          title: "Add Restaurant",
          text: "Restaurant Added Successfully",
          icon: "success",
        });
        setRestaurant({
          name: "",
          type: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Add Restaurant",
        text: error.response.data.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-2xl text-center">Add Restaurant</h1>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            Restaurant Name
            <input
              type="text"
              name="name" // Ensure this matches state and API
              className="grow"
              placeholder="Restaurant Name"
              value={restaurant.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Restaurant Type
            <input
              type="text"
              name="type" // Ensure this matches state and API
              className="grow"
              placeholder="Restaurant Type"
              value={restaurant.type}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Restaurant Image URL
            <input
              type="text"
              name="imageUrl" // Ensure this matches state and API
              className="grow"
              placeholder="Restaurant Image URL"
              value={restaurant.imageUrl}
              onChange={handleChange}
            />
          </label>
          {restaurant.imageUrl && (
            <div className="flex items-center gap-2">
              <img
                src={restaurant.imageUrl}
                className="h-32"
                alt="Restaurant"
              />
            </div>
          )}
          <button type="submit" className="btn btn-success">
            Add Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
