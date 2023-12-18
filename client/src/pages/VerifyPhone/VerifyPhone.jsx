import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './VerifyPhone.module.css';
import {useNavigate} from 'react-router-dom';


const VerifyPhone = ({ state }) => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    const email = location.state.email;
    const name = location.state.name;
    const phone = location.state.phone

    const handleVerification = async () => {
        try {
          const response = await axios.post('http://localhost:5500/api/validate-phone', { phone, otp });
          console.log(response.data);
          navigate('/', { state: { email, name } });
        //   onVerification(); // Notify the parent component that verification is successful
        } catch (error) {
          console.error('Error verifying email:', error);
        }
    };


  return (
    <>
    <div className={styles.card}>
      <h2>Phone Verification</h2>
      <p>Enter the OTP sent to your phone no:</p>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='OTP' />
      <button onClick={handleVerification}>Verify</button>
    </div>
    </>
  );
};

export default VerifyPhone;
