import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const Signup = () => {

    const [authdata, setauthdata] = useState({name:"", email: "", password: "",cpassword:"" });
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(process.env.REACT_APP_SIGNUP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:authdata.name,
          email: authdata.email,
          password: authdata.password,
        }),
      });
      const SignupAuth = await response.json();
  
      if(SignupAuth.Success){
          window.localStorage.setItem('token',SignupAuth.Token);
          navigate("/Home");
      }else{
          alert("Invalid Token")
      }
    };
    const onchange = (e) => {
      setauthdata({ ...authdata, [e.target.name]: e.target.value });
    };

  return (
    <div className="signuppage d-flex justify-content-center align-items-center rounded-4">
      <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-around signupform">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-6 text-light">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            value={authdata.name}
            onChange={onchange}
            required
          />
        </div>
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
            placeholder="Enter email"
            value={authdata.email}
            onChange={onchange}
            required
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
            placeholder="Password"
            value={authdata.password}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label fs-6 text-light">
            Conform-Password
          </label>
          <input
            type="password"
            className="form-control "
            id="cpassword"
            name="cpassword"
            placeholder="Conform-Password"
            value={authdata.cpassword}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary p-2">
          Signup
        </button>
        <p className="text-light fs-6">
          Already have an Account? <Link to={"/"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
