import React from 'react'
import {ThemeProvider} from 'styled-components'

const Theme = ( { children } ) => {
    const theme = {
        color: {
            main: '#FDFAF7',
            brown: '#996633'
        },
        font: {
            primary: "'Bebas Neue', sans-serif",
            secondary: "'Quicksand', sans-serif"
        },
        device: {
            lgPhone: '(min-width: 425px)',
            tablet: '(min-width: 768px)',
            laptop: '(min-width: 1024px)',
            desktop: '(min-width: 1440px)'
        }
    }

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default Theme

