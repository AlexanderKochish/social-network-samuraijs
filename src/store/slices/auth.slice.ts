import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { IAuthMe, IProfile } from '../../interfaces/interfaces';
const authMe = JSON.parse(JSON.stringify(localStorage.getItem('auth_me')))
const authUser = JSON.parse(authMe)

interface IAuthState {
    status: 'loading' | 'success' | 'rejected';
    error: null;
    id: number;
    authMe: IAuthMe;
    logout: string;
    currentUser: IProfile
}

const initialState: IAuthState = {
    status: 'loading',
    error: null,
    id: Number(localStorage.getItem('userId')),
    authMe: {
        id: authUser?.id,
        email: authUser?.email,
        login: authUser?.login
    },
    currentUser: { 
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
    logout: ''
}



export const loginAsyncThunk = createAsyncThunk<any, any, { state: RootState }>(
    'auth/loginAsyncThunk',
    async(user, thunkApi): Promise<any> => {
        try {
            const { data } = await axios({
                url: `${import.meta.env.VITE_BASE_URL}/auth/login`,
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                },
                data: JSON.stringify(user)
            })
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}profile/${data.data.userId}`, {
                withCredentials: true,
                headers: {
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                }

            })
            thunkApi.dispatch(setCurrenUser(res.data))
            
            return data.data.userId
        } catch (error) {
           throw thunkApi.rejectWithValue(error) 
        }   
    }
)

export const authMeAsyncThunk = createAsyncThunk<any, undefined, { state: RootState }>(
    'auth/authMeAsyncThunk',
    async(_, thunkApi): Promise<IAuthMe> => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}auth/me`,{
                withCredentials: true,
                headers: {
                    'API-KEY': `${import.meta.env.API_KEY}`
                }
            })
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}profile/${data.data.id}`, {
                withCredentials: true,
                headers: {
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                }

            })

            thunkApi.dispatch(setCurrenUser(res.data))
            
            return data.data;
        } catch (error) {
            throw thunkApi.rejectWithValue(error)
        }
    }
)

export const logoutAsyncThunk = createAsyncThunk(
    'auth/logoutAsyncThunk',
    async(_, thunkApi) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}auth/login`,{
                headers: {
                    'API-KEY':`${import.meta.env.VITE_API_KEY}`
                }
            })
            return data
        } catch (error) {
            throw thunkApi.rejectWithValue(error)
        }   
    } 
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrenUser(state, action) {
            state.currentUser = action.payload
        }
    },
    extraReducers: (builder) => {
        // AUTH LOGIN
        builder.addCase(loginAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        });
        builder.addCase(loginAsyncThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success'
            localStorage.setItem('userId', action.payload)
            state.id = action.payload
        });
        builder.addCase(loginAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        });
        // AUTH ME
        builder.addCase(authMeAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        });
        builder.addCase(authMeAsyncThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success'
            localStorage.setItem('auth_me', JSON.stringify(action.payload))
            state.authMe = action.payload
        });
        builder.addCase(authMeAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        });
        // AUTH LOGOUT
        builder.addCase(logoutAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        });
        builder.addCase(logoutAsyncThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success'
            state.logout = action.payload
        });
        builder.addCase(logoutAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        });
    },
})

export const { setCurrenUser } = authSlice.actions

export default authSlice.reducer