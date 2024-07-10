import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "contexts/redux";

const store = configureStore({
    reducer: rootReducer
});

export default store;