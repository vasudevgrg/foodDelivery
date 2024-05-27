import React from 'react';
import "./LandingPage.css";

const IconContainer = ({Icon, name, setShowItems, foodItems}) => {
  console.log(foodItems);
  return (
    <>
    <div className='icon-container' onClick={()=>{let val=foodItems.find(e=>e.catagory=={name});console.log(val); setShowItems(val.items);}}>
        <Icon/>
        <p className='icon-name'>{name}</p>
    </div>
    </>

  )
}

export default IconContainer