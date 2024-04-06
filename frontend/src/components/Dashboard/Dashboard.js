import React from "react";
import "./dashboard.scss";
import LogoContent from "./LogoContent";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
const Dashboard = () => {
  return (
    <>
      <section className="dashboard-container">
        <div className="logo">
         <h1>dribble</h1>
        </div>
        <div className="content">
          <div className="wrapper">
            <div className="heading">
              <h1>Welcome! Let's create your profile</h1>
              <p>Let others get to know you better! You can do this later </p>
            </div>
            <div className="profile-container">
              <div className="avatar">
                <p>Add an avatar</p>
                <p><MdOutlineAddAPhoto/></p>
              </div>
              <div className="choose-avatar">
                <p>
                  <input type="file" placeholder="Choose Image" />
                </p>
                <p><FaChevronRight/>or choose one of our defaults</p>
              </div>
            </div>
            <div className="location">
              <p><label for="location">Add your location</label></p>
              <p><input type="text" name="location" placeholder="Enter a location"/></p>
            </div>
            <div className="btn-container">
              <button>Next</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
