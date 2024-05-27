import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import Navbar from './Components/Navbar';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';

const App = () => {
  return (


   <>
 
   <BrowserRouter>
    <Routes>
      <Route index path="/" element={<LandingPage/>} />
      <Route  path="/login" element={<LoginPage/>} />
      <Route  path="/signup" element={<SignUpPage/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
