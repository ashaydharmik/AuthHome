import React, { useState } from "react";
import "../Register/register.scss";
import "./login.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useGlobal } from "../../Context/Context";
import { GoDotFill } from "react-icons/go";
const Login = () => {
  const initialValue = { email: "", password: "" };
  const [loginData, setLoginData] = useState(initialValue);
  const { navigate, setShowRegister } = useGlobal();
  const [errMsg, setErrMsg] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setLoginData({
      ...loginData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        loginData
      );

      if (response.data && response.data.message) {
        toast.success(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoginData(initialValue);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      setErrMsg(error)

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrMsg(error.response.data.message);
      } else {
        console.log("An error occurred during Login");
      }
    }
  };

  return (
    <>
       <section className="register-container">

<div className="login-text">
  <p>Not a member? <span onClick={() => setShowRegister(true)}>Sign Up</span></p>
</div>
<div className="wrapper">
<div className="heading">
    <h1>Sign In to Dribble</h1>
    <p> {errMsg && <GoDotFill style={{ marginRight: '5px', position:"relative",
          top:"1px", fontSize:"10px" }} />}
  {errMsg && errMsg}</p>
  </div>
  <div className="form-container">
  <form onSubmit={handleSubmit}>
        <p>
        <label>Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
        </p>
        <p>
        <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </p>
        <div className="checkbox">
          <input type="checkbox" name="checkbox" value={loginData.checkbox} onChange={handleChange} />
          <p>Creating an account means you're okay with our<span>Terms of Service, Privacy Policy,</span> and our default <span>Notification Settings.</span></p>
          
        </div>
        <div className="btn-container">
        <button type="submit">Sign In</button>
      </div>
      <div className="note">
        <p id="noted">This site is protected by reCAPTCHA and the Google <span>Privacy Policy </span>and <span>Terms of Service</span> apply</p>
      </div>
    </form>
  </div>
</div>

</section>

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

export default Login;
