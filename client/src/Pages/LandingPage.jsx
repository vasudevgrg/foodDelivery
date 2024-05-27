import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import MainPageTitle from '../Components/LandingPageComp/MainPageTitle';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import UploadCardModal from '../Components/Modals/UploadCardModal';
import MainCard from '../Components/LandingPageComp/MainCard';
import HealthyFruitsScroll from '../Components/LandingPageComp/HealthyFruitsScroll';
import { updateCart } from '../actions';
import MainMenu from '../Components/LandingPageComp/MainMenu';


import { addItemToCart } from '../actions';


const LandingPage = () => {
    const dispatch= useDispatch();
  
    React.useEffect(()=>{
        fetch("http://localhost:5002/user/menu").then(e=>e.json()).then(e=>e.items.map(ei=>ei.items.map(eii=>dispatch(addItemToCart(eii)))));
        if(localStorage.getItem("token")){
        fetch("http://localhost:5002/user/cartItems", {method:"get", headers:{"token":localStorage.getItem("token")}}).then(e=>e.json()).then(ei=>{console.log(ei);dispatch(updateCart(ei.items));})
        }
    },[]);

    const modalStatus= useSelector(e=>e.manageModal);
    console.log(modalStatus);
    // const modalStatus=true;
  return (
   <>
   <Navbar/>
   <MainPageTitle/>
   <HealthyFruitsScroll/>
   <MainMenu/>
   {
    modalStatus && <UploadCardModal/>
   }
   </>
  )
}

export default LandingPage