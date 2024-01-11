import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";

interface IFollowState {
    status: 'loading' | 'successed' | 'rejected';
    error: null;
    follow: boolean;
}

const initialState: IFollowState = {
    status: 'loading',
    error: null,
    follow: false
}

export const getFollowAsyncThunk = createAsyncThunk(
    'users/getFollowAsyncThunk',
    async(userId, thunkApi) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}follow/${userId}`, {
                headers: {
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                }
            })
            return data
        } catch (error) {
           throw thunkApi.rejectWithValue(error) 
        }    
    }
)

export const addFollowAsyncThunk = createAsyncThunk(
    'users/addFollowAsyncThunk',
    async(userId, thunkApi) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}follow/${userId}`,{
                headers: {
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                }
            })
            return data
        } catch (error) {
           throw thunkApi.rejectWithValue(error) 
        }    
    }
)

export const unfollowAsyncThunk = createAsyncThunk(
    'users/unfollowAsyncThunk',
    async(userId, thunkApi) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}follow/${userId}`,{
                headers: {
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                }
            })
            return data
        } catch (error) {
           throw thunkApi.rejectWithValue(error) 
        }    
    }
)

const followSlice = createSlice({
    name: 'folllow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFollowAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(getFollowAsyncThunk.pending, (state, action: PayloadAction<any>) => {
            state.status = 'successed'
            state.follow = action.payload
        })
        builder.addCase(getFollowAsyncThunk.pending, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        })
    },
})


export default followSlice.reducer