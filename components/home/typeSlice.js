import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selecttype:'movies'
}

const typeReducer = createSlice({
    name:'type',
    initialState,
    reducers:{
        switchtype: (state)=>{
            if(state.type === 'movies'){
                state.selecttype = 'tv'
            }
            else{
                state.selecttype = 'movies'
            }
        }
    }
})

export const { switchtype } = typeReducer.actions

export default typeReducer.reducer