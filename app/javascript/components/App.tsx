import React from 'react';
import PageRoutes from '../routers';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#7cb342"
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageRoutes />
    </ThemeProvider>
  );
}

export default App;

