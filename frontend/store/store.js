import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import profileSlice from "./profileSlice";
import hospitalSlice from "./hospitalSlice";
const store = configureStore({
    reducer:{
        user: userSlice,
        profile:profileSlice,
        hospital:hospitalSlice,
       
    }
})

export default store;