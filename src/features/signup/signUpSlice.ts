import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../app/store'
import {API_URL} from '../../api/config'
import {User} from '../../types/user'
import {Role} from '../../types/role'

type thunkArgs = {
    name: string
    email: string
    password: string
    role: string
}

interface UserRole extends User {
    role: Role
}

interface SignUpState {
    signupdata: UserRole[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: SignUpState = {
    signupdata: [],
    loading: 'idle',
    error: '',
}

export const signUp = createAsyncThunk(
    'authentication/signup',
    async ({email, password, name, role}: thunkArgs) => {
        const apiURL = `${API_URL}/authentication/signup`
        const strBody: BodyInit = `{"email":"${email}","password":"${password}","name":"${name}","roleId":${role}}`

        const response = await fetch(apiURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: strBody,
        })

        if (response.ok) {
            const data: UserRole = (await response.json()) as UserRole
            return [data]
        }
        return []
    },
)

export const singUpSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signUp.pending, (state, action) => {
            state.signupdata = []
            state.loading = 'pending'
            state.error = ''
        })
        builder.addCase(
            signUp.fulfilled,
            (state, action: PayloadAction<UserRole[]>) => {
                state.signupdata = action.payload
                state.loading = 'succeeded'
                state.error = ''
            },
        )
        builder.addCase(signUp.rejected, (state, action) => {
            state.signupdata = []
            state.loading = 'failed'
            state.error = action.error.message?.toString()
        })
    },
})

export const selectSignUpData = (state: RootState) => state.signup.signupdata
export const selectSignUpLoading = (state: RootState) => state.signup.loading
export const selectSignUpError = (state: RootState) => state.signup.error
export default singUpSlice.reducer
