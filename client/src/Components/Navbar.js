import React from 'react'
import {chefLogo} from './exportImages';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { changeModalState } from '../actions';
import {useNavigate} from "react-router-dom";
const Navbar = () => {
    const navigate= useNavigate();
    const style={
        img:{
            width:"50px",
            height:"50px"
        },
        nav:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
        },
        heading:{
            display:"flex",
            flexDirection:"row"
        },
        list:{
            // display:"flex",
            // flexDirection:"row",
            // justifyContent:"space-between",
            // listStyleType:"none",
            // margin:"10px",
            // padding:"10px",
            // border:"10px"
            display:"inline-block",
             listStyleType:"none",
            padding:"10px 40px"

        }
    }

    const dispatch= useDispatch();
    const handleAddFoodItem=()=>{
        dispatch(changeModalState());
    }
  return (
    <>
    <nav style={style.nav}>
        <div style={style.heading}>
            <img src={chefLogo} alt='cheflogo' style={style.img} />
            <h3>Anna From South</h3>
        </div>
        <div>
            <ul >
                <li style={style.list}>Home</li>
                <li style={style.list}>Menu</li>
                <li style={style.list}>Services</li>
                <li style={style.list}>About us</li>
                <li style={style.list}>Contact us</li>
                <ShoppingBasketIcon/>
            </ul>
        </div>
        <div>
            <Button onClick={handleAddFoodItem}>Add Food Item</Button>
        <Button variant="outlined" startIcon={<LoginIcon />} onClick={ ()=>{console.log("hello");navigate("/login")}}>
  Login
</Button>
        </div>
    </nav>
    </>
  )
}

export default Navbar