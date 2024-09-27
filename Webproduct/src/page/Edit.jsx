import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RestaurantService from "../services/restaurant.service"; // Make sure the import matches your file name

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resto, setRestos] = useState({
    name: "",
    type: "",
    imageUrl:
      "https://cms.dmpcdn.com/food/2024/01/19/60acdbd0-b6ae-11ee-be74-a3cdac836376_webp_original.webp",
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await RestaurantService.getrestaurantById(id);
        if (response.status === 200) {
          setRestos(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch restaurant data.",
          icon: "error",
        });
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    setRestos({ ...resto, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission
    const updatedRestaurant = { ...resto };

    try {
      const response = await RestaurantService.editRestaurant(
        id,
        updatedRestaurant
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Restaurant Update",
          text: response.data.message,
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Restaurant Update",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  
  return (
    <div className="container flex flex-col items-center p-4 mx-auto space-y-6">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">TITLE</span>
            </label>
            <input
              type="text"
              placeholder="ชื่ออาหาร"
              className="input input-bordered"
              required
              name="name"
              id="name"
              value={resto.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">TYPE</span>
            </label>
            <input
              type="text"
              placeholder="หมวดหมู่"
              className="input input-bordered"
              required
              name="type"
              id="type"
              value={resto.type}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">IMAGE</span>
            </label>
            <input
              type="text"
              placeholder="รูปอาหาร"
              className="input input-bordered"
              required
              name="imageUrl"
              id="imageUrl"
              value={resto.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
