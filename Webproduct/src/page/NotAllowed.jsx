import React, { useState, useEffect } from "react";
import notAllowedImg from "../assets/signal.png";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const [counter, setCounter] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    const countDown = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(countDown);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countDown);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src={notAllowedImg}
            alt="Not Allowed"
            className="rounded-t-lg object-cover h-48 w-full"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title text-red-500 text-2xl">Access Denied</h2>
          <p className="text-gray-700">
            You do not have the required permissions to view this page.
          </p>
          <p className="text-gray-500 mt-2">
            Redirecting to the homepage in {counter} seconds...
          </p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-error"
              onClick={() => navigate(-1)} // Go back to the previous page
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;
