import React, { useState, useEffect } from 'react';
import './navbar.scss';
import { IoIosSearch } from 'react-icons/io';
import { BiMessageX } from 'react-icons/bi';
import axios from 'axios';
import { useGlobal } from "../../../Context/Context";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [userData, setUserData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
const {navigate} = useGlobal()
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('user')) || { token: null, id: null };
    const userToken = auth.token;
    const userId = auth._id;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    };

    axios
      .get(`https://authhome.onrender.com/currentUser/${userId}`, { headers })
      .then((res) => {
        console.log(res.data.user);
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpload=()=>{
    navigate("/dashboard")
  }
  return (
    <>
      <div className='navbar'>
        <div className='wrapper'>
          <div className='logo'>
            <h1>dribble</h1>
          </div>
          <button className='toggle-menu' onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <RxCross1 /> : <FaBars />}
          </button>
          {showMenu && (
            <div className='overlay' onClick={() => setShowMenu(false)}>
              <div className={`nav-items1 ${showMenu ? 'show' : ''}`}>
            <ul>
              <li>Inspiration</li>
              <li>Find Work</li>
              <li>Learn Design</li>
              <li>Go Pro</li>
              <li>Hire Designers</li>
            </ul>
          </div>
            </div>
          )}
          <div className={`nav-items`}>
            <ul>
              <li>Inspiration</li>
              <li>Find Work</li>
              <li>Learn Design</li>
              <li>Go Pro</li>
              <li>Hire Designers</li>
            </ul>
          </div>
        </div>
        <div className='wrapper-1'>
          <div className='search-bar'>
            <span>
              <IoIosSearch />
            </span>
            <input type='search' placeholder='Search' />
          </div>
          <div className='profile'>
            <span>
              <BiMessageX />
            </span>
            <p>
            </p>
          </div>
          <div className='btn-container'>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
