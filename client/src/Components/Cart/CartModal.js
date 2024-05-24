import React, { useEffect } from 'react'
import MicroCard from './MicroCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import './Cart.css';
import { useSelector } from 'react-redux';

const CartModal = () => {
    const [newitems, setNewitems]= React.useState([]);
    const cartItems= useSelector(e=>e.manageUpdateCart);
    const menuItems= useSelector(e=>e.manageAddToCart);



    useEffect(()=>{
        cartItems.map(e=>{
           const arr= menuItems.filter(ei=>ei._id==e.product_id);
           setNewitems([...newitems, arr[0]]);
           console.log(newitems);
        })
    },[]);

console.log(newitems);
 
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
             {newitems.map( foodItem=>{  <MicroCard foorItem={foodItem}/>; console.log(foodItem);})}
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