import React from 'react'
import {chefLogo} from './exportImages';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { changeModalState } from '../actions';

const Navbar = () => {
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
            display:"flex",
            flexDirection:"row",
            listStyleType:"none",
            margin:"10px"
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
            <ul style={style.list}>
                <li>Home</li>
                <li>Menu</li>
                <li>Services</li>
                <li>About us</li>
                <li>Contact us</li>
                <ShoppingBasketIcon/>
            </ul>
        </div>
        <div>
            <Button onClick={handleAddFoodItem}>Add Food Item</Button>
        <Button variant="outlined" startIcon={<LoginIcon />}>
  Login
</Button>
        </div>
    </nav>
    </>
  )
}

export default Navbar