import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../app/store'
import {API_URL} from '../../api/config'
import {Role} from '../../types/role'

interface RoleState {
    rolesdata: Role[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: RoleState = {
    rolesdata: [],
    loading: 'idle',
    error: '',
}

export const getRoles = createAsyncThunk('roles/getall', async () => {
    const apiURL = `${API_URL}/roles`

    const response = await fetch(apiURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    if (response.ok) {
        document.cookie = response.headers.get('vcp-jwt') || ''
        const data: Role = (await response.json()) as Role
        return [data]
    }
    return []
})

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getRoles.pending, (state, action) => {
            state.rolesdata = []
            state.loading = 'pending'
            state.error = ''
        })
        builder.addCase(
            getRoles.fulfilled,
            (state, action: PayloadAction<Role[]>) => {
                state.rolesdata = action.payload
                state.loading = 'succeeded'
                state.error = ''
            },
        )
        builder.addCase(getRoles.rejected, (state, action) => {
            state.rolesdata = []
            state.loading = 'failed'
            state.error = action.error.message?.toString()
        })
    },
})

export const selectRolesData = (state: RootState) => state.roles.rolesdata
export const selectRolesLoading = (state: RootState) => state.roles.loading
export const selectRolesError = (state: RootState) => state.roles.error
export default rolesSlice.reducer
