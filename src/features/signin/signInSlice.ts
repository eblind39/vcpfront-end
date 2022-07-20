import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../app/store'
import {API_URL} from '../../api/config'
import {User} from '../../types/user'
import {Role} from '../../types/role'

type thunkArgs = {
    email: string
    password: string
}

interface UserRole extends User {
    role: Role
}

interface SignInState {
    signindata: UserRole[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: SignInState = {
    signindata: [],
    loading: 'idle',
    error: '',
}

export const signIn = createAsyncThunk(
    'authentication/signin',
    async ({email, password}: thunkArgs) => {
        const apiURL = `${API_URL}/authentication/signin`
        const strBody: BodyInit = `{"email":"${email}","password":"${password}"}`

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
            document.cookie = response.headers.get('vcp-jwt') || ''
            const data: UserRole = (await response.json()) as UserRole
            return [data]
        }
        return []
    },
)

export const singInSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signIn.pending, (state, action) => {
            state.signindata = []
            state.loading = 'pending'
            state.error = ''
        })
        builder.addCase(
            signIn.fulfilled,
            (state, action: PayloadAction<UserRole[]>) => {
                state.signindata = action.payload
                state.loading = 'succeeded'
                state.error = ''
            },
        )
        builder.addCase(signIn.rejected, (state, action) => {
            state.signindata = []
            state.loading = 'failed'
            state.error = action.error.message?.toString()
        })
    },
})

export const selectSignInData = (state: RootState) => state.signin.signindata
export const selectSignInLoading = (state: RootState) => state.signin.loading
export const selectSignInError = (state: RootState) => state.signin.error
export default singInSlice.reducer
