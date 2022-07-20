import React, {SyntheticEvent, useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import {styled} from '@mui/material/styles'

const BoxFloat = styled(Box)({
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    animation: 'fadeIn 700ms ease-in-out 1s both',
    cursor: 'pointer',
})

const ScrollToTopPage = () => {
    const [isVisible, setIsVisible] = useState(false)

    // Show button when page is scorlled upto given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = (evt: SyntheticEvent) => {
        evt.preventDefault()
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            {isVisible && (
                <BoxFloat onClick={scrollToTop}>
                    <CardMedia
                        component="img"
                        height="90"
                        image="https://www.pngkey.com/png/full/355-3553692_jump-to-the-top-scroll-to-top-icon.png"
                        alt="video info"
                    />
                </BoxFloat>
            )}
        </Container>
    )
}

export default ScrollToTopPage
