import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProfile } from "../../interfaces/interfaces";
import { RootState } from "../store";
import axios from "axios";

interface IProfileState {
    status: 'loading' | 'success' | 'rejected'
    error: null
    profile: IProfile
    userStatus: string
}

const initialState: IProfileState = {
    status: 'loading',
    error: null,
    profile: { 
        userId: 0,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        aboutMe: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        }, 
        photos: {
            large: '',
            small: ''
        }
    },
    userStatus: ''
}

export const getProfileAsyncThunk = createAsyncThunk<IProfile, number, { state: RootState }>(
    'profile/getProfileAsyncThunk',
    async( id ,thunkApi): Promise<IProfile> => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}profile/${id}`,{
                withCredentials: true,
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

export const putProfileAsyncThunk = createAsyncThunk<IProfile, any, { state: RootState }>(
    'profile/putProfileAsyncThunk',
    async(data,thunkApi): Promise<IProfile> => {
        const formData = new FormData()
        formData.append('image', data)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}profile/photo`, formData ,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                },
            })
            return data
        } catch (error) {
            throw thunkApi.rejectWithValue(error)
        }
    }
)

export const profileStatusAsyncThunk = createAsyncThunk<any, any, { state: RootState }>(
    'profile/profileStatusAsyncThunk',
    async(status, thunkApi) => {
        
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}profile/status`, {status}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                },
          
            })
            
            return data;
        } catch (error) {
            throw thunkApi.rejectWithValue(error)
        }
    }
)

export const getStatusAsyncThunk = createAsyncThunk<any, any, { state: RootState }>(
    'profile/getStatusAsyncThunk',
    async( userId, thunkApi) => {
        const { profile } = thunkApi.getState()
        const { data } = await axios
        .get(`${import.meta.env.VITE_BASE_URL}profile/status/${profile.profile.userId || userId}`)
        return data
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        });
        builder.addCase(getProfileAsyncThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success'
            state.profile = action.payload
        });
        builder.addCase(getProfileAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        });
        /// add photo profile
        builder.addCase(putProfileAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        });
        builder.addCase(putProfileAsyncThunk.fulfilled, (state, action) => {
            state.status = 'success'
            state.profile = action.payload
        });
        builder.addCase(putProfileAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        });
        // GET STATUS
        builder.addCase(getStatusAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        });
        builder.addCase(getStatusAsyncThunk.fulfilled, (state, action) => {
            state.status = 'success'
            state.userStatus = action.payload
        });
        builder.addCase(getStatusAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        });
    },

})

export default profileSlice.reducer