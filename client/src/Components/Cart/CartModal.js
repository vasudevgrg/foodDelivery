import React from 'react'
import MicroCard from './MicroCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const CartModal = () => {
  return (
    <>
    <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignContent:"start"}}>
            <ArrowBackIcon/>
            <p>Cart <ShoppingBasketIcon/></p>
            <p>clear<AutorenewIcon/></p>
        </div>
        <div>
            <div>
                <MicroCard/>
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