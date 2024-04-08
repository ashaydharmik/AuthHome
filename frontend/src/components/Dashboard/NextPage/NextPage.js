import React from 'react'
import toast, { Toaster } from "react-hot-toast";
import "./nextPage.scss"
import { FaChevronLeft } from "react-icons/fa";
import option1 from "../../../assets/option1.jpg"
import option2 from "../../../assets/option2.jpg"
import option3 from "../../../assets/option3.jpg"
import { useGlobal } from '../../Context/Context';
const NextPage = () => {
    const {navigate} = useGlobal()

    const goBack=()=>{
        navigate("/dashboard")
    }
  return (
    <>
    <section className="next-container">
        <div className="logo">
          <h1>dribble</h1>
          <span><FaChevronLeft onClick={goBack}/></span>
        </div>
        <div className="content">
          <div className="wrapper">
            <div className="heading">
              <h1>What brings you to Dribble?</h1>
              <p>Select the option that best describe you. Don't worry you can explore other options later.</p>
            </div>
            <div className='options'>
                <div className='option-1'>
                    <img src={option1} alt=''/>
                    <h3>I'm a designer looking to share my work</h3>
                    <p>With over 7n million shots from a vast community of designers, Dribble is the leading source for Design inspiration</p>
                    <input type='checkbox'/>
                </div>
                <div className='option-1'>
                <img src={option2} alt=''/>
                    <h3>I'm looking to hire a designer</h3>
                    <input type='checkbox'/>
                </div>
                <div className='option-1'>
                <img src={option3} alt=''/>
                    <h3>I'm looking for design inspiration</h3>
                    <input type='checkbox'/>
                </div>
            </div>
            <div className='btn-container'>
                <p>Anything else? You can select multiple.</p>
                <button>Finish</button>
                <span>or press RETURN</span>
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
  )
}

export default NextPage