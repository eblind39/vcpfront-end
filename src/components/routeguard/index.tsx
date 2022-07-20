import React, {useEffect} from 'react'
import Cookies from 'js-cookie'
import {Route, useNavigate} from 'react-router-dom'

const RouteGuard = ({component, ...rest}: any) => {
    useEffect(() => {
        console.log(hasJWT())
    }, [])

    function hasJWT() {
        let jwtCookie = Cookies.get('Authentication')

        return !!jwtCookie
    }

    const RouteComponent = (props: any) => {
        let navigate = useNavigate()

        return hasJWT()
            ? React.createElement(component, props)
            : navigate('/signin')
    }

    return <Route {...rest} render={RouteComponent} />
}

export default RouteGuard
