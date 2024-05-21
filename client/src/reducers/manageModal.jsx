let initialState= false;

const manageModal=(state= initialState, action)=>{
    if(action.type== "changeModalState"){
        return true;
    }else{
        return state;
    }
};

export default manageModal;