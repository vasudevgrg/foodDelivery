export const changeModalState=()=>{
    return {
        type: "changeModalState"
    }
};

//contains all items to of menu. I dont know why the hell i had named it addtocart.
export const addItemToCart=(payload)=>{
    return{
        type: "addItemToCart",
        payload: payload
    }
}

//when user press addtocart it gets added here
export const updateCart=(payload)=>{
    return {
        type:"updateCart",
        payload: payload
    }
}