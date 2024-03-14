import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    // email: "default@example.com",
    // uid : "defaultUID",
    // location:{
    //     latitude: 0,
    //     longitude: 0
    
    // }
    name:"default",
    BloodGroup:"default",

};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers:{
     
       setNameRedux(state , action){
            state.name = action.payload;
        },
        setBloodGroupRedux(state , action){
            state.BloodGroup = action.payload;
        },
    }
})

export default  profileSlice.reducer;
export const { setNameRedux,setBloodGroupRedux } = profileSlice.actions;