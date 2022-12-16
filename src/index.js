import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import { unregister } from './registerServiceWorker';
import { SnackbarProvider } from 'notistack';
// import whyDidYouRender from '@welldone-software/why-did-you-render';
// if (process.env.NODE_ENV === 'development') {
// const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
//     whyDidYouRender(React, {
//         trackAllPureComponents: true,
//     });
// // }
const theme = createTheme(
    adaptV4Theme({
        typography: {
            htmlFontSize: parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'), 10),
            fontSize:
                parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'), 10) * 0.9,
        },
        palette: {
            // mode: 'dark',
            primary: {
                light: '#5191d6',
                main: '#0064a4',
                dark: '#003a75',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ffff52',
                main: '#ffd200',
                dark: '#c7a100',
                contrastText: '#000',
            },
        },
        spacing: 4,
    })
);

// if (process.env.NODE_ENV === 'development') {
//     whyDidYouRender(React, {
//         trackAllPureComponents: true,
//     });
// }

const rootElement = document.getElementById('root');
render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <App style={{ height: '100%' }} />
            </SnackbarProvider>
        </ThemeProvider>
    </StyledEngineProvider>,
    rootElement
);

unregister();
