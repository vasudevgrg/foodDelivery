import React from 'react'
import FullWidthTextField from '../Components/FullWidthTextField';
import GoogleIcon from '@mui/icons-material/Google';
import Google from '@mui/icons-material/Google';
import CartModal from '../Components/Cart/CartModal';

const LoginPage = () => {
  const handleGoogleLogin=()=>{
    fetch("http://localhost:5002/auth/google");
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
<FullWidthTextField inputName="Email Address" />
<FullWidthTextField inputName="Password" />
<p style={{color:"red", padding:"20px",textAlign:"start"}}>Forget Password?</p>
<button style={{width:"500px", height:"50px", backgroundColor:"orange",color:"white", fontWeight:"bold", border:"none", }}>SIGN IN</button>
   </div>
   </div>
   </>
  )
}

export default LoginPage