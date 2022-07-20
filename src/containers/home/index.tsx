import React, {useEffect, useCallback} from 'react'
import TopMenu from '../topmenu'
import Videos from '../videos'

const HomePage = () => {
    return (
        <React.Fragment>
            <TopMenu />
            <Videos />
        </React.Fragment>
    )
}

export default HomePage
