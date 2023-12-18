import React, { useState } from 'react';
import styles from "./Signup.module.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSignup = async () => {
        try {
          const response = await axios.post('http://localhost:5500/api/signup', { name, email, password });
          console.log(response.data);
          navigate('/verify-email', { state: { email, name } });
        //   onSignup(email); // Pass the email to the parent component
        } catch (error) {
          console.error('Error signing up:', error);
        }
    };


  return (
    <>
    <h2 className={styles.heading}>SIGNUP</h2>
    <div className={styles.signupContainer}>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup} >Sign Up</button>
    </div>
    </>
  )
}

export default Signup;