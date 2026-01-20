import {
  Group,
  Inventory,
  People,
  ShoppingCart,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";

export default function StatusCards({ isDark }) {
  const theme = useTheme();

  const statusCardInfo = [
    {
      title: "Total Revenue",
      value: "$154,230",
      growth: "+12%",
      icon: <TrendingUp />,
      color: theme.palette.admin.main,
    },
    {
      title: "New Customers",
      value: "7,240",
      growth: "+11%",
      icon: <Group />,
      color: "#F59E0B",
    },
    {
      title: "Total Customers",
      value: "55,930",
      growth: "+7%",
      icon: <People />,
      color: theme.palette.admin.secondary || "#A855F7",
    },
    {
      title: "Low Stock",
      value: "8 Items",
      growth: "-3%",
      icon: <Inventory />,
      color: "#EF4444",
    },
    {
      title: "Active Orders",
      value: "4,642",
      growth: "+19%",
      icon: <ShoppingCart />,
      color: "#10B981",
    },
  ];

  return (
    <Grid container spacing={3} mb={6} justifyContent="center">
      {statusCardInfo.map((e) => (
        <Grid item xs={12} sm={6} md={2.4} key={e.title}>
          {" "}
          <Paper
            sx={{
              p: 3,
              borderRadius: "28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              position: "relative",
              overflow: "hidden",
              bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
              border: "1px solid",
              borderColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.05)",
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.2)"
                : "0 10px 30px rgba(148,163,184,0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-10px)",
                borderColor: e.color,
                "& .icon-box": {
                  bgcolor: e.color,
                  color: "#fff",
                  boxShadow: `0 8px 20px ${e.color}60`,
                },
              },
            }}
          >
            {/* Background Glow */}
            <Box
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 60,
                height: 60,
                background: e.color,
                filter: "blur(40px)",
                opacity: 0.1,
              }}
            />

            <Box
              className="icon-box"
              sx={{
                p: 1.5,
                borderRadius: "16px",
                bgcolor: `${e.color}15`,
                color: e.color,
                display: "flex",
                transition: "0.3s",
              }}
            >
              {e.icon}
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {e.title}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{ my: 0.5, letterSpacing: "-1px" }}
              >
                {e.value}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: e.growth.includes("+")
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                    color: e.growth.includes("+") ? "#10B981" : "#EF4444",
                    px: 1,
                    py: 0.2,
                    borderRadius: "6px",
                    fontWeight: 800,
                  }}
                >
                  {e.growth}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  vs last month
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
