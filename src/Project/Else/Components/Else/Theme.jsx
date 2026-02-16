import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";

export default function Theme({ mode, children }) {
  const theme = useMemo(() => {
    const isDark = mode === "dark";

    return createTheme({
      palette: {
        mode,
        primary: {
          main: isDark ? "#D4AF37" : "#B8860B",
          light: "#E6C65D",
          dark: "#996515",
          contrastText: isDark ? "#000" : "#fff",
        },
        admin: {
          main: "#6366F1",
          secondary: "#A855F7",
          surface: isDark
            ? "rgba(99, 102, 241, 0.05)"
            : "rgba(99, 102, 241, 0.02)",
          gradient: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
        },
        status: {
          success: "#10B981",
          error: "#EF4444",
          warning: "#F59E0B",
          info: "#3B82F6",
        },
        background: {
          default: isDark ? "#0A0A0B" : "#F8FAFC",
          paper: isDark ? "#313132" : "#FFFFFF",
          glass: isDark ? "rgba(57, 57, 60, 1)" : "rgba(255, 255, 255, 0.8)",
        },
        text: {
          primary: isDark ? "#F8FAFC" : "#0F172A",
          secondary: isDark ? "#94A3B8" : "#475569",
        },
      },

      typography: {
        fontFamily: "'Playpen Sans Arabic', 'Roboto', 'Arial', sans-serif",
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
              borderRadius: "20px",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
              }`,
              boxShadow: isDark
                ? "0 10px 30px -10px rgba(0,0,0,0.5)"
                : "0 10px 30px -10px rgba(148, 163, 184, 0.2)",
            },
          },
        },
      },
      breakpoints: {
        values: {
          xxs: 0,
          xs: 320,
          ss: 500,
          sm: 600,
          ms: 800,
          md: 900,
          lg: 1200,
          xl: 1536,
          xxl: 2000,
        },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
