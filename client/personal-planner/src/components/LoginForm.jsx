import React, { useState, useContext } from "react";
import "../style/LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../assets/animation.json";
import { AuthContext } from "../context/authContext";

const LoginForm = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // im using this from context as i want to store the response in the context / rather that using the custom hook useForm
      await logIn(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="main">
      <div className="lottie">
        <Lottie animationData={animation} />
      </div>
      <div className="form">
        <h1> My PLanner</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <input
            type="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
          <span>
            Don't you have an account?{" "}
            <Link className="register" to={"/register"}>
              Register
            </Link>
          </span>
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
