import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../app/store'
import {API_URL} from '../../api/config'

interface signOutState {
    signoutdata: string
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: signOutState = {
    signoutdata: '',
    loading: 'idle',
    error: '',
}

export const signOut = createAsyncThunk('authentication/signout', async () => {
    const apiURL = `${API_URL}/authentication/signout`

    const response = await fetch(apiURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: '',
    })

    if (response.ok) {
        document.cookie = response.headers.get('vcp-jwt') || ''
        const data: string = (await response.json()) as string
        return data
    }
    return ''
})

export const singOutSlice = createSlice({
    name: 'signout',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signOut.pending, (state, action) => {
            state.signoutdata = ''
            state.loading = 'pending'
            state.error = ''
        })
        builder.addCase(
            signOut.fulfilled,
            (state, action: PayloadAction<string>) => {
                state.signoutdata = action.payload
                state.loading = 'succeeded'
                state.error = ''
            },
        )
        builder.addCase(signOut.rejected, (state, action) => {
            state.signoutdata = ''
            state.loading = 'failed'
            state.error = action.error.message?.toString()
        })
    },
})

export const selectSignOutData = (state: RootState) => state.signout.signoutdata
export const selectSignOutLoading = (state: RootState) => state.signout.loading
export const selectSignOutError = (state: RootState) => state.signout.error
export default singOutSlice.reducer
