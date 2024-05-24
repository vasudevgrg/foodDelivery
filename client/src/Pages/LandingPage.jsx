import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import MainPageTitle from '../Components/MainPageTitle';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import UploadCardModal from '../Components/Modals/UploadCardModal';
import MainCard from '../Components/MainCard';
import HealthyFruitsScroll from '../Components/HealthyFruitsScroll';
import { updateCart } from '../actions';


import { addItemToCart } from '../actions';


const LandingPage = () => {
    const dispatch= useDispatch();
  
    React.useEffect(()=>{
     
    },[]);

    const modalStatus= useSelector(e=>e.manageModal);
    console.log(modalStatus);
    // const modalStatus=true;
  return (
   <>
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