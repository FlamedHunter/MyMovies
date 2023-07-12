import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayscreen:''
}

const screenSlice = createSlice({
    name:'screen',
    initialState,
    reducers:{
        setscreen: (state,action)=>{
            state.displayscreen = action.payload
        }
    }
})

export default screenSlice.reducer

export const {setscreen} = screenSlice.actions