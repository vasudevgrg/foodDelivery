import React from 'react';
import "./Cart.css";

const MicroCard = ({foodItem}) => {
  return (
    <>
    <div className='microCardBody'>
        <img src={foodItem.item.url} />
        <div>
            <h2>
                {foodItem.item.title}
            </h2>
            <h4>
                ${foodItem.item.price}
            </h4>
        </div>
        <div className='counter'>
            <button>+</button>{foodItem.count}<button>-</button>
        </div>
        <button>D</button>
    </div>
    </>
  )
}

export default MicroCard