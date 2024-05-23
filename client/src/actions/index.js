export const changeModalState=()=>{
    return {
        type: "changeModalState"
    }
};

export const addItemToCart=(payload)=>{
    return{
        type: "addItemToCart",
        payload: payload
    }
}

export const updateCart=(payload)=>{
    return {
        type:"updateCart",
        payload: payload
    }
}