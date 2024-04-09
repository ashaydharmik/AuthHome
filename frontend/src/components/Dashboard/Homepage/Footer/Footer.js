import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoBasketballOutline } from "react-icons/io5";
import { FaPinterest } from "react-icons/fa";
import "./footer.scss"
const Footer = () => {
  return (
    <>
    <section className='footer-container'>
        <div className='footer'>
            <div className='col'>
                <h1>dribble</h1>
                <p>Dribble is the world's leading community for creatives to share, grow and get hire.</p>
                <p className='icons'>
                    <span><IoBasketballOutline/></span>
                    <span><FaTwitter/></span>
                    <span><FaFacebookSquare/></span>
                    <span><FaInstagram/></span>
                    <span><FaPinterest/></span>
                </p>
            </div>
            <div className='col'>
                <p>For Designers</p>
                <p>Go Pro!</p>
                <p>Explore Design work</p>
                <p>Design blog</p>
                <p>Overtime broadcast</p>
                <p>Playoffs</p>
                <p>Weekly Warm-Up</p>
                <p>Refer a friend</p>
                <p>Code of conduct</p>
            </div>
            <div className='col'>
                <p>Hire Designers</p>
                <p>Post a Job opening</p>
                <p>Post a freelance project</p>
                <p>Search for designer</p>
                <p style={{color:"black"}}><b>Brands</b></p>
                <p>Advertise with us</p>
            </div>
            <div className='col'>
                <p>Company</p>
                <p>About</p>
                <p>Careers</p>
                <p>Support</p>
                <p>Media Kit</p>
                <p>Testimonials</p>
                <p>API</p>
                <p>Terms of service</p>
                <p>Privacy policy </p>
                <p>Cookie policy </p>
            </div>
            <div className='col'>
                <p>Directories</p>
                <p>Design job</p>
                <p>Designers for hire</p>
                <p>Freelance designers for hire</p>
                <p>Tags</p>
                <p>Places</p>
                <p style={{color:"black"}}><b>Design Assets</b></p>
                <p>Dribble Marketplace</p>
                <p>Creative Market</p>
                <p>Fontspring</p>
                <p>Font squirrel</p>
            </div>
            <div className='col'>
                <p>Design Resources</p>
                <p>Freelancing</p>
                <p>Design Hiring</p>
                <p>Design Portfolio</p>
                <p>Design Education</p>
                <p>Creative Process</p>
                <p>Design Industry Trends</p>
               
            </div>
        </div>
        <div className='footer-bottom'>
            <p>&copy; 2023 Dribble. All rights reserved.</p>
            <p><span>20,501,853 &nbsp;</span>shorts dribbled &nbsp;<span><IoBasketballOutline/></span></p>
        </div>
    </section>
    </>
  )
}

export default Footer