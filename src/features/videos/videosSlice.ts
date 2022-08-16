import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../app/store'
import {API_URL} from '../../api/config'
import {Video} from '../../types/video'
import {Meta, Links} from '../../types/paginationdata'
import {AppDispatch} from '../../app/store'
interface VideoData {
    items: Video[]
    meta: Meta
    links: Links
}

interface VideoState {
    videosdata: Video[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | undefined
    pageNumber: number
    totalPages: number
    totalVideos: number
}

const initialState: VideoState = {
    videosdata: [],
    loading: 'idle',
    error: '',
    pageNumber: 1,
    totalPages: 0,
    totalVideos: 0,
}

export const fetchVideos = createAsyncThunk<
    VideoData[],
    void,
    {
        state: RootState
        dispatch: AppDispatch
    }
>('videos/getall', async (arg, {getState, dispatch}) => {
    const pNumber = getState().videos.pageNumber

    const apiURL = `${API_URL}/videos?page=${pNumber}&limit=24`

    const response = await fetch(apiURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    if (response.ok) {
        document.cookie = response.headers.get('vcp-jwt') || ''
        const data: VideoData = (await response.json()) as VideoData
        return [data]
    }
    return []
})

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        incPageNumber: state => {
            state.pageNumber += 1
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchVideos.pending, (state, action) => {
            state.videosdata = []
            state.loading = 'pending'
            state.error = ''
        })
        builder.addCase(
            fetchVideos.fulfilled,
            (state, action: PayloadAction<VideoData[]>) => {
                // verify if new videos payload are contained in curremt state
                if (action.payload.length > 0) {
                    let [vidData] = action.payload
                    let arrTmp = vidData.items.filter(
                        (video, index) =>
                            !state.videosdata.some(vid => vid.id === video.id),
                    )
                    // let sttTmp = state.videosdata
                    // state.videosdata = [...sttTmp, ...arrTmp]

                    // console.log(state.videosdata)
                    state.videosdata.push(...arrTmp)
                    console.log(state.videosdata)

                    state.totalPages = vidData.meta.totalPages
                    state.totalVideos = vidData.meta.totalItems
                } else {
                    state.videosdata = []
                }
                state.loading = 'succeeded'
                state.error = ''
            },
        )
        builder.addCase(fetchVideos.rejected, (state, action) => {
            state.videosdata = []
            state.loading = 'failed'
            state.error = action.error.message?.toString()
        })
    },
})

export const selectVideosData = (state: RootState) => state.videos.videosdata
export const selectVideosLoading = (state: RootState) => state.videos.loading
export const selectVideosError = (state: RootState) => state.videos.error
export const {incPageNumber} = videosSlice.actions
export default videosSlice.reducer
