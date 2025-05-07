import React, { useContext } from "react";
import "../style/navbar.css";

import { NavLink } from "react-router-dom"; // Import NavLink
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { currentUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <p>
            {currentUser
              ? `${currentUser.first_name} ${currentUser.last_name}`
              : "Guest"}
          </p>
        </div>

        <div className="links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Create Event
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>

          <span className="log-out" onClick={handleLogOut}>
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
