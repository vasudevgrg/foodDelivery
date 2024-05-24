import React, { useEffect } from 'react'
import {chefLogo} from './exportImages';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { changeModalState } from '../actions';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { updateCart, addItemToCart } from '../actions';
const Navbar = () => {
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const cartItems= useSelector(e=>e.manageUpdateCart);
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

        },
        wrapper:{
            position:"relative",
            display:"inline-block",
             listStyleType:"none",
            
        },
        superscript:{
            position:"absolute",
            top:"-2px",
            right:"-2px",
            background:"red",
            padding:"1px",
            borderRadius:"50%"
        }
    }

useEffect(()=>{
    fetch("http://localhost:5002/user/menu").then(e=>e.json()).then(e=>e.items.map(ei=>ei.items.map(eii=>dispatch(addItemToCart(eii)))));
    fetch("http://localhost:5002/user/cartItems", {method:"get", headers:{"token":localStorage.getItem("token")}}).then(e=>e.json()).then(e=>dispatch(updateCart(e.cartItems)))
},[]);

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
                <div style={style.wrapper}>
                <ShoppingBasketIcon/>
                <span style={style.superscript}>{cartItems.length}</span>
                </div>
                
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