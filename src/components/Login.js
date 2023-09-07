import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [authdata, setauthdata] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.REACT_APP_LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authdata.email,
        password: authdata.password,
      })
    });
    const Auth = await response.json();

    if(Auth.Success){
        localStorage.setItem('token',Auth.Token);
        navigate("/Home");
    }else{
        alert("Invalid Token")
    }

  };

  const onchange = (e) => {
    setauthdata({ ...authdata, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginpage d-flex justify-content-center align-items-center rounded-4">
      <form
        className="d-flex flex-column justify-content-around loginform"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-6 text-light">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={authdata.email}
            onChange={onchange}
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-6 text-light">
            Password
          </label>
          <input
            type="password"
            className="form-control "
            id="password"
            name="password"
            value={authdata.password}
            onChange={onchange}
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" className="btn btn-primary p-2">
          Login
        </button>
        <p className="text-light fs-6">
          Haven't an Account?{" "}
           <Link className="fs-6" to={"/Signup"}>
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;