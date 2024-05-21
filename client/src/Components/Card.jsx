import React from 'react'

const Card = ({img, title, description, price}) => {
    const style={
        body:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            backgroundFilter: `blur(8px)`,
            border:"1px solid black"
        },
        img:{
            height:"150px",
            width:"150px"
        },
        title:{
            fontWeight:"bold",
            fontSize:"30px"
        },
        description:{
            opacity:"50%"
        }
    }
  return (
    <>
    <div style={style.body}>
        <img src={img} alt='strawberry img' style={style.img} />
        <div style={style.title}>{title}</div>
        <div style={style.description}>{description}</div>
        <div>${price}</div>
    </div>
    </>
  )
}

export default Card