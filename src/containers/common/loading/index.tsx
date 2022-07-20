import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
    showif: boolean
}

export const Loading = ({showif}: Props) => {
    return (
        <React.Fragment>
            {showif && (
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <Box sx={{display: 'flex'}}>
                        <CircularProgress />
                    </Box>
                </Box>
            )}
        </React.Fragment>
    )
}

export default Loading
