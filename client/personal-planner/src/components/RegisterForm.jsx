import "../style/LoginRegister.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../assets/animation.json";
import useForm from "../utils/useForm";
const baseUrl = import.meta.env.VITE_BASE_URL;
const RegisterForm = () => {
  const { inputs, error, handleChange, handleSubmit } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    `${baseUrl}/auth/register`,
    "/login"
  );

  return (
    <div className="main">
      <div className="lottie">
        <Lottie animationData={animation} />
      </div>
      <div className="form">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <p>{error}</p>
          <button type="submit">Register</button>

          <span>
            Do you have an account?{" "}
            <Link className="register" to={"/login"}>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
