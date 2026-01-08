import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";

export default function Theme({ mode, children }) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: mode === "dark" ? "#e6ba2aff" : "#B8860B",
            contrastText: "#fff",
          },
          secondary: {
            main: "#1e1e26",
          },
          background: {
            default: mode === "dark" ? "#0D0D0D" : "#FAFAFA",
            paper: mode === "dark" ? "#2e2e34ff" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#E0E0E0" : "#1A1A1A",
            secondary: mode === "dark" ? "#A0A0A0" : "#4A4A4A",
          },
        },
        typography: {
          fontFamily: "'Playfair Display', 'Poppins', serif",
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: "16px",
              },
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarWidth: "thin",
                scrollbarColor:
                  mode === "dark" ? "#D4AF37 #0A0A0B" : "#B8860B #FAFAFA",
                "&::-webkit-scrollbar": { width: "8px" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: mode === "dark" ? "#D4AF37" : "#B8860B",
                  borderRadius: "20px",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
