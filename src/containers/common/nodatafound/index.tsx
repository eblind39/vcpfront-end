import React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'

interface Props {
    showif: boolean
}

export const NoDataFound = ({showif}: Props) => {
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
                        <Alert severity="info" color="info">
                            No data found.
                        </Alert>
                    </Box>
                </Box>
            )}
        </React.Fragment>
    )
}

export default NoDataFound
