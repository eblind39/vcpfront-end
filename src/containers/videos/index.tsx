import React, {useEffect, useCallback, useRef, useState} from 'react'
// import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
// import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
// import {isAuthenticated} from '../../utils'
// import {useNavigate} from 'react-router-dom'
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {fetchVideos, incPageNumber} from '../../features/videos/videosSlice'
import Loading from '../common/loading'
import NoDataFound from '../common/nodatafound'
import NoMoreData from '../common/nomoredata'
import ScrollToTopPage from '../common/scrolltoppage'
import VideoCard from '../../components/videos/videocard'

const theme = createTheme()

const Videos = () => {
    const [lastElement, setLastElement] = useState<any>(null)
    const videosData = useAppSelector(state => state.videos.videosdata)
    const isLoading = useAppSelector(state => state.videos.loading)
    const pageNumber = useAppSelector(state => state.videos.pageNumber)
    const totalPages = useAppSelector(state => state.videos.totalPages)
    const totalVideos = useAppSelector(state => state.videos.totalVideos)
    const dispatch = useAppDispatch()
    // const navigate = useNavigate()

    const getVideos = useCallback(() => {
        dispatch(fetchVideos())
    }, [dispatch])

    useEffect(() => {
        if (pageNumber <= 5) {
            getVideos()
        }
    }, [pageNumber, getVideos])

    // useEffect(() => {
    //     if (!isAuthenticated()) navigate('/signin', {replace: true})
    // }, [navigate])

    // Start infinite scroll
    const observer = useRef(
        new IntersectionObserver(entries => {
            const first = entries[0]
            if (first.isIntersecting) {
                dispatch(incPageNumber())
            }
        }),
    )

    useEffect(() => {
        const currentElement = lastElement
        const currentObserver = observer.current

        if (currentElement) {
            currentObserver.observe(currentElement)
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement)
            }
        }
    }, [lastElement])
    // end infinite scroll

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{flexGrow: 1}}>
                <Grid
                    container
                    spacing={{xs: 2, md: 3}}
                    columns={{xs: 4, sm: 8, md: 12}}
                >
                    {videosData.map((video, index) => {
                        if (
                            index === videosData.length - 1 &&
                            !(isLoading === 'pending') &&
                            pageNumber <= totalPages
                        )
                            return (
                                <div
                                    key={`${video.id}-${index}`}
                                    ref={setLastElement}
                                >
                                    <Grid
                                        item
                                        xs={2}
                                        sm={4}
                                        md={4}
                                        key={video.id}
                                    >
                                        <VideoCard video={video} />
                                    </Grid>
                                </div>
                            )
                        else
                            return (
                                <Grid item xs={2} sm={4} md={4} key={video.id}>
                                    <VideoCard video={video} />
                                </Grid>
                            )
                    })}
                    <Grid>
                        <Loading showif={isLoading === 'pending'} />
                        <NoDataFound
                            showif={
                                totalVideos === 0 && !(isLoading === 'pending')
                            }
                        />
                        <NoMoreData showif={pageNumber - 1 === totalPages} />
                        <ScrollToTopPage />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default Videos
