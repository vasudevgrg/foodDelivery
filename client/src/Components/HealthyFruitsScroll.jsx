import React from 'react'
import MainCard from './MainCard';

const HealthyFruitsScroll = () => {
    const [fruit, setFruit]= React.useState([]);
    React.useEffect(()=>{
            fetch("http://localhost:5002/user/menu").then(e=>e.json()).then(e=>{
                e.items.map((ei)=>{
                   if( ei.catagory==="Fruits"){setFruit(ei.items)};
                })
                console.log(fruit);
            });
    },[]);
  return (
   <>
   <div style={{display:"flex", flexDirection:"row"}}>
   {fruit.map((e)=><MainCard title={e.title} description={e.description} price={e.price} url= {e.url} id={e._id} />)}
   </div>
   </>
  )
}

export default HealthyFruitsScroll