import React from "react";
// import "../src/Register.css";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  // const navigate = useNavigate();
  const urdata = [
    {
      username: "",
      password: "",
      email: "",
      confirmpassword: "",
    },
  ];
  const [data, setData] = useState({ urdata });
  const [submitting, setsubmitting] = useState(false);
  const [error, seterror] = useState("");
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    setsubmitting(true);
    try {
      const response = await axios.post("http://localhost:4000/register", data);
      seterror("");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <div className="login">
      <div className="wrapper">
        <form action="" onSubmit={handlesubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handlechange}
              placeholder="UserName"
              required
            />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handlechange}
              placeholder="Email"
              required
            />
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handlechange}
              placeholder="Password"
              // required
            />
            <i className="fa-solid fa-lock"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmpassword"
              value={data.confirmpassword}
              onChange={handlechange}
              placeholder="ConfirmPassword"
              required
            />
            <i className="fa-solid fa-lock"></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            {/* <Link className="links" to={"/"}>
              Login
            </Link> */}
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Registering.." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;