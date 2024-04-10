import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import toast, { Toaster } from 'react-hot-toast';
import './nextPage.scss';
import { FaChevronLeft } from 'react-icons/fa';
import option1 from '../../../assets/option1.jpg';
import option2 from '../../../assets/option2.jpg';
import option3 from '../../../assets/option3.jpg';
import { useGlobal } from '../../Context/Context';

const NextPage = () => {
  const { navigate } = useGlobal();
  const [isReady, setIsReady] = useState(false); 
  const [checkedOptions, setCheckedOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const checkFormReady = () => {
    const isSelected = Object.values(checkedOptions).some((value) => value);
    setIsReady(isSelected);
  };
  
  
  const handleChange = (option) => {
    setCheckedOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }), () => {
      checkFormReady(); // Update isReady state immediately after updating checkedOptions state
    });
    
    setIsReady(true); // Set isReady to true whenever a checkbox is checked
  };
  
  

  const handleFinish = () => {
    const auth = JSON.parse(localStorage.getItem('user')) || { token: null, _id: null }; 
    const userToken = auth.token;
    const userId = auth._id;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    };
  
    const selectedOptions = Object.keys(checkedOptions).filter((option) => checkedOptions[option]);
  
    const validOptions = selectedOptions.filter((option) => ["work", "hire", "inspiration"].includes(option));
  
    if (validOptions.length === 0) {
      console.error('Error: No valid options selected');
      toast.error('Error: No valid options selected')
      return;
    }
  
    axios
      .put(`https://authhome.onrender.com/updateLookingFor/${userId}`, {
        lookingFor: validOptions,
      }, { headers })
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
        toast.success('Profile updated successfully');
        setTimeout(() => {
          navigate("/homepage");
        }, 1000);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        toast.error('Error updating profile');
      });
  };
  

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <section className="next-container">
        <div className="logo">
          <h1>dribble</h1>
          <span><FaChevronLeft onClick={goBack} /></span>
        </div>
        <div className="content">
          <div className="wrapper">
            <div className="heading">
              <h1>What brings you to Dribble?</h1>
              <p>Select the option that best describes you. Don't worry, you can explore other options later.</p>
            </div>
            <div className="options">
              <div className="option-1">
                <img src={option1} alt="" />
                <h3>I'm a designer looking to share my work</h3>
                <p>With over 7 million shots from a vast community of designers, Dribble is the leading source for Design inspiration</p>
                <input type="checkbox" checked={checkedOptions['work']} onChange={() => handleChange('work')} />
              </div>
              <div className="option-1">
                <img src={option2} alt="" />
                <h3>I'm looking to hire a designer</h3>
                <p>With over 7 million shots from a vast community of designers, Dribble is the leading source for Design inspiration</p>
                <input type="checkbox" checked={checkedOptions['hire']} onChange={() => handleChange('hire')} />
              </div>
              <div className="option-1">
                <img src={option3} alt="" />
                <h3>I'm looking for design inspiration</h3>
                <p>With over 7 million shots from a vast community of designers, Dribble is the leading source for Design inspiration</p>
                <input type="checkbox" checked={checkedOptions['inspiration']} onChange={() => handleChange('inspiration')} />
              </div>
            </div>
            <div className="btn-container">
              <p>Anything else? You can select multiple.</p>
              <button onClick={handleFinish} disabled={!isReady} className={isReady ? '' : 'disabled'}>Finish</button>
              <span>or press RETURN</span>
            </div>
          </div>
        </div>
      </section>
      <Toaster
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
            width: '350px',
            fontSize: '18px',
          },
        }}
      />
    </>
  );
};

export default NextPage;
