
let initialState=[];

const manageAddToCart=(state= initialState, action)=>{
    if(action.type==="addItemToCart"){
        return [...state, action.payload];
    }else{
        return state;
    }

};

export default manageAddToCart;