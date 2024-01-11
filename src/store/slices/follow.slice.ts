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

export const followAsyncThunk = createAsyncThunk(
    'users/followAsyncThunk',
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

const followSlice = createSlice({
    name: 'folllow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(followAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(followAsyncThunk.pending, (state, action: PayloadAction<any>) => {
            state.status = 'successed'
            state.follow = action.payload
        })
        builder.addCase(followAsyncThunk.pending, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        })
    },
})


export default followSlice.reducer