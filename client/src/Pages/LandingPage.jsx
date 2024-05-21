import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import MainPageTitle from '../Components/MainPageTitle';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UploadCardModal from '../Components/Modals/UploadCardModal';
import MainCard from '../Components/MainCard';
import HealthyFruitsScroll from '../Components/HealthyFruitsScroll';


const LandingPage = () => {
    const [url, setUrl]= useState(null);
    const handleFileUpload=()=>{
        console.log(url);
let formData= new FormData();
formData.append("url", url);
        fetch("http://localhost:5002/admin/postimage", {
            method:"post",
            body:formData,
            headers:{
                // 'Content-Type':'application/json',
                'token':localStorage.getItem("token")   
            }
        })
    }

    const modalStatus= useSelector(e=>e.manageModal);
    console.log(modalStatus);
    // const modalStatus=true;
  return (
   <>
   <input type='file' name="file" onChange={(e)=>{ setUrl(e.target.files[0]); console.log(e.target.files[0])}} />
   <button onClick={handleFileUpload}>Upload</button>
   <Navbar/>
   <MainPageTitle/>
   <HealthyFruitsScroll/>
   <MainCard/>
   {
    modalStatus && <UploadCardModal/>
   }
   </>
  )
}

export default LandingPage