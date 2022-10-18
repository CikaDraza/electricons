import { createTheme } from '@mui/material/styles';
import { red, blue, grey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: grey[50],
      borderColor: blue[500]
    },
    secondary: {
      main: grey[900],
      lightGrey: grey[500],
      borderColor: grey[300]
    },
    shape: {
      borderRadius: 50
    },
    inputButtonShape: {
      borderRadius: '0 50px 50px 0',
    },
    addToCartButtonShape: {
      borderRadius: '50px',
    },
    badge: {
      main: grey[900],
      bgd: grey[300]
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
