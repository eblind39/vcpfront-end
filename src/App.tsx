import React from 'react'
import {Routes, Route} from 'react-router-dom'

import SignIn from './containers/signin'
import SignUp from './containers/signup'
import HomePage from './containers/home'
import Videos from './containers/videos'
import NotFoundPage from './containers/common/notfound'

const App = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
