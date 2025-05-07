import React, { useContext, useState } from "react";
import "../style/profile.css";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;

const ProfileForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    firstName: currentUser.first_name,
    lastName: currentUser.last_name,
    email: currentUser.email,
    password: "",
  });
  const [err, setErr] = useState();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/users/${currentUser.id}`, inputs, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="firstName"
          placeholder={currentUser.first_name}
        />
        <input
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder={currentUser.last_name}
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder={currentUser.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>Update Profile</button>
        <p>{err}</p>
      </form>
    </div>
  );
};

export default ProfileForm;
