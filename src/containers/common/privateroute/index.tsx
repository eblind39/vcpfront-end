import {Outlet, Navigate} from 'react-router-dom'
import {isAuthenticated} from '../../../utils'

const PrivateRoutes = () => {
    const isAuth: boolean = isAuthenticated()
    return isAuth ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoutes
