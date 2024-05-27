import React from 'react';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { Button } from '@mui/material';
import Card from '../Card';
import { StrawberryImg, bgimg } from '../exportImages';


const MainPageTitle = () => {
    const style={
        body:{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            height:"70vh"
        },
        bikeDelivery:{
            color:`rgb(255,128,0)`,
            backgroundColor:`rgb(255,178,0)`
        },
        title:{
            fontSize:"50px",
            fontWeight:"bold",

        },
        cityName:{
            color:"red"
        },

        cards:{
            backgroundImage:`url(${bgimg})`
        }
    }
  return (
  <>
  <div style={style.body}>
  <div>
    <Button style={style.bikeDelivery}>
        Bike Delivery <DeliveryDiningIcon/>
    </Button>
    <p style={style.title}>
       The Fastest Food <br/>
       Delivery in <p>Accrea</p>
    </p>
    <p>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt ratione nemo harum incidunt officiis, sapiente, consectetur, distinctio doloremque adipisci corporis assumenda voluptatum. Rerum recusandae iure dolorem. Aliquid et officia eos facilis veniam ut expedita, nesciunt cum eligendi aut architecto quae? Temporibus iure sequi quos consequatur esse. Nihil blanditiis temporibus ut?    </p>
    <Button style={{borderRadius:"20%"}}>Order Now</Button>
  </div>
<div style={style.cards}>
    <Card img={StrawberryImg} title="Strawberries" description="Fresh Strawberries" price="20"/>
</div>
</div>
  </>
  )
}

export default MainPageTitle