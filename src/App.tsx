import React from 'react'
import {Routes, Route} from 'react-router-dom'

import SignIn from './containers/signin'
import SignUp from './containers/signup'
import HomePage from './containers/home'
import NotFoundPage from './containers/common/notfound'
import PrivateRoutes from './containers/common/privateroute'

const App = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
