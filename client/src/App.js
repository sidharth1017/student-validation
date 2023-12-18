import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Validation from './pages/Validation/Validation';
import VerifyPhone from './pages/VerifyPhone/VerifyPhone';
import Profile from './pages/Profile/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes >
          <Route path="/signup" element={<Signup/>} exact />      
          <Route path="/verify-email" element={<VerifyEmail/>} exact />
          <Route path="/validation" element={<Validation/>} exact />  
          <Route path="/verify-phone" element={<VerifyPhone/>} exact />
          <Route path="/profile" element={<Profile />} exact />
      </Routes >
  </BrowserRouter>
  );
}

export default App;
