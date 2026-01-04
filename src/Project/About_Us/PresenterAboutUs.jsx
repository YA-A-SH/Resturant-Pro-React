import { Box, Typography, Grid, Container, Paper } from "@mui/material";
import Mission from "./Missions";
import Counter from "./Counter";
import TeamSec from "./TeamSec";
import HeroSec from "./HeroSec";

export default function AboutUs({
  theme,
  navigate,
  textSecondary,
  cardBg,
  teamMembers,
  stats,
  isDark,
}) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      {/* ===== LUXURY HERO SECTION ===== */}
      <HeroSec navigate={navigate} isDark={isDark} />

      {/* ===== MISSION & VISION (Side-by-Side Modern) ===== */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={4}>
          <Mission
            msg="Our Mission"
            msgBody="We believe food is an art. Our mission is to combine the
                freshest ingredients with creative recipes to bring joy to every
                table."
            cardBg={cardBg}
            theme={theme}
            textSecondary={textSecondary}
          />

          <Grid item xs={12} md={6} sx={{ mt: { md: 6 } }}>
            <Mission
              msg="Our Vision"
              msgBody="To redefine the future of dining by making gourmet quality
                accessible to everyone, anywhere, anytime."
              cardBg={cardBg}
              theme={theme}
              textSecondary={textSecondary}
            />
          </Grid>
        </Grid>
      </Container>

      {/* ===== STATS (Glassmorphism Cards) ===== */}
      <Box
        sx={{
          bgcolor: isDark ? "grey.900" : "grey.50",
          py: 10,
          mb: 12,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, i) => (
              <Grid
                key={i}
                item
                xs={6}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 6,
                    bgcolor: "transparent",
                    border: "1px solid",
                    borderColor: "divider",
                    minWidth: "250px",
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 2 }}>{stat.icon}</Box>
                  <Typography variant="h3" fontWeight="900">
                    {stat.static ? (
                      stat.number
                    ) : (
                      <Counter value={stat.number} />
                    )}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== TEAM SECTION (Modern Grid) ===== */}
      <TeamSec teamMembers={teamMembers} />
    </Box>
  );
}
