import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  // State to hold login values
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // Hooks
  const navigate = useNavigate();
  const { login, user: loggedInUser } = useAuthContext();

  // Redirect if user is already logged in
  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(user.username, user.password);
      console.log('currentUser', currentUser)
      if (currentUser.status === 200) {
        login(currentUser.data);
        Swal.fire({
          title: "User Login",
          text: "Login Successful",
          icon: "success",
        });
        setUser({
          username: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  // Function to navigate to registration page
  const toRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-20 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
               Login Digital Hub
            </h1>
            <span className="font-light text-gray-500 mt-2">
              Welcome  Digital Hub Login
            </span>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                {/* Username Input */}
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      name="username"
                      className="grow input input-bordered border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="Username"
                      value={user.username}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {/* Password Input */}
                <div className="form-control mt-5">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      name="password"
                      className="grow input input-bordered border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {/* Login Button */}
                <button
                  onClick={handleSubmit}
                  className="btn btn-neutral w-full mt-5 font-semibold rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Login
                </button>
                {/* Cancel Button */}
                <button
                  className="btn btn-error w-full mt-2"
                  onClick={() => setUser({ username: "", password: "" })}
                >
                  Cancel
                </button>
                {/* Register Link */}
                <div className="text-center text-gray-500 mt-5">
                  Don't have an account?{" "}
                  <button
                    onClick={toRegister}
                    className="bg-red-500 text-white rounded-md p-2 w-full hover:bg-blue-600"
                  >
                    Register
                  </button>
                </div>
                {/* Terms of Service */}
                <div className="text-center mt-4 text-sm">
                  <p className="text-md">
                    By logging in, you agree to our, <br />
                    <a href="#" className="link link-hover font-bold">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="link link-hover font-bold">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Uncomment the section below if you want an image on the right side */}
        {/* <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div>
            <img
              src="./25459d1991189f8c04c6e63678f09336.gif"
              alt="res"
              className="w-full h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
