import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import singInReducer from '../features/signin/signInSlice'
import singUpReducer from '../features/signup/signUpSlice'
import singOutReducer from '../features/signout/signOutSlice'
import rolesReducer from '../features/roles/rolesSlice'
import videosReducer from '../features/videos/videosSlice'

export const store = configureStore({
    reducer: {
        signin: singInReducer,
        signup: singUpReducer,
        signout: singOutReducer,
        roles: rolesReducer,
        videos: videosReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
