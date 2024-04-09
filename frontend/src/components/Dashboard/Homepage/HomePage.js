import React from 'react'
import Navbar from './Navbar/Navbar'
import email from "../../../assets/mail.jpg"
import "./homePage.scss"
import Footer from './Footer/Footer'

const HomePage = () => {
  return (
    <>
    <section className='home-container'>
      <div className='navbar-container'>
        <Navbar/>
      </div>
      <div className='body-container'>
        <div className='content-box'>
          <h1>Please verify your email...</h1>
          <img src={email} alt=''/>
          <p>Please verify your email address. We've sent a confirmation email to:</p>
          <p id='mail'>account@refero.design</p>
          <p>Click that confirmation link in that email to begin using Dribble.</p>
          <p >Didn't receive the email? Click your Spam folder, it map have been caught by a filter. If<br/>you still don't see it you can <span>resend the confirmation email</span></p>
          <p>Wrong email address? <span>Change It.</span></p>
        </div>
      </div>
      <div className='footer-box'>
        <Footer/>
      </div>
    </section>
    </>
  )
}

export default HomePage