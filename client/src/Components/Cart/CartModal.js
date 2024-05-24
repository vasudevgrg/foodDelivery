import React from 'react'
import MicroCard from './MicroCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import './Cart.css';
import { useSelector } from 'react-redux';

const CartModal = () => {
    const cartItems= useSelector(e=>e.manageUpdateCart);
    console.log(cartItems);
  return (
    <>
    <div className='body'>
        <div className='navbar'>
            <ArrowBackIcon/>
            <p>Cart <ShoppingBasketIcon/></p>
            <p>clear<AutorenewIcon/></p>
        </div>
        <div>
            <div>
             {cartItems.map( foodItem=>  <MicroCard foorItem={foodItem}/>)}
            </div>
            <div>
                //total

            </div>
        </div>
    </div>


    </>
  )
}

export default CartModal