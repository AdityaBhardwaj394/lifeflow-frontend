import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:"",
    email:"",
    phone_no:"",

};

const hospitalSlice = createSlice({
    name: 'hospital',
    initialState: initialState,
    reducers:{
     
       setBBNameRedux(state , action){
            state.name = action.payload;
        },
        setBBemailRedux(state , action){
            state.email = action.payload;
        },
        setBBPhoneno(state , action){
            state.phone_no = action.payload;
        }
    }
})

export default  hospitalSlice.reducer;
export const { setBBNameRedux,setBBemailRedux,setBBPhoneno} = hospitalSlice.actions;