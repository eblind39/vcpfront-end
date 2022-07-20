import React, {useEffect} from 'react'
import {Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import SignIn from '../signin'
import {isAuthenticated} from '../../utils'
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) navigate('/signin', {replace: true})
    })

    return (
        <React.Fragment>
            <Typography variant="h2" component="h2" data-test="heading">
                Video Creator Platform
            </Typography>
            <Typography variant="h5" component="h5" data-test="heading">
                Home
            </Typography>
            <Link to="/">homepage</Link>
        </React.Fragment>
    )
}

export default HomePage
