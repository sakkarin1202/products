import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";

const Register = () => {
  // State to hold form values
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      // Check if all fields are filled
      if (!user.username || !user.password || !user.email || !confirmPassword) {
        Swal.fire({
          title: "Validation Error",
          text: "Please fill in all fields.",
          icon: "warning",
        });
        return;
      }

      // Check if passwords match
      if (user.password !== confirmPassword) {
        Swal.fire({
          title: "Validation Error",
          text: "Passwords do not match.",
          icon: "warning",
        });
        return;
      }

      // Call the register service
      const register = await AuthService.register(
        user.username,
        user.email,
        user.password
      );

      if (register.status === 200) {
        Swal.fire({
          title: "User Registered",
          text: register.data.message,
          icon: "success",
        });
        setUser({
          username: "",
          password: "",
          email: "",
        });
        setConfirmPassword(""); // Reset confirm password
        navigate("/login"); // Redirect to login or another route after successful registration
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text:
          error.response && error.response.data.message
            ? error.response.data.message
            : "Unknown error",
        icon: "error",
      });
    }
  };

  const handleCancel = () => {
    setUser({
      username: "",
      password: "",
      email: "",
    });
    setConfirmPassword(""); // Reset confirm password
    navigate("/"); // Redirect to home or another route
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <form
          className="w-full divide-neutral-200 rounded-3xl bg-white shadow-2xl border p-8 lg:p-10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create an Account
          </h2>

          {/* Username Input */}
          <div className="py-2 space-y-3">
            <label htmlFor="username" className="block text-sm text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset focus:ring-2 text-xs"
              placeholder="Enter your username"
              required
            />
            <p
              className="text-red-500 text-xs mt-1"
              style={{ display: !user.username ? "block" : "none" }}
            >
              Username is required
            </p>
          </div>

          {/* Password Input */}
          <div className="py-2 space-y-3">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-2 focus:ring-inset text-xs"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              Password must contain at least one capital letter and a special character.
            </p>
            <p
              className="text-red-500 text-xs mt-1"
              style={{
                display: user.password && !/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(user.password)
                  ? "block"
                  : "none",
              }}
            >
              Password does not meet requirements
            </p>
          </div>

          {/* Confirm Password Input */}
          <div className="py-2 space-y-3">
            <label
              htmlFor="confirm_password"
              className="block text-sm text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-2 focus:ring-inset text-xs"
                placeholder="Confirm your password"
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>
            <p
              className="text-red-500 text-xs mt-1"
              style={{
                display: confirmPassword && user.password !== confirmPassword
                  ? "block"
                  : "none",
              }}
            >
              Passwords do not match
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-8 py-2 h-12 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
            >
              Register
            </button>
          </div>

          {/* Redirect to Login */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
