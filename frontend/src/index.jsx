import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import CssBaseline from '@mui/material/CssBaseline';

import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
