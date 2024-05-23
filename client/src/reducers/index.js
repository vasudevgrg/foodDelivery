import { combineReducers } from "redux";
import manageModal from "./manageModal";
import manageAddToCart from "./manageAddtoCart";
import manageUpdateCart from "./manageUpdateCart";



const rootreducer= combineReducers({
    manageModal, manageAddToCart, manageUpdateCart
});

export default rootreducer;