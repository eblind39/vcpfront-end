import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import singInReducer from '../features/signin/signInSlice'
import singUpReducer from '../features/signup/signUpSlice'
import rolesReducer from '../features/roles/rolesSlice'

export const store = configureStore({
    reducer: {
        signin: singInReducer,
        signup: singUpReducer,
        roles: rolesReducer,
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
