import { combineReducers } from "redux";
import manageModal from "./manageModal";
import manageAddToCart from "./manageAddtoCart";



const rootreducer= combineReducers({
    manageModal, manageAddToCart
});

export default rootreducer;