import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from './slices/users/users.api'
import authSlice from './slices/auth.slice'
import profileSlice from './slices/profile.slice'
import followSlice from './slices/follow.slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import usersSlice from './slices/users/users.slice'

export const store = configureStore({
  reducer: {
    [ usersApi.reducerPath ]: usersApi.reducer,
    users: usersSlice,
    auth: authSlice,
    profile: profileSlice,
    follow: followSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(usersApi.middleware),
})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch