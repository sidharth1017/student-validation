import React, { useState } from 'react'
import styles from './Validation.module.css';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';



const Validation = ({ state }) => {
  const location = useLocation();
  const email = location.state.email;
  const name = location.state.name;

  const [isStep2Open, setStep2Open] = useState(false);
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();


  const handleVerification = async () => {
    try {
      const response = await axios.post('http://localhost:5500/api/phone', { email, phone });
      console.log(response.data);
      navigate('/verify-phone', { state: { email, name, phone } });
    } catch (error) {
      console.error('Error verifying phone:', error);
    }
};


  const toggleStep2 = () => {
    setStep2Open(!isStep2Open);
  };

  return (
    <div className={styles.container}>
      <h1>Hello {name}, Welcome to StudentBenifits</h1>
      <p>Follow these simple steps to get started and earn <span>Free credits worth Rs. 300</span></p>

      <div className={styles.steps}>
        <h2>Your quick setup guide</h2>
        <div className={styles.step1}>
          <p>Link your email <span>Get free 100 credits</span></p>
        </div>
        <div className={styles.step2}>
          <p>Link your phone <span onClick={toggleStep2}>Get free 100 credits {isStep2Open ? '▲' : '▼'}</span> </p>
        </div>
        {isStep2Open && (
            <div className={styles.stepForm}>
              <p>Verify your phone no.</p>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone No.' />
              <button onClick={handleVerification}>Verify</button>
            </div>
          )}
      </div>

    </div>
  )
}

export default Validation;