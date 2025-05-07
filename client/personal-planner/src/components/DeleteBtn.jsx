import axios from "axios";
import React from "react";
import "../style/event.css";
const baseUrl = import.meta.env.VITE_BASE_URL;

const DeleteBtn = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/events/${id}`, {
        withCredentials: true,
      });
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button className="delete-btn" onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

export default DeleteBtn;
