import React, { useEffect, useState } from 'react';
import MicroCard from './MicroCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import './Cart.css';
import { useSelector } from 'react-redux';

const CartModal = () => {
    const [newItems, setNewItems] = useState([]);
    const cartItems = useSelector(state => state.manageUpdateCart);
    const menuItems = useSelector(state => state.manageAddToCart);

    useEffect(() => {
        const updatedItems = cartItems.map(cartItem => {
            return menuItems.find(menuItem => menuItem._id === cartItem.product_id);
        }).filter(item => item !== undefined);
        
        setNewItems(updatedItems);
        
    }, [cartItems, menuItems]);

    return (
        <div className='body'>
            <div className='navbar'>
                <ArrowBackIcon />
                <p>Cart <ShoppingBasketIcon /></p>
                <p>clear<AutorenewIcon /></p>
            </div>
            <div>
                {newItems.map(foodItem => (
                    
                    <MicroCard key={foodItem._id} foodItem={foodItem} />
                ))}
            </div>
            <div>
                {/* total calculation goes here */}
            </div>
        </div>
    );
};

export default CartModal;
