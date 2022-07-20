import React, {useEffect, useCallback, useRef, useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {isAuthenticated} from '../../utils'
import {useNavigate} from 'react-router-dom'
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
    const navigate = useNavigate()

    const getVideos = useCallback(() => {
        dispatch(fetchVideos())
    }, [dispatch])

    useEffect(() => {
        if (pageNumber <= 5) {
            getVideos()
        }
    }, [pageNumber, getVideos])

    useEffect(() => {
        if (!isAuthenticated()) navigate('/signin', {replace: true})
    }, [navigate])

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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {videosData.map((video, index) => {
                                if (
                                    index === videosData.length - 1 &&
                                    !isLoading &&
                                    pageNumber <= totalPages
                                )
                                    return (
                                        <div
                                            key={`${video.id}-${index}`}
                                            ref={setLastElement}
                                        >
                                            <Grid key={video.id}>
                                                <VideoCard video={video} />
                                            </Grid>
                                        </div>
                                    )
                                else
                                    return (
                                        <Grid key={video.id}>
                                            <VideoCard video={video} />
                                        </Grid>
                                    )
                            })}
                            <Grid>
                                <Loading showif={isLoading === 'pending'} />
                                <NoDataFound
                                    showif={totalVideos === 0 && !isLoading}
                                />
                                <NoMoreData
                                    showif={pageNumber - 1 === totalPages}
                                />
                                <ScrollToTopPage />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Videos
