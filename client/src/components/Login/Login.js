// Login.js

import "./Login.css"

import { useState } from "react";
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
    );
  };
  
  export default Login;
