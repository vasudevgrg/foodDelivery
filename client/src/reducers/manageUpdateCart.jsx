const initialState=[];

const manageUpdateCart=(state= initialState, action)=>{
    if(action.type=="updateCart"){
        return [...state, action.payload];
    }else{
        return state;
    }
}

export default manageUpdateCart;