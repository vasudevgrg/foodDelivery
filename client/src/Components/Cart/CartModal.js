import React, { useEffect, useState } from 'react';
import MicroCard from './MicroCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import './Cart.css';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

const CartModal = () => {
    const [newItems, setNewItems] = useState([]);
    const [total, setTotal]= useState(0);
    
    const cartItems = useSelector(state => state.manageUpdateCart);
    const menuItems = useSelector(state => state.manageAddToCart);

    useEffect(() => {
        const updatedItems = cartItems.map(cartItem => {
           
            return menuItems.find(menuItem => menuItem._id === cartItem.product_id);
        }).filter(item => item !== undefined);
        
        setNewItems(updatedItems);
       findGrandSum(newItems);
        
    }, [cartItems, menuItems]);

    function findGrandSum(arr){
      console.log(arr);
        cartItems.map((cartItem)=>{
            const item= arr.find(e=>e._id==cartItem.product_id);
            console.log(item);
            if(item){
            setTotal(total+ cartItem.count*item.price);}
        })

    }

   

    return (
        <div className='body'>
            <div className='navbar'>
                <ArrowBackIcon />
                <p>Cart <ShoppingBasketIcon /></p>
                <p>clear<AutorenewIcon /></p>
            </div>
            <div className='microcard-container'>
                {newItems.map(foodItem => (
                    
                    <MicroCard key={foodItem._id} foodItem={foodItem} />
                ))}
            </div>
            <div>
               Grand Total :$ {total}
            </div>

            <Button>CheckOut</Button>
        </div>
    );
};

export default CartModal;
