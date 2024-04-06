import React, { useState } from "react";
import "./register.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useGlobal } from "../../Context/Context";
import Login from "../Login/Login";
import { GoDotFill } from "react-icons/go";

const Register = () => {
  const initialValue = {
    name: "",
    username: "",
    email: "",
    password: "",
    checkbox: false 
  };
  const [registerData, setRegisterData] = useState(initialValue);
  const { setShowRegister } = useGlobal();
  const [showLogin, setShowLogin] = useState(false);
  const [errMsg, setErrMsg] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setRegisterData({
      ...registerData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        registerData
      );

      if (response.data && response.data.message) {
        toast.success(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data));
        setRegisterData(initialValue);
        setShowLogin(true);
      }
    } catch (error) {
      console.log("Error during registration:", error);
      setErrMsg(error)

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrMsg(error.response.data.message);
      } else {
        console.log("An error occurred during registration");
      }
    }
  };

  return (
    <>
     
 {showLogin ? (
        <Login />
      ) : (
      <section className="register-container">

        <div className="login-text">
          <p>Already a member? <span onClick={() => setShowRegister(false)}>Sign In</span></p>
        </div>
        <div className="wrapper">
        <div className="heading">
            <h1>Sign up to Dribble</h1>
            <p> {errMsg && <GoDotFill style={{ marginRight: '5px', position:"relative",
          top:"1px", fontSize:"10px" }} />}
  {errMsg && errMsg}</p>
          </div>
          <div className="form-container">
          <form onSubmit={handleSubmit}>
              <div className="info">
                <p>
                  <label>Name</label>
                  <input
                    type="text"
                    
                    name="name"
                    value={registerData.name}
                    onChange={handleChange}
                  />
                </p>
                <p>
                <label>Username</label>
                  <input
                    type="text"
                
                    name="username"
                    value={registerData.username}
                    onChange={handleChange}
                  />
                </p>
                </div>
                <p>
                <label>Email</label>
                  <input
                    type="email"
                  
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                  />
                </p>
                <p>
                <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                  />
                </p>
                <div className="checkbox">
                  <input type="checkbox" name="checkbox" value={registerData.checkbox} onChange={handleChange} />
                  <p>Creating an account means you're okay with our<span>Terms of Service, Privacy Policy,</span> and our default <span>Notification Settings.</span></p>
                  
                </div>
                <div className="btn-container">
                <button type="submit">Create Account</button>
              </div>
              <div className="note">
                <p id="noted">This site is protected by reCAPTCHA and the Google <span>Privacy Policy </span>and <span>Terms of Service</span> apply</p>
              </div>
            </form>
          </div>
        </div>
       
      </section>
      )}
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            width: "350px",
            fontSize: "18px",
          },
        }}
      />
    </>
  );
};

export default Register;
