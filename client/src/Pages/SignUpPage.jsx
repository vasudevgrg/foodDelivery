import React, { useState } from 'react';
import FullWidthTextField from '../Components/FullWidthTextField';
import GoogleIcon from '@mui/icons-material/Google';
import Google from '@mui/icons-material/Google';
import CartModal from '../Components/Cart/CartModal';

const SignUpPage = () => {
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
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
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
    <div>
 <CartModal/>
    </div>
 
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh"}}>

 {/* <FullWidthTextField inputName="Email Address"/>
 <FullWidthTextField inputName="Password" /> */}
 <input onChange={e=>setUsername(e.target.value)} />
 <input onChange={e=>setPassword(e.target.value)} />

 <button style={{width:"500px", height:"50px", backgroundColor:"orange",color:"white", fontWeight:"bold", border:"none", }} onClick={handleSignup}>SIGN UP</button>
    </div>
    </div>
    </>
  )
}

export default SignUpPage