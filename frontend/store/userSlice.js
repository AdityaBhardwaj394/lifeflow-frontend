import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    email: "default@example.com",
    uid : "defaultUID"
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
     
        setUserEmailRedux(state , action){
            state.email = action.payload;
        },
        setUserUIDRedux(state , action){
            state.uid = action.payload;
        }
    }
})

export default userSlice.reducer;
export const {  setUserEmailRedux , setUserUIDRedux } = userSlice.actions;