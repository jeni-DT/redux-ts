import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type correct={
    loading:boolean;
    error:string;
}
const initialState ={
    loading: false,
    users:[],
    error:'',
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async() =>{
    return await axios
    .get('http://localhost:8000/Booking')
    .then((response)=>response.data)
})
export const addUsers:any = createAsyncThunk('user.addUsers', (collections)=>{
    return axios
    .post ('http://localhost:8000/Booking',collections)
    .then((response)=>response.data)
})
export const deleteUsers:any = createAsyncThunk('user/deleteUsers', async(deleted,{dispatch})=>{
    return axios
    .delete (`http://localhost:8000/Booking/${deleted}`,)
    .then((response)=>{
        dispatch(fetchUsers())
    })
})
export const editUsers:any = createAsyncThunk('user/editUsers', (changes:any)=>{
    return axios
    .put (`http://localhost:8000/Booking/${changes.id}`,changes)
    .then((response)=>response.data)
})

 const userSlice= createSlice({
    name:'user',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload
            state.error=''
        })
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.users=[]
            state.error=action.error.message
        })
    },
})
export default userSlice.reducer