import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './slices/users.slice'
import authSlice from './slices/auth.slice'
import profileSlice from './slices/profile.slice'

export const store = configureStore({
  reducer: {
    users: usersSlice,
    auth: authSlice,
    profile: profileSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch