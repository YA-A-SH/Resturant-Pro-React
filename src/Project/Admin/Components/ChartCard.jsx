import { useTheme } from "@emotion/react";
import { Box, Paper, Typography } from "@mui/material";

export default function ChartCard({ title, children, icon }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        width: {
          xxs: 220,
          xs: 290,
          sm: 490,
          ss: 450,
          md: 400,
          ms: 350,
          lg: 490,
          xl: 450,
        },
        height: {
          xxs: 280,
          xs: 320,
          sm: 460,
          ss: 480,
          md: 400,
          ms: 400,
          lg: 440,
        },
        borderRadius: 3,
        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: isDark
            ? "0 20px 40px rgba(0,0,0,0.4)"
            : "0 20px 40px rgba(100,116,139,0.15)",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          }}
        >
          {icon}
        </Box>

        <Typography fontWeight={700} fontSize="1rem">
          {title}
        </Typography>
      </Box>

      {/* Chart */}
      <Box sx={{ flexGrow: 1, width: "100%" }}>{children}</Box>
    </Paper>
  );
}
