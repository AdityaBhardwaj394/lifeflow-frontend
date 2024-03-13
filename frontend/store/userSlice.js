import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    email: "default@example.com",
    uid : "defaultUID",
    location:{
        latitude: 0,
        longitude: 0
    
    }
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
        },
        setUserLocation(state,action){
            let latitude=action.payload.latitude;
            let longitude=action.payload.longitude;
            state.location={
                latitude:latitude,
                longitude:longitude
            
            }
        }
    }
})

export default userSlice.reducer;
export const { setUserLocation, setUserEmailRedux , setUserUIDRedux } = userSlice.actions;