import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import LoginButton from "../Component/LoginButton";
import RegisterButton from "../Component/RegisterButton";
import UserProfile from "../Component/UserProfile";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const location = useLocation(); // Get the current location

  console.log("navbar");

  user.role = 'user'
  console.log("user", user);


  const menus = {
    ROLES_ADMIN: [
      { name: "Add Restaurant", link: "/add" },
      { name: "Search", link: "/" },
    ],
    ROLES_USER: [{ name: "Search", link: "/search" }],
    ROLES_MODERATOR: [
      { name: "Add Restaurant", link: "/add" },
      { name: "Home", link: "/" },
    ],
  };

  // console.log(menus[user.roles[0]])

  return (
    <div className="navbar bg-gray-800 rounded-lg shadow-lg text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user &&
              menus[user.roles[0]].map((menuItem) => (
                <li key={menuItem.name}>
                  <Link
                    to={menuItem.link}
                    className="hover:bg-gray-700 transition duration-200"
                  >
                    {menuItem.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          Digital Hub
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user &&
            menus[user.roles[0]].map((menuItem) => (
              <li key={menuItem.name}>
                <Link
                  to={menuItem.link}
                  className="hover:bg-gray-700 transition duration-200"
                >
                  {menuItem.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        {user && (
          <div>
            Welcome, <span className="text-yellow-400">{user.username}</span>{" "}
            {user.roles.map((role, index) => (
              <div key={index} className="badge badge-accent text-xs">
                {role}
              </div>
            ))}
          </div>
        )}

        {user ? (
          <UserProfile />
        ) : (
          // Conditionally render the Login and Register buttons
          <>
            {/* Conditionally render the Login button only if the current path is NOT '/login' or '/register' */}
            {!(
              location.pathname === "/login" ||
              location.pathname === "/register"
            ) && (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="btn btn-accent hover:bg-green-700 transition duration-200"
                >
                  Login
                </Link>
                <LoginButton />
              </div>
            )}
            {/* Show Register button only when on Home page */}
            {location.pathname === "/" && (
              <div className="space-x-2">
                <Link
                  to="/register"
                  className="btn btn-primary hover:bg-blue-600 transition duration-200"
                >
                  Register
                </Link>
                <RegisterButton />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
