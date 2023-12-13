import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import './index.css';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>
);
