import {
  Group,
  Inventory,
  People,
  ShoppingCart,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function StatusCards({ isDark }) {
  
  const statusCardInfo = [
    {
      title: "Total Revenue",
      value: "$154,230",
      growth: "+12%",
      icon: <TrendingUp />,
      color: "#6366f1",
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
      color: "#6366F1",
    },
    {
      title: "Low Stock",
      value: "8 Items",
      growth: "+3%",
      icon: <Inventory />,
      color: "#EF4444",
    },
    {
      title: "Active Orders",
      value: "4642",
      growth: "+19%",
      icon: <ShoppingCart />,
      color: "#10B981",
    },
  ];

  return (
    <>
      <Grid
        container
        spacing={3}
        mb={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {statusCardInfo.map((e) => (
          <Grid item xs={12} sm={6} md={3} key={e.title}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                border: "1px solid",
                borderColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "16px",
                  bgcolor: `${e.color}20`,
                  color: e.color,
                  display: "flex",
                }}
              >
                {e.icon}
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {e.title}
                </Typography>
                <Typography variant="h5" fontWeight={800}>
                  {e.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: e.growth.includes("+") ? "#10B981" : "#EF4444",
                    fontWeight: 700,
                  }}
                >
                  {e.growth}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
