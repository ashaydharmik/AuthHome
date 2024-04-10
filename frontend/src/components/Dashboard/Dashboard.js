import React, { useState } from "react";
import "./dashboard.scss";
import LogoContent from "./LogoContent";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import axios from "axios"
import { useGlobal } from "../Context/Context";
import toast, { Toaster } from "react-hot-toast";
const Dashboard = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [location, setLocation] = useState("");
  const [isReady, setIsReady] = useState(false); 
const {navigate} = useGlobal()
  const handleImageChange = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setProfilePicture(imageUrl);
    checkFormReady(imageUrl, location); // Call checkFormReady with updated values
  };

  const checkFormReady = (profilePicture, location) => {
    if (profilePicture && location) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    checkFormReady(profilePicture, newLocation); // Call checkFormReady with updated values
  };


  const handleNextClick = () => {
    const auth = JSON.parse(localStorage.getItem("user")) || { token: null, id: null };
    const userToken = auth.token;
    const userId = auth._id;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    };

    axios.put(`https://authhome.onrender.com/updateInfo/${userId}`, {
      profilePicture: profilePicture,
      location: location,
    }, { headers })
    .then(response => {
      console.log('Profile updated successfully:', response.data);
      toast.success("Profile updated successfully")
      setTimeout(() => {
        navigate("/next");
      }, 1000);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      toast.error("Error updating profile")
    });
  };



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
                <p>
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" height="110%" width="100%"/>
                  ) : (
                    <MdOutlineAddAPhoto />
                  )}
                </p>
              </div>
              <div className="choose-avatar">
                <p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </p>
                <p><FaChevronRight/>or choose one of our defaults</p>
              </div>
            </div>
            <div className="location">
              <p><label htmlFor="location">Add your location</label></p>
              <p>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter a location"
                  value={location}
                  onChange={handleLocationChange}
                />
              </p>
            </div>
            <div className="btn-container">
              <button className={`next-button ${!isReady ? 'disabled' : ''}`} onClick={handleNextClick} disabled={!isReady}>
                Next
              </button>
              
              {isReady && <p>or Press RETURN</p>}
            </div>
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
    </>
  );
};

export default Dashboard;
