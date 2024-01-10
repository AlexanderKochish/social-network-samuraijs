import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/interfaces";
import axios from "axios";
import { RootState } from "../store";

interface IUserState {
    status: 'loading' | 'success' | 'rejected';
    error: null;
    page: number;
    count: number;
    totalCount: number;
    users: IUser[];
    searchUserByName: string;
}


const initialState: IUserState = {
    status: 'loading',
    error: null,
    page: Number(localStorage.getItem('current_page')),
    count: 9,
    totalCount: 0,
    users: [],
    searchUserByName: '',
}

export const getAllUserAsyncThunk = createAsyncThunk<IUser[], undefined, { state: RootState }>(
    'users/getAllUserAsyncThunk',
    async(_, thunkApi): Promise<IUser[]> => {
        const { users } = thunkApi.getState()
        try {
            const { data } = await axios({
                url: `${import.meta.env.VITE_BASE_URL}users?page=${users.page}&count=${users.count}`,
                method: 'GET',
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


export const searchUserAsyncThunk = createAsyncThunk<any, string, { state: RootState }>(
    'users/searchUserAsyncThunk',
    async( searchText, thunkApi) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}users?term=${searchText}`,{
                headers: {
                    'API-KEY': `${import.meta.env.VITE_API_KEY}`
                }
            })
            return data.items
        } catch (error) {
           throw thunkApi.rejectWithValue(error) 
        }   
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setPage(state, action){
            state.page = action.payload
        },
        setUserName(state, action){
            state.searchUserByName = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUserAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        });
        builder.addCase(getAllUserAsyncThunk.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.status = 'success'
            state.users = payload.items
            state.totalCount = payload.totalCount
        })
        builder.addCase(getAllUserAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        // SEARCH USER 
        builder.addCase(searchUserAsyncThunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
        });
        builder.addCase(searchUserAsyncThunk.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.status = 'success'
            state.users = payload
        })
        builder.addCase(searchUserAsyncThunk.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'rejected'
            state.error = action.payload
        })
    },
})

export const { setPage, setUserName } = userSlice.actions

export default userSlice.reducer