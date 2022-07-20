import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection'
import Typography from '@mui/material/Typography'
import Copyright from '../copyright'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Link} from 'react-router-dom'

const theme = createTheme()

const NotFoundPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                component={Paper}
                elevation={10}
                square
                sx={{
                    backgroundImage:
                        'url(https://i.ibb.co/2tGnwc9/jakob-owens-LHYj-Fxt-JKCQ-unsplash.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                }}
            ></Grid>
            <Grid>
                <Box
                    sx={{
                        my: 10,
                        mx: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'error.light'}}>
                        <AssistantDirectionIcon />
                    </Avatar>
                    <Typography
                        variant="h5"
                        component="h5"
                        data-test="heading"
                        sx={{m: 1, color: 'white', bgcolor: 'error.light'}}
                    >
                        404 Page Not Found
                    </Typography>
                    <Link to="/">Go back to homepage</Link>
                    <Copyright sx={{mt: 5}} />
                </Box>
            </Grid>
        </ThemeProvider>
    )
}

export default NotFoundPage
