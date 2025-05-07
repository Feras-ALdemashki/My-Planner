// utils/useForm.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useForm = (initialValues, url, onSuccessRedirect = null) => {
  // setting a states for the inputs and the error and the url
  const [inputs, setInputs] = useState(initialValues);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // this will take the user input and store it as inputs
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // on submit i take the user input and send it to the backend as post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, inputs, { withCredentials: true });
      if (onSuccessRedirect) navigate(onSuccessRedirect);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };
  // will return this to use it in my components
  return {
    inputs,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
