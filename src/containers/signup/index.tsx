import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Copyright from '../common/copyright'
import {Link, useNavigate} from 'react-router-dom'
import {isAuthenticated, validateEmail} from '../../utils'
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {signUp} from '../../features/signup/signUpSlice'
import {getRoles} from '../../features/roles/rolesSlice'

const theme = createTheme()

const SignUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [doingSignUp, setDoingSignUp] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const signUpData = useAppSelector(state => state.signup.signupdata)
    const signUploading = useAppSelector(state => state.signup.loading)
    const signUpError = useAppSelector(state => state.signup.error)
    const rolesData = useAppSelector(state => state.roles.rolesdata)
    const rolesLoading = useAppSelector(state => state.roles.loading)

    const getRolesRdx = useCallback(() => {
        console.log('fetching roles', rolesData)
        dispatch(getRoles())
    }, [getRoles])

    useEffect(() => {
        getRolesRdx()
    }, [getRolesRdx])

    useEffect(() => {
        if (isAuthenticated()) navigate('/', {replace: true})
    }, [])

    useEffect(() => {
        if (signUploading === 'succeeded') navigate('/signin', {replace: true})
    }, [signUploading])

    const doSignUp = async (evt: SyntheticEvent) => {
        evt.preventDefault()
        const inputsAreValid = inputValidations()
        if (!inputsAreValid) return

        await dispatch(signUp({email, password, name, role}))
    }

    const handleEnterKey = async (
        evt: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (evt.keyCode === 13) {
            await doSignUp(evt)
        }
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string)
    }

    const inputValidations = () => {
        if (!name) {
            setErrorMsg('Name is required')
            return false
        }
        if (!email) {
            setErrorMsg('Email is required')
            return false
        }
        if (!password) {
            setErrorMsg('Password is required')
            return false
        }
        if (!role) {
            setErrorMsg('Role is required')
            return false
        }
        const emailFormatIsValid = validateEmail(email)
        if (!emailFormatIsValid) {
            setErrorMsg('The email format is not valid')
            return false
        }
        return true
    }

    const renderRoles = useCallback((): JSX.Element[] => {
        console.log('renderRoles', rolesData)
        return rolesData.map(role => {
            return (
                // <MenuItem key={role.id} value={role.id}>
                //     {role.name}
                // </MenuItem>
                <option key={role.id} value={role.id}>
                    {role.name}
                </option>
            )
        })
    }, [])

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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <HowToRegIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" sx={{mt: 3}}>
                        {!!errorMsg.length ? (
                            <Alert severity="error">{errorMsg}</Alert>
                        ) : null}
                        {!!signUpError?.length ? (
                            <Alert severity="error">{signUpError}</Alert>
                        ) : null}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    onKeyDown={handleEnterKey}
                                    error={!!errorMsg.length}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    value={role}
                                    label="Role"
                                    native={false}
                                    onChange={handleSelectChange}
                                    error={!!errorMsg.length}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="1">Teacher</MenuItem>
                                    <MenuItem value="2">Student</MenuItem>
                                    {/* {renderRoles()} */}
                                </Select>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={doSignUp}
                            disabled={doingSignUp}
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}} />
            </Container>
        </ThemeProvider>
    )
}

export default SignUp
