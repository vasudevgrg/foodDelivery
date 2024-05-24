import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import manageAddToCart from '../reducers/manageAddtoCart';
import { updateCart } from '../actions';

const MainCard = ({title, description, price, url,id}) => {
    
const [showAddtocart, setShowAddtocart]= React.useState(true);
const allMenuItems= useSelector(e=>e.manageAddToCart);
const cartItems= useSelector(e=>e.manageUpdateCart);
const dispatch= useDispatch();

const handleAddToCart=(id)=>{
    // const value=allMenuItems.filter(e=>e._id===id);
    // console.log(value);
    fetch(`http://localhost:5002/user/addtocart/${id}`, {
        "method":"get",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem("token")   
        }
    }).then(()=>fetch("http://localhost:5002/user/cartItems", {method:"get", headers:{"token":localStorage.getItem("token")}}).then(e=>e.json()).then(e=>dispatch(updateCart(e.cartItems)))).then(()=>console.log(cartItems));
    setShowAddtocart(false);
    

}

  return (
   <>
   <div  style={{maxWidth:"300px",maxHeight:"400px", border:"1px solid black", padding:"20px"}}>
   <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
    <img  src={"http://localhost:5002/image/"+url} style={{width:"200px", height:"160px", objectFit:"cover", position:"relative",top:"-50px", zIndex:"99"}}/>
{ showAddtocart &&   <AddShoppingCartIcon style={{background:"red", height:"50px", width:"50px", padding:"10px", borderRadius:"30px"}} onClick={()=>handleAddToCart(id)} />}
{ !showAddtocart &&   <ShoppingCartIcon style={{background:"green", height:"50px", width:"50px", padding:"10px", borderRadius:"30px"}} />}

   </div>
   <div style={{display:"flex", flexDirection:"column", justifyContent:"end", alignItems:"end"}}>
    <p>{title}</p>
    <p>{description}</p>
    <p>$ {price}</p>

   </div>
   </div>
   </>
  )
}

export default MainCard