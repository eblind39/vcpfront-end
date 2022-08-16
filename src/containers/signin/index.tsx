import React, {SyntheticEvent, useEffect, useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import KeyIcon from '@mui/icons-material/Key'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Copyright from '../common/copyright'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Link, useNavigate} from 'react-router-dom'
import {isAuthenticated, validateEmail} from '../../utils'
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {signIn} from '../../features/signin/signInSlice'

const theme = createTheme()

const SignIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const signInloading = useAppSelector(state => state.signin.loading)
    const signInError = useAppSelector(state => state.signin.error)

    useEffect(() => {
        if (isAuthenticated()) navigate('/', {replace: true})
    }, [])

    useEffect(() => {
        if (signInloading === 'succeeded' && isAuthenticated())
            navigate('/', {replace: true})
    }, [signInloading, navigate])

    const doSignIn = async (evt: SyntheticEvent) => {
        evt.preventDefault()
        const inputsAreValid = inputValidations()
        if (!inputsAreValid) return

        await dispatch(signIn({email, password}))
    }

    const handleEnterKey = async (
        evt: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (evt.keyCode === 13) {
            await doSignIn(evt)
        }
    }

    const inputValidations = () => {
        if (!email || !password) {
            setErrorMsg('Email and password are required')
            return false
        }
        const emailFormatIsValid = validateEmail(email)
        if (!emailFormatIsValid) {
            setErrorMsg('The email format is not valid')
            return false
        }
        return true
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://i.ibb.co/PNkqpTT/kal-visuals-M-Cvg-FVSxbg-unsplash.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'primary.dark'}}>
                            <KeyIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" sx={{mt: 1}}>
                            {!!errorMsg.length ? (
                                <Alert severity="error">{errorMsg}</Alert>
                            ) : null}
                            {!!signInError?.length ? (
                                <Alert severity="error">{signInError}</Alert>
                            ) : null}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={handleEnterKey}
                                error={!!errorMsg.length}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={handleEnterKey}
                                error={!!errorMsg.length}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={doSignIn}
                                disabled={signInloading === 'pending'}
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs></Grid>
                                <Grid item>
                                    <Link to="/signup">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 5}} />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default SignIn
