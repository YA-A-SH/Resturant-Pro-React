import { Box, Container, Grid, Typography } from "@mui/material";
import Charts from "./Components/Charts";
import Roadmap from "./Components/Roadmap";
import StatusCards from "./Components/StatusCards";

export default function PreAdmin({ isDark, GRADIENTS }) {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: isDark
            ? "radial-gradient(circle at top right, #1e1e2f, #121212)"
            : "radial-gradient(circle at top right, #f8fafc, #e2e8f0)",
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          {/* Header Section */}

          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                background: GRADIENTS.primary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-1px",
                mb: 1,
              }}
            >
              Visionary Analytics
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ opacity: 0.8, fontWeight: 500 }}
            >
              Monitoring the pulse of your culinary empire in real-time.
            </Typography>
          </Box>

          {/* Status Cards  */}

          <StatusCards isDark={isDark} />

          {/* Charts  */}

          <Charts GRADIENTS={GRADIENTS} isDark={isDark} />

          {/* Advices And Plans  */}

          <Grid
            item
            xs={12}
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          >
            <Roadmap isDark={isDark} GRADIENTS={GRADIENTS} />
          </Grid>
        </Container>
      </Box>
    </>
  );
}
