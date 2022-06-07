import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#03b7ff",
    },
    lightMode: {
      background: "white",
    },
    breakpoints: {
      xs: 0,
      sm: 600,
      medium: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});
