import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './VerifyEmail.module.css';
import {useNavigate} from 'react-router-dom';


const VerifyEmail = ({ state }) => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    const email = location.state.email;
    const name = location.state.name;

    const handleVerification = async () => {
        try {
          const response = await axios.post('http://localhost:5500/api/validate-email', { email, otp });
          console.log(response.data);
          navigate('/validation', { state: { email, name } });
        //   onVerification(); // Notify the parent component that verification is successful
        } catch (error) {
          console.error('Error verifying email:', error);
        }
    };


  return (
    <>
    <div className={styles.card}>
      <h2>Email Verification</h2>
      <p>Enter the OTP sent to your email:</p>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='OTP' />
      <button onClick={handleVerification}>Verify</button>
    </div>
    </>
  );
};

export default VerifyEmail;
