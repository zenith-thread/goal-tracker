import { createTheme } from "@mui/material/styles";

// Create a base theme to grab the default shadows
const baseLight = createTheme({ palette: { mode: "light" } });
const baseDark = createTheme({ palette: { mode: "dark" } });

export const lightTheme = createTheme({
  ...baseLight,
  palette: {
    ...baseLight.palette,
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#1a1a1a", secondary: "#555555" },
  },
  shadows: baseLight.shadows, // use the full default shadows array
});

export const darkTheme = createTheme({
  ...baseDark,
  palette: {
    ...baseDark.palette,
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#aaaaaa" },
  },
  shadows: baseDark.shadows, // use the full default shadows array
});
