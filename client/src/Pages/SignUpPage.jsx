import React, { useState } from 'react';
import FullWidthTextField from '../Components/FullWidthTextField';
import GoogleIcon from '@mui/icons-material/Google';
import Google from '@mui/icons-material/Google';
import CartModal from '../Components/Cart/CartModal';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { chefLogo } from '../Components/exportImages';

const SignUpPage = () => {
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const navigate= useNavigate();
    const handleSignup=()=>{
        fetch("http://localhost:5002/user/signup", {
            method:"post",
            body:JSON.stringify({
                "username":username,
                "password": password
            }),
            headers:{
                'Content-Type':'application/json'   
            }
        }).then(e=>e.json()).then(e=>{console.log(e); localStorage.setItem("token", e.token)});
    }
  return (
    <>
    <Navbar/>
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
    <div>
    <img src={chefLogo} style={{ width: "300px", height: "300px" }} />

    </div>
 
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh"}}>

 <FullWidthTextField inputName="Email Address" handleChange={setUsername}/>
 <FullWidthTextField inputName="Password" handleChange={setPassword}/>


 <button style={{width:"500px", height:"50px", backgroundColor:"orange",color:"white", fontWeight:"bold", border:"none", marginTop:"20px"}} onClick={handleSignup}>SIGN UP</button>
 <h3>Allready have an account?</h3>
 <button style={{width:"500px", height:"50px", backgroundColor:"orange",color:"white", fontWeight:"bold", border:"none", marginTop:"20px"}} onClick={()=>navigate("/login")}>LOGIN</button>
    </div>
    </div>
    </>
  )
}

export default SignUpPage