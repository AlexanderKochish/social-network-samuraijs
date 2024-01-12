import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { RootState } from "../store";

interface IFollowState {
    status: 'loading' | 'successed' | 'rejected';
    error: null;
    follow: boolean;
    data: object;
}

const initialState: IFollowState = {
    status: 'loading',
    error: null,
    follow: false,
    data: {}
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

export const addFollowAsyncThunk = createAsyncThunk<any, any, { state: RootState }>(
    'users/addFollowAsyncThunk',
    async(userId, thunkApi) => {
        try {
            const { data } = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_BASE_URL}follow/${userId}`,
                headers: {
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                },
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
        builder.addCase(getFollowAsyncThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'successed'
            state.follow = action.payload
        })
        builder.addCase(getFollowAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        });

        builder.addCase(addFollowAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(addFollowAsyncThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'successed'
            state.data = action.payload
        })
        builder.addCase(addFollowAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        });
    },
})


export default followSlice.reducer