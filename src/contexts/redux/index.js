import { combineReducers } from "@reduxjs/toolkit"
import auth from "./auth/auth"
import cart from "./cart/cart";

const rootReducer = combineReducers({
    auth: auth,
    cart: cart
});

export default rootReducer;