import React from 'react';
import "./LandingPage.css";

const IconContainer = ({Icon, name}) => {
  return (
    <>
    <div className='icon-container'>
        <Icon/>
        <p className='icon-name'>{name}</p>
    </div>
    </>

  )
}

export default IconContainer