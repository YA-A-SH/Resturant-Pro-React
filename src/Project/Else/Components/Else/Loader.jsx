import { Box, Typography, useTheme, alpha } from "@mui/material";

export default function Loader({ id }) {
  const theme = useTheme();
  const primaryColor =
    id === "admin" ? theme.palette.admin.main : theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: theme.palette.mode === "dark" ? "#050505" : "#ffffff",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 150,
          height: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `3px solid ${alpha(primaryColor, 0.1)}`,
            borderTop: `3px solid ${primaryColor}`,
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />

        <Typography
          sx={{
            color: primaryColor,
            fontSize: "1.8rem",
            fontWeight: 900,
            letterSpacing: 1,
            textAlign: "center",
            animation: "pulse 2s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 0.3, transform: "scale(0.95)" },
              "50%": { opacity: 1, transform: "scale(1.9)" },
            },
          }}
        >
          ZEUS
        </Typography>
      </Box>

      <Typography
        sx={{
          mt: 4,
          fontWeight: 600,
          letterSpacing: 4,
          color: "text.secondary",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 30,
            height: 2,
            bgcolor: primaryColor,
            borderRadius: 2,
          },
        }}
      >
        Preparing Excellence
      </Typography>
    </Box>
  );
}
