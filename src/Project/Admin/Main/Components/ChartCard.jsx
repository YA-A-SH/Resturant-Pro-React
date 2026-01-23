import { Box, Paper, Typography, useTheme } from "@mui/material";

export default function ChartCard({ title, children, icon, sentColor }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xxs: 2, xs: 3, sm: 4 },
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
        borderRadius: "28px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: isDark ? "rgba(18, 18, 20, 0.6)" : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: sentColor || "admin.main",
          boxShadow: isDark
            ? `0 20px 40px -10px rgba(99, 102, 241, 0.2)`
            : `0 20px 40px -10px rgba(99, 102, 241, 0.1)`,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          background: isDark
            ? "rgba(99, 102, 241, 0.03)"
            : "rgba(99, 102, 241, 0.05)",
          borderRadius: "50%",
          filter: "blur(30px)",
        }}
      />
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, zIndex: 1 }}
      >
        <Box
          sx={{
            p: 1.2,
            borderRadius: "14px",
            background: isDark
              ? "rgba(99, 102, 241, 0.15)"
              : "rgba(99, 102, 241, 0.08)",
            color: sentColor || "admin.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ letterSpacing: "-0.5px", fontSize: "1.1rem" }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, width: "100%", zIndex: 1 }}>{children}</Box>{" "}
    </Paper>
  );
}
