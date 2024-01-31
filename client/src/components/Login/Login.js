// Login.js

import "./Login.css";

import React, { useState } from "react";

import validation from "../validation/validation";

const Login = ({ login }) => {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setErrors(validation({
      ...userData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <div className="login-container">
       <div className="background-image" style={{ backgroundImage: 'url(https://www.lavanguardia.com/andro4all/hero/2019/02/Fondos-de-pantalla-de-Pokemon.jpg?width=1200)', zIndex: 1 }}>
        <form className="login" onSubmit={handleSubmit}>
          <label className="label" htmlFor="email">Email:</label>
          <input className="input" type="email" name='email' value={userData.email} onChange={handleChange} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          <hr />
          <label htmlFor="password">Password:</label>
          <input className="input" type="password" name="password" value={userData.password} onChange={handleChange} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

          <button className="button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
