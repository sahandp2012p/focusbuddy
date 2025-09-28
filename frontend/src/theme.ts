// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dcdcdc", // Navbar background color
      contrastText: "#6a5acd", // Text color for buttons
    },
    secondary: {
      main: "#556cd6",
    },
    text: {
      primary: "#55",
      secondary: "#555",
    },
    background: {
      default: "#f5f5f5", // Light background for the app
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Open Sans, Arial, sans-serif",
    h5: {
      fontFamily: "Nunito, Arial, sans-serif",
      fontWeight: 900,
      color: "#6a5acd",
    },
    h6: {
      fontFamily: "Nunito, Arial, sans-serif",
      fontWeight: 900,
      color: "#6a5acd",
    },
    button: {
      fontFamily: "Open Sans, Arial, sans-serif",
      fontWeight: 500,
      textTransform: "none", // Keep button text as is
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
