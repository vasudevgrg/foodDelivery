import React from 'react';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { GiChickenOven } from "react-icons/gi";
import { RiDrinksFill } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { GiWrappedSweet } from "react-icons/gi";
import { FaIceCream } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import { FaBowlRice } from "react-icons/fa6";
import { GiBowlOfRice } from "react-icons/gi";

import IconContainer from './IconContainer';
import "./LandingPage.css";
import { useSelector } from 'react-redux';
import MainCard from './MainCard';

const MainMenu = () => {
  const menuItems= useSelector(e=>e.manageAddToCart);
  return (
    <>
    <div className='main-menu'>
        <h2>Our Hot Dishes</h2>
        <div className='icons'>
            <IconContainer Icon={RestaurantMenuIcon} name="menu" />
            <IconContainer Icon={GiChickenOven} name="Chicken" />
            <IconContainer Icon={RiDrinksFill} name="Drinks" />
            <IconContainer Icon={GiFruitBowl} name="Fruits" />
            <IconContainer Icon={GiWrappedSweet} name="Deserts" />
            <IconContainer Icon={FaIceCream} name="Ice-Creams" />
            <IconContainer Icon={FaFishFins} name="Fish" />
            <IconContainer Icon={FaBowlRice} name="Rice" />
            <IconContainer Icon={GiBowlOfRice} name="Curry" />
        </div>
        <div className='main-container'>
          {menuItems.map(e=><MainCard title={e.title} description={e.description} price={e.price} url={e.url} />)}
        </div>
    </div>
    </>
  )
}

export default MainMenu