import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2A6F97', // Blu
    },
    secondary: {
      main: '#52B788', // Green Salute
    },
    error: {
      main: '#D00000', // Red Errore
    },
    warning: {
      main: '#F9C74F', // Yellow Avviso
    },
    background: {
      default: '#F8F9FA', // light background
      paper: '#FFFFFF', // Card, modals, ecc.
    },
    text: {
      primary: '#495057', // Grigio Testo Neutro Grey Text
      secondary: '#6C757D', // Grey secondary
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})
