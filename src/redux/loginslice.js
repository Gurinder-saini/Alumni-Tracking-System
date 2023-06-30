import {createSlice} from '@reduxjs/toolkit'

const loginslice = createSlice({
    name:'Lslice',
    initialState:{
        islogined:false
    },
    reducers:{
        tooglelogin(state,action){
            state.islogined=!state.islogined
        }
          
    }
})

export const { tooglelogin} = loginslice.actions

export default loginslice.reducer