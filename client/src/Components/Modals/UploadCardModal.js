import React from 'react';
import './Modal.css';
import { useDispatch, useSelector } from 'react-redux';

import { changeModalState } from '../../actions';


const UploadCardModal = () => {
const [title, setTitle]= React.useState("");
const [description, setDescription]= React.useState("");
const [price, setPrice]= React.useState();
const [image, setImage]= React.useState();
const [catagory, setCatagory]= React.useState("");

const catagories=["Chicken", "Fruits", "Soft Drinks", "Desserts","Ice Cream", "Fish", "Rice", "Curry"];

const dispatch= useDispatch();

const handleImageUpdate=()=>{

    const formData= new FormData();
    formData.append("catagory", catagory);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("url", image);

    console.log(formData);

fetch("http://localhost:5002/admin/uploadcard",{
    method:"POST",
    body:formData,
    
}).then(e=>e.json()).then(e=>{console.log(e); setTitle(""); setDescription(""); setPrice("");setImage("");});
}

  return (
    <>
    <div className="wrapper" onClick={()=>dispatch(changeModalState())}></div>

    <div className="container" style={{display:"flex", flexDirection:"column", margin:"10px"}}>
    <label> Catagory:</label>
        <select value={catagory} onChange={e=>setCatagory(e.target.value)}>
        {catagories.map(e=><option>{e}</option>)}
        </select>
        <label> title:</label>
        <input  onChange={(e)=>setTitle(e.target.value)}/>
        <label>description</label>
        <input onChange={(e)=>setDescription(e.target.value)}/>
        <label> Price:</label>
        <input onChange={(e)=>setPrice(e.target.value)}/>
        <label>update Image:</label>
        <input type='file' name='file' onChange={(e)=>setImage(e.target.files[0])}/>
        <button onClick={handleImageUpdate}>Update</button>
    </div>
    </>
  )
}

export default UploadCardModal;