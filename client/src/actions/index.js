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