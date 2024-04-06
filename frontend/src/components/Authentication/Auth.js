import React from "react";
import "./auth.scss";
import authimg from "../../assets/authimg.jpg";
import Register from "../Authentication/Register/Register";
import Login from "./Login/Login";
import { useGlobal } from "../Context/Context";
const Auth = () => {
  const { showRegister } = useGlobal();

  return (
    <>
      <section className="authentication">
        <div className="left-container">
          <div className="content-container">
            <div className="image-container">
       
            </div>
          </div>
        </div>
        <div className="right-container">
          {showRegister ? <Register /> : <Login />}
        </div>
      </section>
    </>
  );
};

export default Auth;
