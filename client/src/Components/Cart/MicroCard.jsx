import React, { useEffect, useState } from 'react';
import "./Cart.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../actions';

const MicroCard = ({foodItem}) => {
    const [count, setCount]= useState("0");
const cartItems= useSelector(e=>e.manageUpdateCart);
const dispatch=useDispatch();

useEffect(() => {
    const cartItem = cartItems.find(item => item.product_id === foodItem._id);
    console.log(cartItem);
    if (cartItem) {
        setCount(cartItem.count);
    }
}, [cartItems, foodItem._id]);

const handleIncrement=()=>{
    fetch(`http://localhost:5002/user/incrementcount/${foodItem._id}`, {method:"get", headers:{
        "token": localStorage.getItem("token")
    }}).then(e=>e.json()).then(()=> fetch("http://localhost:5002/user/cartItems", {method:"get", headers:{"token":localStorage.getItem("token")}}).then(e=>e.json()).then(ei=>{console.log(ei);dispatch(updateCart(ei.items));}));
}

const handleDecrement=()=>{
    if(count>=1){
    fetch(`http://localhost:5002/user/decrementcount/${foodItem._id}`, {method:"get", headers:{
        "token": localStorage.getItem("token")
    }}).then(()=> fetch("http://localhost:5002/user/cartItems", {method:"get", headers:{"token":localStorage.getItem("token")}}).then(e=>e.json()).then(ei=>{console.log(ei);dispatch(updateCart(ei.items));}));
}
}
  return (
    <>
    <div className='microCardBody'>
        <img src={foodItem.url} />
        <div>
            <h2>
                {foodItem.title}
            </h2>
            <h4>
                ${foodItem.price}
            </h4>
        </div>
        <div className='counter'>
            <button onClick={handleIncrement}>+</button><span>{count}</span><button onClick={handleDecrement}>-</button>
        </div>
        <button>D</button>
    </div>
    </>
  )
}

export default MicroCard