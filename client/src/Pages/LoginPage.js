import React, { useState } from 'react'
import FullWidthTextField from '../Components/FullWidthTextField';
import GoogleIcon from '@mui/icons-material/Google';
import Google from '@mui/icons-material/Google';
import CartModal from '../Components/Cart/CartModal';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername]= useState("");
  const [password, setPassword]= useState("");
const navigate= useNavigate();

  const handleGoogleLogin=()=>{
    fetch("http://localhost:5002/auth/google", {
      method:"get"
    }).then(e=>console.log(e));
  }

  const handleLogin=()=>{
    console.log(username);
    fetch("http://localhost:5002/user/login",{
      method:"post",
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(e=>e.json()).then(e=>{console.log(e); localStorage.setItem("token", e.token); navigate("/")});
  }
  return (
   <>
   <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
   <div>
<CartModal/>
   </div>

   <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh"}}>
   <button onClick={handleGoogleLogin}><GoogleIcon/>Google</button>
<div style={{borderTop:"1px solid black"}}></div><p>OR</p><hr/>
<FullWidthTextField inputName="Email Address" handleChange={setUsername} />
<FullWidthTextField inputName="Password" handleChange={setPassword} />
<p style={{color:"red", padding:"20px",textAlign:"start"}}>Forget Password?</p>
<button style={{width:"500px", height:"50px", backgroundColor:"orange",color:"white", fontWeight:"bold", border:"none", }} onClick={handleLogin}>SIGN IN</button>
   </div>
   </div>
   </>
  )
}

export default LoginPage