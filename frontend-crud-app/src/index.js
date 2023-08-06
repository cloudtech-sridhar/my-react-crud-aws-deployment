// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@material-ui/core';
import App from './App';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
