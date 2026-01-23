import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { TrendingUp, DashboardCustomize } from "@mui/icons-material";
import Charts from "./Components/Charts";
import Roadmap from "./Components/Roadmap";
import StatusCards from "./Components/StatusCards";

export default function PreAdmin({ isDark, theme, navigate }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark
          ? `radial-gradient(circle at 0% 0%, ${theme.palette.admin.surface} 0%, ${theme.palette.background.default} 100%)`
          : `radial-gradient(circle at 0% 0%, #f0f4ff 0%, ${theme.palette.background.default} 100%)`,
        py: { xs: 4, md: 8 },
        transition: "background 0.5s ease",
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box textAlign="center" mb={10} position="relative">
          <Box
            sx={{
              position: "absolute",
              top: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "200px",
              height: "200px",
              background: theme.palette.admin.main,
              filter: "blur(120px)",
              opacity: isDark ? 0.15 : 0.1,
              zIndex: 0,
            }}
          />

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            mb={1}
          >
            <DashboardCustomize
              sx={{ color: "admin.main", fontSize: "1.5rem" }}
            />
            <Typography
              variant="overline"
              sx={{ fontWeight: 800, color: "admin.main", letterSpacing: 3 }}
            >
              Executive Dashboard
            </Typography>
          </Stack>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              background: theme.palette.admin.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-2px",
              fontSize: { xs: "2.5rem", md: "4rem" },
              mb: 2,
              position: "relative",
              zIndex: 1,
            }}
          >
            Visionary Analytics
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 600,
              mx: "auto",
              color: "text.secondary",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Monitor the pulse of your culinary empire with real-time insights
            and precision analytics tailored for elite management.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
            <Button
              variant="contained"
              size="large"
              startIcon={<TrendingUp />}
              onClick={() => navigate("/admin/manage-users")}
              sx={{
                px: 5,
                py: 1.8,
                borderRadius: "16px",
                fontWeight: 800,
                background: theme.palette.admin.gradient,
                color: "#fff",
                boxShadow: `0 12px 30px ${
                  isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.2)"
                }`,
                transition: "0.5s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 15px 40px ${
                    isDark
                      ? "rgba(99, 102, 241, 0.6)"
                      : "rgba(99, 102, 241, 0.3)"
                  }`,
                },
              }}
            >
              User's Reports
            </Button>
          </Stack>
        </Box>

        {/* Status Cards */}
        <Box sx={{ mb: 6 }}>
          <StatusCards isDark={isDark} />
        </Box>

        {/* Charts Section */}
        <Box
          sx={{
            p: { xxs: 1, xs: 1, md: 3 },
            bgcolor: "background.paper",
            borderRadius: "32px",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
            boxShadow: isDark
              ? "0 40px 80px rgba(0,0,0,0.3)"
              : "0 20px 60px rgba(0,0,0,0.05)",
          }}
        >
          <Charts isDark={isDark} />
        </Box>

        {/* Roadmap Section */}
        <Grid container justifyContent="center" sx={{ mt: 10 }}>
          <Grid item xs={12} lg={10}>
            <Roadmap isDark={isDark} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
