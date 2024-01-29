import { createSlice } from "@reduxjs/toolkit";
import { ISearchString } from "../../../interfaces/interfaces";

const initialState: ISearchString = {
    searchString: ''
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearchString(state, action) {
            state.searchString = action.payload
        }
    }
})

export const { setSearchString } = usersSlice.actions

export default usersSlice.reducer